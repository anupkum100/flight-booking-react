/*!
 * This is a generic component used to create a simple card for 1 flight
 * Same card is used for the return flight
 * Same card is used for showing indivisual flight for multiple flight scenario
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
import { Button, Grid, Hidden } from '@material-ui/core';
import { calculateTimeDifference, convertTohhFormat } from '../service/Utility';

const flightIcon = require('../asset/icons/filght.png');

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '99%'
        },
        listItem: {
            boxShadow: "1px 1px 5px #ccc",
            backgroundColor: "#fff",
            borderRadius: "5px",
            textAlign: "center"
        },
        price: {
            color: "red",
            fontSize: '1.4em',
            lineHeight: '3rem'
        },
    }),
);

export default function FlightCard(props: any) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            <ListItem key={props.flightNo} className={classes.listItem}>
                <Hidden xsDown>
                    <ListItemAvatar>
                        <Avatar
                            alt={`Avatar n°${props.flightNo + 1}`}
                            src={flightIcon}
                        />
                    </ListItemAvatar>
                </Hidden>

                <Grid container>
                    <Hidden smDown>
                        <Grid item xs={4} md={2}>
                            <ListItemText primary={props.name} />
                            <ListItemText secondary={props.flightNo} />
                        </Grid>
                    </Hidden>
                    <Grid item xs={props.multiple ? 6 : 4} md={2}>
                        <ListItemText primary={convertTohhFormat(props.departureTime)} />
                        <ListItemText secondary={props.origin.split(' ')[0]} />
                    </Grid>

                    <Grid item xs={props.multiple ? 6 : 4} md={2}>
                        <ListItemText primary={convertTohhFormat(props.arrivalTime)} />
                        <ListItemText secondary={props.destination.split(' ')[0]} />
                    </Grid>
                    <Hidden smDown>
                        <Grid item xs={4} md={2}>
                            <ListItemText primary={calculateTimeDifference(props)} />
                            <ListItemText secondary={'Non Stop'} />
                        </Grid>
                    </Hidden>
                    {props.multiple ? null :
                        <Grid item xs={2} md={2} lg={3}>
                            <ListItemText classes={{ primary: classes.price }} primary={"₹" + props.price * props.selectedSeats}></ListItemText>
                        </Grid>
                    }

                </Grid>

                {props.multiple ? null :
                    <ListItemSecondaryAction>
                        <Button variant="contained" color="secondary" size="small">
                            Book
                        </Button>
                    </ListItemSecondaryAction>
                }
            </ListItem>
        </List >
    );
}
