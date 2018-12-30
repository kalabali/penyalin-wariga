const dayCrawl = require('../modules/day-crawl');

it("throw error when passed nothing", () => {
    return expect(dayCrawl())
        .rejects.toThrow('expected to passed object as options!');
});

it("throw error when only passed string", () => {
    return expect(dayCrawl("non object"))
        .rejects.toThrow('expected to passed object as options!');
});

it("throw error when only passed number", () => {
    return expect(dayCrawl(12))
        .rejects.toThrow('expected to passed object as options!');
});

it("throw error when month set to string \"november\"", () => {
    return expect(dayCrawl({
        month: "november",
        year: 2019,
        date: 1
    })).rejects.toThrow(
        "expected properties month passed in as number!"
    );
});

it("throw error when month set to floating number", () => {
    return expect(dayCrawl({
        month: 12.5,
        year: 2019,
        date: 1
    })).rejects.toThrow(
        "expected properties month passed as non floating number!"
    );
});

it("throw error when month set outside the expected value (0 to 11)", () => {
    return expect(dayCrawl({
        month: -1,
        year: 2019,
        date: 1
    })).rejects.toThrow(
        "expected properties month passed integer from 1 to 12"
    );
});

it("throw error when month is not passed in options", () => {
    return expect(dayCrawl({ year: 2019, date: 1 }))
        .rejects.toThrow(`expected properties month passed in options`);
});

it("throw error when year is not passed in options", () => {
    return expect(dayCrawl({ month: 11, date: 1 }))
        .rejects.toThrow(`expected properties year passed in options`);
});

it("throw error when year set to string", () => {
    return expect(dayCrawl({
        month: 11,
        year: "two thousand and eighteenth",
        date: 1
    })).rejects.toThrow(
        "expected properties year passed in as number!"
    );
});

it("throw error when year set to floating number", () => {
    return expect(dayCrawl({
        month: 11,
        year: 2019.5,
        date: 1
    })).rejects.toThrow(
        "expected properties year passed in as non floating number!"
    );
});

it("throw error when date is not passed in options", () => {
    return expect(dayCrawl({ 
        month: 1, 
        year: 2019 
    }))
        .rejects.toThrow(`expected properties date passed in options`);
});

it("throw error when date set to string", () => {
    return expect(dayCrawl({
        month: 11,
        year: 2019,
        date: 'satu'
    })).rejects.toThrow(
        "expected properties date passed in as number!"
    );
});

it("throw error when date set to floating number", () => {
    return expect(dayCrawl({
        month: 11,
        year: 2019,
        date: 1.5
    })).rejects.toThrow(
        "expected properties date passed in as non floating number!"
    );
});

it("throw error when date set to negatif number", () => {
    return expect(dayCrawl({
        month: 11,
        year: 2019,
        date: -1
    })).rejects.toThrow(
        "expected properties date passed not as negatif number or zero!"
    );
});

it("throw error when date set to invalid in a month", () => {
    return expect(dayCrawl({
        month: 11,
        year: 2019,
        date: 32
    })).rejects.toThrow(
        "32/11/2019 is not a valid date!"
    );
});