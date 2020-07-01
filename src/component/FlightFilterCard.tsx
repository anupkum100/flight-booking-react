/*!
 * This component is used Filtered flight card at the top
 * Same component is used for the return flights
 * Component used from Material UI
 */

import React from 'react'
import { ListItem, ListItemAvatar, Avatar, Grid, ListItemText, makeStyles, createStyles, Hidden } from '@material-ui/core';
import { changeDateFormat } from '../service/Utility';

const flightIcon = require('../asset/icons/filght.png');
const returnFlightIcon = require('../asset/icons/return_flight.png');

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            display: 'flex',
            justifyContent: "space-around"
        }
    }),
);

export default function FlightFilterCard(props: any) {
    const classes = useStyles();
    if (props.originCity === '' || props.destinationCity === '') {
        return <div>Invalid Search Prameter</div>
    }
    return <div className={classes.root}>
        {createListElement(props)}
        {props.showReturnFlight ? createListElement(props, true) : null}
    </div>
}

function createListElement(props: any, isReturn?: boolean) {
    let imageSrc = flightIcon;
    let origin = props.originCity;
    let destination = props.destinationCity;
    let totalFlights = props.allFlights.length + props.multipleRoute.length;
    let departureDate = props.departureDate;

    if (isReturn) {
        imageSrc = returnFlightIcon;
        origin = props.destinationCity;
        destination = props.originCity;
        totalFlights = props.returnFlights.length + props.returnMultipleRoute.length;
        departureDate = props.returnDate;
    }

    return <ListItem>
        <Hidden mdDown>
            <ListItemAvatar>
                <Avatar
                    src={imageSrc}
                />
            </ListItemAvatar>
        </Hidden>

        <Grid container spacing={3}>
            <Grid item xs={12}>
                <ListItemText primary={`${origin} to ${destination}`} />
                <ListItemText secondary={`${totalFlights} Results found  ${changeDateFormat(departureDate)}`} />
            </Grid>

        </Grid>
    </ListItem>
}