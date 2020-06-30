import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Button, Grid, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Link, Hidden } from '@material-ui/core';
import FlightCard from './FlightCard';
import LayoverTime from './LayoverTime';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        expantionRoot: {
            width: '99%',
            marginBottom: "5px"
        },
        expantionContent: {
            padding: 0
        },
        root: {
            width: '99%'
        },
        listItem: {
            marginBottom: "5px",
            textAlign: "center"
        },
        price: {
            color: "red",
            fontSize: '1.4em',
            lineHeight: '3rem'
        },
        duration: {
            color: "green",
            fontWeight: "bold"
        }
    }),
);

export default function MultipleFlightCard(props: any) {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
        if (event.target.id !== 'show-hide-link') {
            return
        }
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <ExpansionPanel className={classes.expantionRoot} expanded={expanded === props.flight1.flightNo + props.flight2.flightNo} onChange={handleChange(props.flight1.flightNo + props.flight2.flightNo)}>
            <ExpansionPanelSummary className={classes.expantionContent} >
                <List dense className={classes.root}>
                    <ListItem key={props.flightNo} className={classes.listItem}>
                        <Hidden mdDown>
                            <ListItemAvatar>
                                <Avatar
                                    alt={`Avatar n°${props.flightNo + 1}`}
                                    src={`https://cdn0.iconfinder.com/data/icons/airport-glyph-black/2048/7641_-_Multiple_Flights-512.png`}
                                />
                            </ListItemAvatar>
                        </Hidden>
                        <Grid container spacing={3}>
                            <Grid item xs={6} md={2}>
                                <ListItemText primary={'Multiple'} />
                                <Link href="#" id="show-hide-link">
                                    {expanded ? 'Hide Details' : 'Show Details'}
                                </Link>
                            </Grid>
                            <Hidden mdDown>
                                <Grid item xs={4} md={2}>
                                    <ListItemText primary={props.flight1.departureTime} />
                                    <ListItemText secondary={props.flight1.origin} />
                                </Grid>
                                <Grid item xs={4} md={2}>
                                    <ListItemText primary={props.flight2.arrivalTime} />
                                    <ListItemText secondary={props.flight2.destination} />
                                </Grid>

                                <Grid item xs={4} md={2}>
                                    <ListItemText classes={{ primary: classes.duration }} primary={calculateTotalDuration(props)} />
                                    <ListItemText secondary={'Total Duration'} />
                                </Grid>
                            </Hidden>
                            <Grid item xs={6} md={2}>
                                <ListItemText classes={{ primary: classes.price }} primary={(props.flight1.price + props.flight2.price) * props.selectedSeats} />
                            </Grid>
                        </Grid>

                        <ListItemSecondaryAction>
                            <Button variant="contained" color="secondary" size="small">
                                Book
                        </Button>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List >
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ display: 'block' }}>
                <FlightCard multiple {...props.flight1} />
                <LayoverTime {...props} />
                <FlightCard multiple {...props.flight2} />
            </ExpansionPanelDetails>
        </ExpansionPanel>

    );
}

function calculateTotalDuration(props: any) {
    let flight1Time = calculateTime(props.flight1);
    let flight2Time = calculateTime(props.flight2);

    let totalTime = flight1Time + flight2Time;
    return (Math.floor(totalTime / 60) + 'h ' + totalTime % 60 + 'm')
}

function calculateTime(props: any) {
    let arrivingHour = parseInt(props.arrivalTime.split(':')[0]);
    let arrivingMinute = parseInt(props.arrivalTime.split(':')[1]);
    let arrivingTime = arrivingHour * 60 + arrivingMinute;

    let departureHour = parseInt(props.departureTime.split(':')[0]);
    let departureMinute = parseInt(props.departureTime.split(':')[1]);
    let departureTime = departureHour * 60 + departureMinute;

    let difference = arrivingTime - departureTime;

    return difference;
}
