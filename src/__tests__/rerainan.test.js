const mock = require('../__mocks__/calendar-info-11-2018-json');
const rerainan = require('../modules/rerainan');

jest.mock('../modules/calendar-bali-info', () => {
    return jest.fn(mock)
});

it("throw error when passed non object", () => {
    return expect(rerainan("non object"))
        .rejects.toThrow('expected object as options!');
});

it("throw error when month is not passed in options", () => {
    return expect(rerainan({ year: 2018 }))
        .rejects.toThrow(`expected properties month passed in options`);
});

it("throw error when year is not passed in options", () => {
    return expect(rerainan({ month: 11 }))
        .rejects.toThrow(`expected properties year passed in options`);
});

it("throw error when month set to string \"november\"", () => {
    return expect(rerainan({
        month: "november",
        year: 2018
    })).rejects.toThrow(
        "expected properties month passed in as number!"
    );
});