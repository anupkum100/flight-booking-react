import React from 'react';
import clsx from 'clsx';
import { Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FlightCard from './FlightCard';
import { TextField, InputLabel, FormControl, Select, MenuItem, Button, Link, Tabs, Tab, Grid, Slider } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { withStyles } from '@material-ui/core/styles';
import FlightFilterCard from './FlightFilterCard';
import MultipleFlightCard from './MultipleFlightCard';
import Autocomplete from '@material-ui/lab/Autocomplete';


const drawerWidth = 300;

interface Flight {
    arrivalTime: string
    date: string
    departureTime: string
    destination: string
    flightNo: string
    name: string
    origin: string
    price: number
}

interface Props {
    classes: any
}

interface State {
    open: boolean
    originCity: string
    destinationCity: string
    departureDate: Date
    returnDate: Date
    selectedSeats: number
    allFlights: Array<Flight>
    multipleRoute: any
    isSearchFilterOn: boolean
    isReturn: boolean
    returnFlights: Array<Flight>
    returnMultipleRoute: any
    priceSlider: Array<number>
}

class Main extends React.Component<Props, State> {

    allFlights = [];

    constructor(props: Props) {
        super(props);
        this.state = {
            open: true,
            originCity: '',
            destinationCity: '',
            departureDate: new Date(),
            returnDate: new Date(),
            selectedSeats: 1,
            allFlights: [],
            multipleRoute: [],
            isSearchFilterOn: false,
            isReturn: false,
            returnFlights: [],
            returnMultipleRoute: [],
            priceSlider: [0, 10000]
        }
    }

    componentDidMount() {
        fetch("https://tw-frontenders.firebaseio.com/advFlightSearch.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.allFlights = result;
                    this.setState({
                        allFlights: result,
                    });
                }
            )
    }

    createFlightCard = (isReturn?: boolean) => {
        let flightArrayList = this.state.allFlights;
        if (isReturn) {
            flightArrayList = this.state.returnFlights
        }
        return flightArrayList.map(flightDetails => {
            return <FlightCard key={flightDetails.flightNo + flightDetails.origin} selectedSeats={this.state.selectedSeats} {...flightDetails} />
        })
    }

    createMultipleFlightCard = (isReturn?: boolean) => {
        let multipleFlightArrayList = this.state.multipleRoute;
        if (isReturn) {
            multipleFlightArrayList = this.state.returnMultipleRoute
        }

        return multipleFlightArrayList.map((flightDetails: Flight, index: number) => {
            return <MultipleFlightCard key={index} selectedSeats={this.state.selectedSeats} {...flightDetails} />

        })
    }

    getNoStopsFlights(origin: string, destination: string, departureDate: Date) {
        return this.allFlights.filter((flightDetails: Flight) => {
            return (flightDetails.origin === origin &&
                flightDetails.destination === destination &&
                new Date(flightDetails.date).toDateString() === departureDate.toDateString())
        })
    }

    getMultipleStopsFlights(origin: string, destination: string, departureDate: Date) {
        let filteredOriginResult: any = [];
        let filteredDestinationResult: any = [];

        this.allFlights.forEach((flightDetails: Flight) => {
            if (flightDetails.origin === origin) {
                filteredOriginResult.push(flightDetails)
            }
            if (flightDetails.destination === destination) {
                filteredDestinationResult.push(flightDetails)
            }
        })

        let multipleRouteData: any = [];

        filteredOriginResult.forEach((originFilter: Flight) => {
            filteredDestinationResult.forEach((destinationFilter: Flight) => {
                if (originFilter.destination === destinationFilter.origin &&
                    destinationFilter.date === originFilter.date &&
                    new Date(originFilter.date).toDateString() === departureDate.toDateString() &&
                    checkIfDifferenceInTimeGreateThan30Mins(destinationFilter.departureTime, originFilter.arrivalTime)) {
                    multipleRouteData.push({
                        flight1: originFilter,
                        flight2: destinationFilter
                    })
                }
            });
        });

        return multipleRouteData
    }

    filterFlights = () => {
        // NO Stop flights for one way
        let filteredResult: any = this.getNoStopsFlights(this.state.originCity, this.state.destinationCity, this.state.departureDate);
        let multipleRouteData: any = this.getMultipleStopsFlights(this.state.originCity, this.state.destinationCity, this.state.departureDate);

        this.setState({
            allFlights: filteredResult,
            multipleRoute: multipleRouteData,
            isSearchFilterOn: true,
            // open: false
        })

        if (this.state.isReturn) {
            let filteredResult_Return: any = this.getNoStopsFlights(this.state.destinationCity, this.state.originCity, this.state.returnDate);
            let multipleRouteData_Return: any = this.getMultipleStopsFlights(this.state.destinationCity, this.state.originCity, this.state.returnDate);

            this.setState({
                returnFlights: filteredResult_Return,
                returnMultipleRoute: multipleRouteData_Return
            })
        }
    }

    getCities = () => {
        let allCitires: Array<String> = this.allFlights.map((flightDetails: Flight) => {
            return flightDetails.origin
        })

        return allCitires.filter((city, index, ar) => { return ar.indexOf(city) === index; });
    }

    createFilterCard = () => {
        return <div className="text-left">
            <Link onClick={this.resetFilter}>
                Clear Filter
            </Link>
            <FlightFilterCard {...this.state} />
        </div>
    }

    resetFilter = () => {
        this.setState({
            originCity: '',
            destinationCity: '',
            departureDate: new Date(),
            returnDate: new Date(),
            selectedSeats: 1,
            allFlights: this.allFlights,
            multipleRoute: [],
            isSearchFilterOn: false,
            isReturn: false
        })
    }

    handleTabChange = () => {
        this.setState({
            isReturn: !this.state.isReturn
            // }, this.filterFlights)
        })
    }

    validateForm = () => {
        if (this.state.originCity === '' ||
            this.state.destinationCity === '' ||
            this.state.originCity === this.state.destinationCity) {
            return true
        }
        return false
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerToggle}
                            edge="start"
                            className={clsx(classes.menuButton, this.state.open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Flight Search
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={this.state.open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerToggle}>
                            {this.state.open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>

                    <Tabs value={this.state.isReturn ? 1 : 0} variant="fullWidth" onChange={this.handleTabChange}>
                        <Tab label="One Way" />
                        <Tab label="Return" />
                    </Tabs>
                    <form className={classes.filterForm} noValidate autoComplete="off">
                        <Autocomplete
                            disableClearable
                            id="originCity"
                            options={this.getCities()}
                            value={this.state.originCity}
                            getOptionLabel={(option: any) => option}
                            size="small"
                            onChange={this.onTagsChange}
                            className={classes.autocomplete}
                            renderInput={(params) => <TextField {...params} label="Origin City" variant="outlined" name="originCity" value={this.state.originCity} onChange={this.handleChange} />}
                        />

                        <Autocomplete
                            id="destinationCity"
                            options={this.getCities()}
                            value={this.state.destinationCity}
                            getOptionLabel={(option: any) => option}
                            size="small"
                            onChange={this.onTagsChange}
                            renderInput={(params) => <TextField {...params} label="Destination City" variant="outlined" name="destinationCity" value={this.state.destinationCity} onChange={this.handleChange} />}
                        />

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                minDate={new Date()}
                                fullWidth
                                autoOk
                                inputVariant="outlined"
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                label="Departure Date"
                                value={this.state.departureDate}
                                onChange={this.handleDepartureDateChange}
                            />

                            {this.state.isReturn ?
                                <KeyboardDatePicker
                                    minDate={this.state.departureDate}
                                    variant="inline"
                                    fullWidth
                                    autoOk
                                    inputVariant="outlined"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    label="Return Date"
                                    value={this.state.returnDate}
                                    onChange={this.handleReturnDateChange}
                                /> : <span />}
                        </MuiPickersUtilsProvider>

                        <FormControl margin="dense" fullWidth required className={classes.formControl}>
                            <InputLabel id="demo-simple-select-required-label">Select Seats</InputLabel>
                            <Select
                                name="selectedSeats"
                                value={this.state.selectedSeats}
                                onChange={this.handleChange}
                                className={classes.selectEmpty}
                                variant="outlined"
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                            </Select>
                        </FormControl>

                        <Typography id="range-slider" gutterBottom>
                            Price Range
                        </Typography>
                        <Slider
                            max={10000}
                            min={1000}
                            value={this.state.priceSlider}
                            onChange={this.handlePriceSliderChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            // getAriaValueText={value}
                        />
                        <Button disabled={this.validateForm()} variant="contained" color="secondary" size="small" onClick={this.filterFlights}>
                            Search
                        </Button>
                    </form>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: this.state.open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    {this.state.isSearchFilterOn ? this.createFilterCard() : null}
                    <Grid container>
                        <Grid item xs={this.state.isReturn && this.state.isSearchFilterOn ? 6 : 12}>
                            {this.createFlightCard()}
                            {this.createMultipleFlightCard()}
                        </Grid>

                        {this.state.isReturn ? <Grid item xs={6}>
                            {this.createFlightCard(this.state.isReturn)}
                            {this.createMultipleFlightCard(this.state.isReturn)}
                        </Grid> : null}
                    </Grid>
                </main>
            </div>
        );
    }

    // Basic Handlers 
    handleDrawerToggle = () => {
        this.setState({
            open: !this.state.open
        })
    };

    onTagsChange = (event: any, values: any) => {
        let getStateName = event.target.id.includes('originCity') ? 'originCity' : 'destinationCity'
        this.setState({
            [getStateName]: values
        } as any);
    }


    handleChange = (event: any) => {
        this.setState({
            [event.target.name]: event.target.value
        } as any)
    }

    handleDepartureDateChange = (e: any) => {
        this.setState({
            departureDate: e
        })
    }

    handleReturnDateChange = (e: any) => {
        this.setState({
            returnDate: e
        })
    }

    handlePriceSliderChange = (event: any, newValue: any) => {
        this.setState({
            priceSlider: newValue
        })
    }
}

function checkIfDifferenceInTimeGreateThan30Mins(startTime: string, endTime: string) {
    let startTimeInMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
    let endTimeInMinutes = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);

    return ((startTimeInMinutes - endTimeInMinutes) > 30)
}

const useStyles = (theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: -drawerWidth,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        },
        formControl: {
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        filterForm: {
            padding: "20px"
        },
        autocomplete: {
            marginBottom: "15px"
        }
    })

export default withStyles(useStyles)(Main);
