import React from 'react';
import { Avatar } from "@material-ui/core";
const passengerIcon = require('../asset/icons/passenger.png') 
const moreIcon = require('../asset/icons/more.png') 

export default function Passengers(props: any) {
    let passengerComponent: any = [];
    let isManyPassengers = false;
    let totalSeats = props.totalSeats;

    if (totalSeats > 2) {
        totalSeats = 2;
        isManyPassengers = true
    }
    for (let i = 0; i < totalSeats; i++) {
        passengerComponent.push(<Avatar
            key={i}
            variant="square"
            src={passengerIcon}
        />)
    }

    if (isManyPassengers) {
        passengerComponent.push(<Avatar
            variant="square"
            src={moreIcon}
        />
        )
    }
    return passengerComponent
}