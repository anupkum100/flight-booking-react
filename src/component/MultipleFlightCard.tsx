/*!
 * This component is used to create a simple card for Connecting flights
 * Component used from Material UI
 */

import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Button, Grid, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Link, Hidden } from '@material-ui/core';
import FlightCard from './FlightCard';
import LayoverTime from './LayoverTime';
import { calculateTotalDurationForMultipleFlight, convertTohhFormat } from '../service/Utility';

const multipleFlightIcon = require('../asset/icons/connecting.png');

const useStyles = makeStyles(() =>
    createStyles({
        expantionRoot: {
            width: '99%',
            marginBottom: "5px"
        },
        expantionContent: {
            padding: 0
        },
        root: {
            width: '100%'
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
                <List className={classes.root}>
                    <ListItem key={props.flightNo} className={classes.listItem}>
                        <Hidden xsDown>
                            <ListItemAvatar>
                                <Avatar
                                    alt={`Avatar n°${props.flightNo + 1}`}
                                    src={multipleFlightIcon}
                                />
                            </ListItemAvatar>
                        </Hidden>
                        <Grid container>
                            <Grid item xs={6} md={2}>
                                <ListItemText primary={'Multiple'} />
                                <Link id="show-hide-link">
                                    {expanded ? 'Hide Details' : 'Details'}
                                </Link>
                            </Grid>
                            <Hidden smDown>
                                <Grid item xs={4} md={2}>
                                    <ListItemText primary={convertTohhFormat(props.flight1.departureTime)} />
                                    <ListItemText secondary={props.flight1.origin.split(' ')[0]} />
                                </Grid>
                                <Grid item xs={4} md={2}>
                                    <ListItemText primary={convertTohhFormat(props.flight2.arrivalTime)} />
                                    <ListItemText secondary={props.flight2.destination.split(' ')[0]} />
                                </Grid>

                                <Grid item xs={4} md={2}>
                                    <ListItemText classes={{ primary: classes.duration }} primary={calculateTotalDurationForMultipleFlight(props)} />
                                    <ListItemText secondary={'Total Duration'} />
                                </Grid>
                            </Hidden>
                            <Grid item xs={6} md={2}>
                                <ListItemText classes={{ primary: classes.price }} primary={"₹" + (props.flight1.price + props.flight2.price) * props.selectedSeats} />
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