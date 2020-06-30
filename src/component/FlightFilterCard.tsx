import React from 'react'
import { ListItem, ListItemAvatar, Avatar, Grid, ListItemText, makeStyles, Theme, createStyles, Hidden } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
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

    return <div className={classes.root}>
        {createListElement(props)}
        {props.isReturn ? createListElement(props, true) : null}
    </div>
}

function createListElement(props: any, isReturn?: boolean) {
    let imageSrc = "https://static.thenounproject.com/png/59878-200.png";
    let origin = props.originCity;
    let destination = props.destinationCity;
    let totalFlights = props.allFlights.length + props.multipleRoute.length;
    let departureDate = props.departureDate;

    if (isReturn) {
        imageSrc = "https://icons.iconarchive.com/icons/icons8/android/512/Transport-Airplane-Landing-icon.png";
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

function changeDateFormat(date: string) {
    let changedDate = new Date(date).toDateString().split(' ');
    return (changedDate[0] + ', ' + changedDate[2] + ' ' + changedDate[1])
}