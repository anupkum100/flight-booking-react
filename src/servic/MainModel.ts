import { checkIfDifferenceInTimeGreateThan30Mins } from "./Utility";

export interface Flight {
    arrivalTime: string
    date: string
    departureTime: string
    destination: string
    flightNo: string
    name: string
    origin: string
    price: number
}

export function getNoStopsFlights(allFlights: Array<Flight>, origin: string, destination: string, departureDate: Date, priceFilter: Array<number>) {
    return allFlights.filter((flightDetails: Flight) => {
        return (flightDetails.origin === origin &&
            flightDetails.destination === destination &&
            flightDetails.price > priceFilter[0] &&
            flightDetails.price < priceFilter[1] &&
            new Date(flightDetails.date).toDateString() === departureDate.toDateString())
    })
}

export function getMultipleStopsFlights(allFlights: Array<Flight>, origin: string, destination: string, departureDate: Date, priceFilter: Array<number>) {
    let filteredOriginResult: any = [];
    let filteredDestinationResult: any = [];

    allFlights.forEach((flightDetails: Flight) => {
        if (flightDetails.origin === origin) {
            filteredOriginResult.push(flightDetails)
        }
        if (flightDetails.destination === destination) {
            filteredDestinationResult.push(flightDetails)
        }
    })

    let multipleRouteData: any = [];

    filteredOriginResult.forEach((originFilter: Flight) => {
        filteredDestinationResult.forEach((destinationFilter: Flight) => {
            if (originFilter.destination === destinationFilter.origin &&
                destinationFilter.date === originFilter.date &&
                new Date(originFilter.date).toDateString() === departureDate.toDateString() &&
                (originFilter.price + destinationFilter.price) > priceFilter[0] &&
                (originFilter.price + destinationFilter.price) < priceFilter[1] &&
                checkIfDifferenceInTimeGreateThan30Mins(destinationFilter.departureTime, originFilter.arrivalTime)) {
                multipleRouteData.push({
                    flight1: originFilter,
                    flight2: destinationFilter
                })
            }
        });
    });

    return multipleRouteData
}