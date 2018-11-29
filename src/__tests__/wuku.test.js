const mock = require('../__mocks__/fetch-wuku');
const wuku = require('../wuku');

jest.mock('../html-fetch', () => {
    return jest.fn(mock)
});

it("throw error when month set to string \"november\"", () => {
    return expect(wuku("november", 2018)).rejects.toThrow(
        "month expected as integer and value from 0 to 11!"
    );
})

it("throw error when month set outside the expected value (0 to 11)", () => {
    return expect(wuku(-1, 2018)).rejects.toThrow(
        "month expected as integer and value from 0 to 11!"
    );
})

it("throw error when year is not set", () => {
    return expect(wuku(11)).rejects.toThrow(
        "year expected as integer!"
    );
})

it("throw error when year is not integer", () => {
    return expect(wuku(11, "two thousand and eighteenth")).rejects.toThrow(
        "year expected as integer!"
    );
})

it("throw error when year is below 0", () => {
    return expect(wuku(11, -2018)).rejects.toThrow(
        "year expected not as negatif number!"
    );
})

it("Getting the november 2018 wuku", () => {
    expect.assertions(1);
    return wuku(11, 2018)
        .then(data => {
            expect(data).toEqual(
                expect.arrayContaining(["Ukir", "Kulantir", "Tolu", "Gumbreg", "Wariga"])
            )
        })
})