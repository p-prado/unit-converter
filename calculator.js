function convert(fromNumber, fromUnit, toUnit) {
    let result = {
        fromNumber: fromNumber,
        fromUnit: fromUnit,
        toNumber: null,
        toUnit: toUnit
    };
    const metric = ["km", "m", "cm", "mm"];
    const imperial = ["mi", "yd", "ft", "in"];
    let fromUnitFamily, toUnitFamily, fromNumberBase;

    // If user is converting from one unit to the same unit, skip all calculations and return the original number.
    if (fromUnit === toUnit) {
        result.toNumber = fromNumber;
        return result;
    }

    // If user is converting 0, it will be 0, no matter what units are chosen.
    if (fromNumber === 0) {
        result.toNumber = 0;
        return result;
    }

    // Determine if fromUnit is metric or imperial.
    if (metric.includes(fromUnit)) {
        fromUnitFamily = "metric"
    } else if (imperial.includes(fromUnit)) {
        fromUnitFamily = "imperial"
    } else {
        console.log("ERR: UNRECOGNIZED UNIT FAMILY ON FROMUNIT");
    }

    // Determine if toUnit is metric or imperial.
    if (metric.includes(toUnit)) {
        toUnitFamily = "metric"
    } else if (imperial.includes(toUnit)) {
        toUnitFamily = "imperial"
    } else {
        console.log("ERR: UNRECOGNIZED UNIT FAMILY ON FROMUNIT");
    }


    // CONVERT TO BASE UNIT

    // If fromUnit is an Imperial unit, convert to inches, then, to centimeters.
    if (fromUnitFamily === "imperial") {
        switch (fromUnit) {
            case "mi":
                fromNumberBase = fromNumber * 63360; // 63360 inches in 1 mile.
                break;
            case "yd":
                fromNumberBase = fromNumber * 36; // 36 inches in 1 yard.
                break;
            case "ft":
                fromNumberBase = fromNumber * 12; // 12 inches in 1 foot.
                break;
            case "in":
                fromNumberBase = fromNumber;
                break;
            default:
                console.log("UNRECOGNIZED ERROR IN IMPERIAL SWITCH CASE #1");
                break;
        }
        // Convert inches to centimeters
        fromNumberBase = fromNumberBase * 2.54;
    } else if (fromUnitFamily === "metric") {
        // If fromUnit is a Metric unit, convert to cm.
        switch (fromUnit) {
            case "km":
                fromNumberBase = fromNumber * 100000;
                break;
            case "hm":
                fromNumberBase = fromNumber * 10000;
                break;
            case "m":
                fromNumberBase = fromNumber * 100;
                break;
            case "cm":
                fromNumberBase = fromNumber;
                break;
            case "mm":
                fromNumberBase = fromNumber / 10;
            default:
                console.log("UNRECOGNIZED ERROR IN METRIC SWITCH CASE #1");
                break;
        }
    }
    // Now, we have the base unit (in or cm). Now we need to convert it to the toUnit.
    if (toUnitFamily === "imperial") {
        fromNumberBase = fromNumberBase / 2.54; // Go to inches.
        switch (toUnit) {
            case "mi":
                result.toNumber = fromNumberBase / 63360;
                break;
            case "yd":
                result.toNumber = fromNumberBase / 36;
                break;
            case "ft":
                result.toNumber = fromNumberBase / 12;
                break;
            case "in":
                result.toNumber = fromNumberBase;
                break;
            default:
                console.log("UNRECOGNIZED ERROR IN IMPERIAL SWITCH CASE #2");
                break;
        }
        return result;
    } else if (toUnitFamily === "metric") {
        switch (toUnit) {
            case "km":
                result.toNumber = fromNumberBase / 100000;
                break;
            case "hm":
                result.toNumber = fromNumberBase / 10000;
                break;
            case "m":
                result.toNumber = fromNumberBase / 100;
                break;
            case "cm":
                result.toNumber = fromNumberBase;
                break;
            case "mm":
                result.toNumber = fromNumberBase * 10;
            default:
                console.log("UNRECOGNIZED ERROR IN METRIC SWITCH CASE #2");
                break;
        }
        return result;
    }
}

module.exports = { convert };