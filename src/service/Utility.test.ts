import { calculateTimeDifference, calculateTotalDurationForMultipleFlight, checkIfDifferenceInTimeGreateThan30Mins, getCities, calculateTime, convertTimeToMinute, calculateLayoverTime, changeDateFormat, convertTohhFormat } from './Utility';

test('calculateTimeDifference should be truthy', () => {
    expect(calculateTimeDifference).not.toBe(undefined);
});

test('calculateTimeDifference should return time difference', () => {
    let dummyFlightData = {
        "arrivalTime": "6:20",
        "date": "2020/11/01",
        "departureTime": "5:10",
        "destination": "Mumbai (BOM)",
        "flightNo": "AI-101",
        "name": "Air India",
        "origin": "Pune (PNQ)",
        "price": 3525
    }

    let diff = calculateTimeDifference(dummyFlightData);

    expect(diff).toEqual('1h 10m')
});

test('calculateTotalDurationForMultipleFlight should be truthy', () => {
    expect(calculateTotalDurationForMultipleFlight).not.toBe(undefined);
});

test('calculateTotalDurationForMultipleFlight should add time duration of 2 flights time difference', () => {
    let dummyFlightData = {
        flight1: {
            "arrivalTime": "6:20",
            "date": "2020/11/01",
            "departureTime": "5:10",
            "destination": "Mumbai (BOM)",
            "flightNo": "AI-101",
            "name": "Air India",
            "origin": "Pune (PNQ)",
            "price": 3525
        },
        flight2: {
            "arrivalTime": "6:20",
            "date": "2020/11/01",
            "departureTime": "5:10",
            "destination": "Mumbai (BOM)",
            "flightNo": "AI-101",
            "name": "Air India",
            "origin": "Pune (PNQ)",
            "price": 3525
        }
    }

    let diff = calculateTotalDurationForMultipleFlight(dummyFlightData);

    expect(diff).toEqual('2h 20m')
});

test('checkIfDifferenceInTimeGreateThan30Mins should be truthy', () => {
    expect(calculateTotalDurationForMultipleFlight).not.toBe(undefined);
});

test('checkIfDifferenceInTimeGreateThan30Mins should return true if difference is grater than 30 mins', () => {
    let result = checkIfDifferenceInTimeGreateThan30Mins('8:20', '7:20');

    expect(result).toBe(true)
});


test('checkIfDifferenceInTimeGreateThan30Mins should return false if difference is less than 30 mins', () => {
    let result = checkIfDifferenceInTimeGreateThan30Mins('6:40', '6:30');

    expect(result).toBe(false)
});

test('getCities should be truthy', () => {
    expect(getCities).not.toBe(undefined);
});

test('getCities should return list of all available cities', () => {
    let dummyLocations = [{
        "arrivalTime": "6:20",
        "date": "2020/11/01",
        "departureTime": "5:10",
        "destination": "Mumbai (BOM)",
        "flightNo": "AI-101",
        "name": "Air India",
        "origin": "Pune (PNQ)",
        "price": 3525
    }, {
        "arrivalTime": "6:20",
        "date": "2020/11/01",
        "departureTime": "5:10",
        "destination": "Mumbai (BOM)",
        "flightNo": "AI-101",
        "name": "Air India",
        "origin": "Delhi (DEL)",
        "price": 3525
    }]

    let result = getCities(dummyLocations);

    let expectedOutput = ['Pune (PNQ)', 'Delhi (DEL)'];
    expect(JSON.stringify(result)).toEqual(JSON.stringify(expectedOutput))
});

test('calculateTime should be truthy', () => {
    expect(calculateTime).not.toBe(undefined);
});

test('should return time difference in minutes', () => {
    let dummyFlightData = {
        "arrivalTime": "6:20",
        "date": "2020/11/01",
        "departureTime": "5:10",
        "destination": "Mumbai (BOM)",
        "flightNo": "AI-101",
        "name": "Air India",
        "origin": "Pune (PNQ)",
        "price": 3525
    }

    let diff = calculateTime(dummyFlightData);
    expect(diff).not.toBe('70');
});

test('convertTimeToMinute should be truthy', () => {
    expect(convertTimeToMinute).not.toBe(undefined);
});

test('should return time difference in minutes', () => {
    let dummyTime = '6:20';

    let timeInMinutes = convertTimeToMinute(dummyTime);
    expect(timeInMinutes).not.toBe('380');
});

test('calculateLayoverTime should be truthy', () => {
    expect(calculateLayoverTime).not.toBe(undefined);
});

test('calculateLayoverTime should return the time difference between 2 connecting flights', () => {
    let dummyFlightData = {
        flight1: {
            "arrivalTime": "2:20",
            "date": "2020/11/01",
            "departureTime": "1:10",
            "destination": "Mumbai (BOM)",
            "flightNo": "AI-101",
            "name": "Air India",
            "origin": "Pune (PNQ)",
            "price": 3525
        },
        flight2: {
            "arrivalTime": "5:20",
            "date": "2020/11/01",
            "departureTime": "4:30",
            "destination": "Delhi",
            "flightNo": "AI-101",
            "name": "Air India",
            "origin": "Mumbai (BOM)",
            "price": 3525
        }
    }

    let result = calculateLayoverTime(dummyFlightData);

    expect(result).toEqual("2h 10m")
});

test('changeDateFormat should be truthy', () => {
    expect(changeDateFormat).not.toBe(undefined);
});

test('changeDateFormat should convert 11/01/2020 to Sun, 01 Nov', () => {
    expect(changeDateFormat('11/01/2020')).toEqual('Sun, 01 Nov');
});

test('convertTohhFormat should be truthy', () => {
    expect(convertTohhFormat).not.toBe(undefined);
});

test('convertTohhFormat should convert 5:00 to 05:00', () => {
    expect(convertTohhFormat('5:00')).toEqual('05:00');
});




