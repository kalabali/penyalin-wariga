const mock = require('../__mocks__/calendar-info-11-2018-json');
const rerainan = require('../modules/rerainan');

jest.mock('../modules/calendar-bali-info', () => {
    return jest.fn(mock)
});

it("throw error when passed nothing", () => {
    return expect(rerainan())
        .rejects.toThrow('expected to passed object as options!');
});

it("throw error when only passed string", () => {
    return expect(rerainan("non object"))
        .rejects.toThrow('expected to passed object as options!');
});

it("throw error when only passed number", () => {
    return expect(rerainan(12))
        .rejects.toThrow('expected to passed object as options!');
});

it("throw error when month is not passed in options", () => {
    return expect(rerainan({ year: 2018 }))
        .rejects.toThrow(`expected properties month passed in options`);
});

it("throw error when month set to string \"november\"", () => {
    return expect(rerainan({
        month: "november",
        year: 2018
    })).rejects.toThrow(
        "expected properties month passed in as number!"
    );
});

it("throw error when month set to floating number", () => {
    return expect(rerainan({
        month: 12.5,
        year: 2018
    })).rejects.toThrow(
        "expected properties month passed as non floating number!"
    );
});

it("throw error when month set outside the expected value (0 to 11)", () => {
    return expect(rerainan({
        month: -1, 
        year: 2018
    })).rejects.toThrow(
        "expected properties month passed integer from 1 to 12"
    );
});

it("throw error when year is not passed in options", () => {
    return expect(rerainan({ month: 11 }))
        .rejects.toThrow(`expected properties year passed in options`);
});

it("throw error when year set to string \"2018\"", () => {
    return expect(rerainan({
        month: 11,
        year: "2018"
    })).rejects.toThrow(
        "expected properties year passed in as number!"
    );
});

it("throw error when year set to floating number", () => {
    return expect(rerainan({
        month: 11, 
        year: 2018.5
    })).rejects.toThrow(
        "expected properties year passed in as non floating number!"
    );
});

it("throw error when year is below 0", () => {
    return expect(rerainan({
        month: 11, 
        year: -2018
    })).rejects.toThrow(
        "expected properties year passed in as non negatif number!"
    );
});

it("return set of rerainan that happen on november 2018", () => {
    expect.assertions(1);
    return rerainan({
        month: 11,
        year: 2018
    })
        .then(data => {
            expect(data).toEqual(
                expect.arrayContaining([
                    {
                        "date": "2",
                        "month": "Nopember",
                        "year": 2018,
                        "events": [
                            {
                                "type": "rerainan",
                                "event_name": "Hari Bhatari Sri",
                                "information": ""
                            }
                        ]
                    },
                    {
                        "date": "6",
                        "month": "Nopember",
                        "year": 2018,
                        "events": [
                            {
                                "type": "rerainan",
                                "event_name": "Kajeng Kliwon Uwudan",
                                "information": ""
                            },
                            {
                                "type": "rerainan",
                                "event_name": "Hari Anggarakasih Kulantir",
                                "information": ""
                            }
                        ]
                    },
                    {
                        "date": "7",
                        "month": "Nopember",
                        "year": 2018,
                        "events": [
                            {
                                "type": "rerainan",
                                "event_name": "Hari Tilem Sasih Kalima",
                                "information": ""
                            }
                        ]
                    },
                    {
                        "date": "21",
                        "month": "Nopember",
                        "year": 2018,
                        "events": [
                            {
                                "type": "rerainan",
                                "event_name": "Hari Buda Kliwon Gumbreg",
                                "information": ""
                            },
                            {
                                "type": "rerainan",
                                "event_name": "Kajeng Kliwon Enyitan",
                                "information": ""
                            }
                        ]
                    },
                    {
                        "date": "22",
                        "month": "Nopember",
                        "year": 2018,
                        "events": [
                            {
                                "type": "rerainan",
                                "event_name": "Hari Purnama Kanem",
                                "information": ""
                            }
                        ]
                    }
                ])
            )
        })
});

it("throw error when date passed as string", () => {
    return expect(rerainan({
        date: "6",
        month: 11,
        year: 2018
    })).rejects.toThrow(
        "expected properties date passed as number!"
    );
});

it("throw error when date passed as floating number", () => {
    return expect(rerainan({
        date: 6.5,
        month: 11,
        year: 2018
    })).rejects.toThrow(
        "expected properties date passed as integer!"
    );
});

it("throw error when date passed as negatif number", () => {
    return expect(rerainan({
        date: -1,
        month: 11,
        year: 2018
    })).rejects.toThrow(
        "expected properties date passed not as negatif integer or zero!"
    );
});

it("throw error when date passed as zero", () => {
    return expect(rerainan({
        date: 0,
        month: 11,
        year: 2018
    })).rejects.toThrow(
        "expected properties date passed not as negatif integer or zero!"
    );
});

// it("return rerainan on 6th november 2018", () => {
//     expect.assertions(1);
//     return rerainan
// })