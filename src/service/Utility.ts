/*!
 * All the generic and mathematical functions are written here
 */

import { Flight } from "./MainModel";

// This function returns the time difference of 1 flight from origin to destination
export function calculateTimeDifference(props: any) {
    let arrivingTime = convertTimeToMinute(props.arrivalTime);
    let departureTime = convertTimeToMinute(props.departureTime);

    let difference = arrivingTime - departureTime;

    return (Math.floor(difference / 60) + 'h ' + difference % 60 + 'm')
}

// This function returns the total time taken by fligh1 and flight 2 for connecting flights
export function calculateTotalDurationForMultipleFlight(props: any) {
    let flight1Time = calculateTime(props.flight1);
    let flight2Time = calculateTime(props.flight2);

    let totalTime: number = flight1Time + flight2Time;
    return (Math.floor(totalTime / 60) + 'h ' + totalTime % 60 + 'm')
}

// This function returns true if the difference of start of flight 2 and end of flight 1 is greater than 30 minutes 
export function checkIfDifferenceInTimeGreateThan30Mins(startTime: string, endTime: string) {
    let startTimeInMinutes = convertTimeToMinute(startTime);
    let endTimeInMinutes = convertTimeToMinute(endTime);

    return ((startTimeInMinutes - endTimeInMinutes) > 30)
}

// This function returns list of all cities by filtering the origin value
export function getCities(allFlights: Array<Flight>) {
    let allCitires: Array<String> = allFlights.map((flightDetails: Flight) => {
        return flightDetails.origin
    })

    return allCitires.filter((city, index, ar) => { return ar.indexOf(city) === index; });
}

// This function returns the laypver time between flight1 and flight 2
export function calculateLayoverTime(props: any) {
    let arrivingTime = convertTimeToMinute(props.flight1.arrivalTime)
    let departureTime = convertTimeToMinute(props.flight2.departureTime)

    let difference = departureTime - arrivingTime;

    return (Math.floor(difference / 60) + 'h ' + difference % 60 + 'm')
}

// Mathematical function to calculate time difference in minute
export function calculateTime(props: any) {
    let arrivingTime = convertTimeToMinute(props.arrivalTime);
    let departureTime = convertTimeToMinute(props.departureTime);

    let difference = arrivingTime - departureTime;

    return difference;
}

// Mathematical function to convert time to minutes
export function convertTimeToMinute(time: any) {
    let timeInHour = parseInt(time.split(':')[0]);
    let timeMinute = parseInt(time.split(':')[1]);
    return (timeInHour * 60 + timeMinute);
}

// Returns the date in Day, Date Month (used in filter card)
export function changeDateFormat(date: string) {
    let changedDate = new Date(date).toDateString().split(' ');
    return (changedDate[0] + ', ' + changedDate[2] + ' ' + changedDate[1])
}

// add 0 if hour is less than 10
export function convertTohhFormat(time: string) {
    return (parseInt(time.split(':')[0]) < 10 ? ('0' + time) : time)
}

