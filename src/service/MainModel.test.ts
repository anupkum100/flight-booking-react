import { getNoStopsFlights, getMultipleStopsFlights } from "./MainModel";
const mockData = require('./FlightMock.json')

test('getNoStopsFlights should be truthy', () => {
    expect(getNoStopsFlights).not.toBe(undefined);
});

test('getNoStopsFlights should return all non stop flights from origin to destinatoin if all conitions are matched', () => {
    let origin = "Pune (PNQ)";
    let destination = "Mumbai (BOM)";
    let departureDate = new Date("2020/11/01");
    let priceFilter = [1000, 10000];

    let filteredFlights = getNoStopsFlights(mockData, origin, destination, departureDate, priceFilter);

    expect(filteredFlights.length).toEqual(3);
});

test('getNoStopsFlights should NOT return any flights from origin to destinatoin if all conitions are not matched', () => {
    let origin = "Pune (PNQ)";
    let destination = "Mumbai (BOM)";
    let departureDate = new Date("2020/11/05");
    let priceFilter = [1000, 10000];

    // date out of range
    let filteredFlights = getNoStopsFlights(mockData, origin, destination, departureDate, priceFilter);
    expect(filteredFlights.length).toEqual(0);

    // price filter out of range
    priceFilter = [1000, 1001];
    filteredFlights = getNoStopsFlights(mockData, origin, destination, departureDate, priceFilter);
    expect(filteredFlights.length).toEqual(0);

    // origin/destination not valid
    origin = "";
    destination = "";
    filteredFlights = getNoStopsFlights(mockData, origin, destination, departureDate, priceFilter);

    expect(filteredFlights.length).toEqual(0);
});


test('getMultipleStopsFlights should be truthy', () => {
    expect(getMultipleStopsFlights).not.toBe(undefined);
});

test('getMultipleStopsFlights should return 2 flights from origin to destinatoin if all conitions are matched', () => {
    let origin = "Pune (PNQ)";
    let destination = "Mumbai (BOM)";
    let departureDate = new Date("2020/11/01");
    let priceFilter = [1000, 10000];

    let filteredFlights = getMultipleStopsFlights(mockData, origin, destination, departureDate, priceFilter);

    expect(filteredFlights.length).toEqual(2);
});

test('getMultipleStopsFlights should NOT return any flights from origin to destinatoin if any condition is not matched', () => {
    let origin = "Pune (PNQ)";
    let destination = "Mumbai (BOM)";
    let departureDate = new Date("2020/11/01");
    let priceFilter = [1000, 1001];

    // price filter out of range
    let filteredFlights = getMultipleStopsFlights(mockData, origin, destination, departureDate, priceFilter);
    expect(filteredFlights.length).toEqual(0);

    // date out of range
    departureDate = new Date("2020/11/11");
    filteredFlights = getMultipleStopsFlights(mockData, origin, destination, departureDate, priceFilter);
    expect(filteredFlights.length).toEqual(0);

    // origin/destination not valid
    origin = "";
    destination = "";
    filteredFlights = getMultipleStopsFlights(mockData, origin, destination, departureDate, priceFilter);

    expect(filteredFlights.length).toEqual(0);
});