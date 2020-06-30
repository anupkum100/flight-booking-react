import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Button, Grid, Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
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
                <Hidden mdDown>
                    <ListItemAvatar>
                        <Avatar
                            alt={`Avatar n°${props.flightNo + 1}`}
                            src={`https://static.thenounproject.com/png/59878-200.png`}
                        />
                    </ListItemAvatar>
                </Hidden>

                <Grid container>
                    <Hidden mdDown>
                        <Grid item xs={4} md={2}>
                            <ListItemText primary={props.name} />
                            <ListItemText secondary={props.flightNo} />
                        </Grid>
                    </Hidden>
                    <Grid item xs={props.multiple ? 6 : 4} md={2}>
                        <ListItemText primary={props.departureTime} />
                        <ListItemText secondary={props.origin.split(' ')[0]} />
                    </Grid>

                    <Grid item xs={props.multiple ? 6 : 4} md={2}>
                        <ListItemText primary={props.arrivalTime} />
                        <ListItemText secondary={props.destination.split(' ')[0]} />
                    </Grid>
                    <Hidden mdDown>
                        <Grid item xs={4} md={2}>
                            <ListItemText primary={calculateTime(props)} />
                            <ListItemText secondary={'Non Stop'} />
                        </Grid>
                    </Hidden>
                    {props.multiple ? null :
                        <Grid item xs={4} md={2}>
                            <ListItemText classes={{ primary: classes.price }} primary={props.price * props.selectedSeats} />
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

function calculateTime(props: any) {
    let arrivingHour = parseInt(props.arrivalTime.split(':')[0]);
    let arrivingMinute = parseInt(props.arrivalTime.split(':')[1]);
    let arrivingTime = arrivingHour * 60 + arrivingMinute;

    let departureHour = parseInt(props.departureTime.split(':')[0]);
    let departureMinute = parseInt(props.departureTime.split(':')[1]);
    let departureTime = departureHour * 60 + departureMinute;

    let difference = arrivingTime - departureTime;

    return (Math.floor(difference / 60) + 'h ' + difference % 60 + 'm')
}
