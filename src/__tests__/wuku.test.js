const mock = require('../__mocks__/fetch-wuku');
const wuku = require('../modules/wuku');

jest.mock('../helpers/html-fetch', () => {
    return jest.fn(mock)
});

it("throw error when passed nothing", () => {
    return expect(wuku())
        .rejects.toThrow('expected to passed object as options!');
});

it("throw error when only passed string", () => {
    return expect(wuku("non object"))
        .rejects.toThrow('expected to passed object as options!');
});

it("throw error when only passed number", () => {
    return expect(wuku(12))
        .rejects.toThrow('expected to passed object as options!');
});

it("throw error when month set to string \"november\"", () => {
    return expect(wuku({
        month: "november",
        year: 2018
    })).rejects.toThrow(
        "expected properties month passed in as number!"
    );
});

it("throw error when month set to floating number", () => {
    return expect(wuku({
        month: 12.5,
        year: 2018
    })).rejects.toThrow(
        "expected properties month passed as non floating number!"
    );
});

it("throw error when month set outside the expected value (0 to 11)", () => {
    return expect(wuku({
        month: -1,
        year: 2018
    })).rejects.toThrow(
        "expected properties month passed integer from 1 to 12"
    );
})

it("throw error when year is not set", () => {
    return expect(wuku({ month: 11 })).rejects.toThrow(
        "expected properties year passed in options"
    );
});

it("throw error when year is not integer", () => {
    return expect(wuku({
        month: 11,
        year: "two thousand and eighteenth"
    })).rejects.toThrow(
        "expected properties year passed in as number!"
    );
});

it("throw error when passed floating number as year", () => {
    return expect(wuku({
        month: 11,
        year: 2018.7
    })).rejects.toThrow(
        "expected properties year passed in as non floating number!"
    );
});

it("throw error when year is below 0", () => {
    return expect(wuku({
        month: 11,
        year: -2018
    })).rejects.toThrow(
        "expected properties year passed in as non negatif number!"
    );
})

it("Getting the november 2018 wuku", () => {
    expect.assertions(1);
    return wuku({
        month: 11,
        year: 2018
    })
        .then(data => {
            expect(data).toEqual(
                expect.arrayContaining(["Ukir", "Kulantir", "Tolu", "Gumbreg", "Wariga"])
            )
        })
})