const mock = require('../__mocks__/fetch-purnama-tilem');
const purnamaTilem = require('../modules/purnama-tilem');

jest.mock('../html-fetch', () => {
    return jest.fn(mock)
});

it("throw error when month set to string \"november\"", () => {
    return expect(purnamaTilem({
        month: "november",
        year: 2018
    })).rejects.toThrow(
        "month expected as integer and value from 0 to 11!"
    );
})

it("throw error when month set outside the expected value (0 to 11)", () => {
    return expect(purnamaTilem({
        month: -1, 
        year: 2018
    })).rejects.toThrow(
        "month expected as integer and value from 0 to 11!"
    );
})

it("throw error when year is not set", () => {
    return expect(purnamaTilem({month: 11})).rejects.toThrow(
        "year expected as integer!"
    );
})

it("throw error when year is not integer", () => {
    return expect(purnamaTilem({
        month: 11, 
        year: "two thousand and eighteenth"
    })).rejects.toThrow(
        "year expected as integer!"
    );
})

it("throw error when year is below 0", () => {
    return expect(purnamaTilem({
        month: 11, 
        year: -2018
    })).rejects.toThrow(
        "year expected not as negatif number!"
    );
})

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