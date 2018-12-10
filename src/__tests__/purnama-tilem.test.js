const mock = require('../__mocks__/fetch-purnama-tilem');
const purnamaTilem = require('../modules/purnama-tilem');

jest.mock('../helpers/html-fetch', () => {
    return jest.fn(mock)
});

it("throw error when passed nothing", () => {
    return expect(purnamaTilem())
        .rejects.toThrow('expected to passed object as options!');
});

it("throw error when only passed string", () => {
    return expect(purnamaTilem("non object"))
        .rejects.toThrow('expected to passed object as options!');
});

it("throw error when only passed number", () => {
    return expect(purnamaTilem(12))
        .rejects.toThrow('expected to passed object as options!');
});

it("throw error when month is not set", () => {
    return expect(purnamaTilem({year: 2018})).rejects.toThrow(
        " expected properties month passed in options"
    );
});

it("throw error when month set to string \"november\"", () => {
    return expect(purnamaTilem({
        month: "november",
        year: 2018
    })).rejects.toThrow(
        "expected properties month passed in as number!"
    );
});

it("throw error when month set to floating number", () => {
    return expect(purnamaTilem({
        month: 12.5,
        year: 2018
    })).rejects.toThrow(
        "expected properties month passed as non floating number!"
    );
});

it("throw error when month set outside the expected value (0 to 11)", () => {
    return expect(purnamaTilem({
        month: -1, 
        year: 2018
    })).rejects.toThrow(
        "expected properties month passed integer from 1 to 12"
    );
});

it("throw error when year is not set", () => {
    return expect(purnamaTilem({month: 11})).rejects.toThrow(
        " expected properties year passed in options"
    );
});

it("throw error when year set to string", () => {
    return expect(purnamaTilem({
        month: 11, 
        year: "two thousand and eighteenth"
    })).rejects.toThrow(
        "expected properties year passed in as number!"
    );
});

it("throw error when year set to floating number", () => {
    return expect(purnamaTilem({
        month: 11, 
        year: 2018.5
    })).rejects.toThrow(
        "expected properties year passed in as non floating number!"
    );
});

it("throw error when year is below 0", () => {
    return expect(purnamaTilem({
        month: 11, 
        year: -2018
    })).rejects.toThrow(
        "expected properties year passed in as non negatif number!"
    );
});

it('Getting purnama tilem on november 2018', () => {
    expect.assertions(1);
    return purnamaTilem({
        month: 11, 
        year: 2018
    })
        .then(data => {
            // console.log({datas: data})
            expect(data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        date: 7,
                        month: "Nopember",
                        year: 2018,
                        events: [
                            {
                                type: "purnama-tilem",
                                event_name: "tilem",
                                information: "Tilem Kelima"
                            }
                        ]
                    }),
                    expect.objectContaining({
                        date: 22,
                        month: "Nopember",
                        year: 2018,
                        events: [
                            {
                                type: "purnama-tilem",
                                event_name: "purnama",
                                information: "Purnama Kenam"
                            }
                        ]
                    })
                ])
            )
        });
});