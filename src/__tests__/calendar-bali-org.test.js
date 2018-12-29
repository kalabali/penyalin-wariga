const calendarBaliOrg = require('../modules/calendar-bali-org');

it("throw error when passed nothing", () => {
    return expect(calendarBaliOrg())
        .rejects.toThrow('expected to passed object as options!');
});

it("throw error when only passed string", () => {
    return expect(calendarBaliOrg("non object"))
        .rejects.toThrow('expected to passed object as options!');
});

it("throw error when only passed number", () => {
    return expect(calendarBaliOrg(12))
        .rejects.toThrow('expected to passed object as options!');
});

it("throw error when month set to string \"november\"", () => {
    return expect(calendarBaliOrg({
        month: "november",
        year: 2018
    })).rejects.toThrow(
        "expected properties month passed in as number!"
    );
});

it("throw error when month set to floating number", () => {
    return expect(calendarBaliOrg({
        month: 12.5,
        year: 2018
    })).rejects.toThrow(
        "expected properties month passed as non floating number!"
    );
});

it("throw error when month set outside the expected value (0 to 11)", () => {
    return expect(calendarBaliOrg({
        month: -1, 
        year: 2018
    })).rejects.toThrow(
        "expected properties month passed integer from 1 to 12"
    );
});

it("throw error when month is not passed in options", () => {
    return expect(calendarBaliOrg({ year: 2018 }))
        .rejects.toThrow(`expected properties month passed in options`);
});

it("throw error when year is not passed in options", () => {
    return expect(calendarBaliOrg({ month: 11 }))
        .rejects.toThrow(`expected properties year passed in options`);
});

it("throw error when year set to string", () => {
    return expect(calendarBaliOrg({
        month: 11, 
        year: "two thousand and eighteenth"
    })).rejects.toThrow(
        "expected properties year passed in as number!"
    );
});

it("throw error when year set to floating number", () => {
    return expect(calendarBaliOrg({
        month: 11, 
        year: 2018.5
    })).rejects.toThrow(
        "expected properties year passed in as non floating number!"
    );
});

it("throw error when year is below 0", () => {
    return expect(calendarBaliOrg({
        month: 11, 
        year: -2018
    })).rejects.toThrow(
        "expected properties year passed in as non negatif number!"
    );
});