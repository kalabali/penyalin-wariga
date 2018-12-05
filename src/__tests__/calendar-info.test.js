const mock = require('../__mocks__/calendar-info-11-2018');
const calendarBaliInfo = require('../modules/calendar-bali-info');

jest.mock('../html-fetch', () => {
    return jest.fn(mock)
});

it("throw error when passed non object", () => {
    return expect(calendarBaliInfo("non object"))
        .rejects.toThrow('expected object as options!');
});

it("throw error when month is not passed in options", () => {
    return expect(calendarBaliInfo({ year: 2018 }))
        .rejects.toThrow(`expected properties month passed in options`);
});

it("throw error when year is not passed in options", () => {
    return expect(calendarBaliInfo({ month: 11 }))
        .rejects.toThrow(`expected properties year passed in options`);
});

it("throw error when month set to string \"november\"", () => {
    return expect(calendarBaliInfo({
        month: "november",
        year: 2018
    })).rejects.toThrow(
        "expected properties month passed in as number!"
    );
});

it('Getting rerainan and memorial day on november 2018', () => {
    expect.assertions(1);
    return calendarBaliInfo({
        month: 11,
        year: 2018
    })
        .then(data => {
            expect(data).toEqual(
                expect.objectContaining({
                    "rerainanDay": expect.arrayContaining([
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
                }),
                expect.objectContaining({
                    "memorialDay": expect.arrayContaining([
                        {
                            "date": "10",
                            "month": "Nopember",
                            "year": 2018,
                            "events": [
                                {
                                    "type": "hari-peringatan",
                                    "event_name": "Hari Pahlawan",
                                    "information": ""
                                }
                            ]
                        },
                        {
                            "date": "15",
                            "month": "Nopember",
                            "year": 2018,
                            "events": [
                                {
                                    "type": "hari-peringatan",
                                    "event_name": "Hari Hening dan Doa Nasional",
                                    "information": ""
                                }
                            ]
                        },
                        {
                            "date": "20",
                            "month": "Nopember",
                            "year": 2018,
                            "events": [
                                {
                                    "type": "hari-peringatan",
                                    "event_name": "Hari Puputan Margarana (regional)",
                                    "information": ""
                                }
                            ]
                        },
                        {
                            "date": "25",
                            "month": "Nopember",
                            "year": 2018,
                            "events": [
                                {
                                    "type": "hari-peringatan",
                                    "event_name": "Hari PGRI",
                                    "information": ""
                                }
                            ]
                        },
                        {
                            "date": "29",
                            "month": "Nopember",
                            "year": 2018,
                            "events": [
                                {
                                    "type": "hari-peringatan",
                                    "event_name": "Hari Korpri",
                                    "information": ""
                                }
                            ]
                        }
                    ])
                })
            )
        })
})

// expect.arrayContaining([

// ])