import React from 'react';
import { Chip } from '@material-ui/core';

export default function LayoverTime(props: any) {
    return <Chip variant="outlined" size="small" label={`Layover Time ${calculateLayoverTime(props)}`} />
}

function calculateLayoverTime(props: any) {
    let arrivingHour = parseInt(props.flight1.arrivalTime.split(':')[0]);
    let arrivingMinute = parseInt(props.flight1.arrivalTime.split(':')[1]);
    let arrivingTime = arrivingHour * 60 + arrivingMinute;

    let departureHour = parseInt(props.flight2.departureTime.split(':')[0]);
    let departureMinute = parseInt(props.flight2.departureTime.split(':')[1]);
    let departureTime = departureHour * 60 + departureMinute;

    let difference = departureTime - arrivingTime;

    return (Math.floor(difference / 60) + 'h ' + difference % 60 + 'm')
}