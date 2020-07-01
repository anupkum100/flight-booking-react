import { Flight } from "./MainModel";

export function calculateTimeDifference(props: any) {
    let arrivingTime = convertTimeToMinute(props.arrivalTime);
    let departureTime = convertTimeToMinute(props.departureTime);

    let difference = arrivingTime - departureTime;

    return (Math.floor(difference / 60) + 'h ' + difference % 60 + 'm')
}

export function calculateTotalDurationForMultipleFlight(props: any) {
    let flight1Time = calculateTime(props.flight1);
    let flight2Time = calculateTime(props.flight2);

    let totalTime: number = flight1Time + flight2Time;
    return (Math.floor(totalTime / 60) + 'h ' + totalTime % 60 + 'm')
}

export function checkIfDifferenceInTimeGreateThan30Mins(startTime: string, endTime: string) {
    let startTimeInMinutes = convertTimeToMinute(startTime);
    let endTimeInMinutes = convertTimeToMinute(endTime);

    return ((startTimeInMinutes - endTimeInMinutes) > 30)
}

export function getCities(allFlights: Array<Flight>) {
    let allCitires: Array<String> = allFlights.map((flightDetails: Flight) => {
        return flightDetails.origin
    })

    return allCitires.filter((city, index, ar) => { return ar.indexOf(city) === index; });
}


function calculateTime(props: any) {
    let arrivingTime = convertTimeToMinute(props.arrivalTime);
    let departureTime = convertTimeToMinute(props.departureTime);

    let difference = arrivingTime - departureTime;

    return difference;
}

function convertTimeToMinute(time: any) {
    let timeInHour = parseInt(time.split(':')[0]);
    let timeMinute = parseInt(time.split(':')[1]);
    return (timeInHour * 60 + timeMinute);
}


