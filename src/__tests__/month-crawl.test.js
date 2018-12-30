const mock = require('../__mocks__/month-crawl');
const monthCrawl = require('../modules/month-crawl');

jest.mock('../helpers/html-fetch', () => {
    return jest.fn(mock)
});

it("throw error when passed nothing", () => {
    return expect(monthCrawl())
        .rejects.toThrow('expected to passed object as options!');
});

it("throw error when only passed string", () => {
    return expect(monthCrawl("non object"))
        .rejects.toThrow('expected to passed object as options!');
});

it("throw error when only passed number", () => {
    return expect(monthCrawl(12))
        .rejects.toThrow('expected to passed object as options!');
});

it("throw error when month set to string \"november\"", () => {
    return expect(monthCrawl({
        month: "november",
        year: 2019
    })).rejects.toThrow(
        "expected properties month passed in as number!"
    );
});

it("throw error when month set to floating number", () => {
    return expect(monthCrawl({
        month: 12.5,
        year: 2019
    })).rejects.toThrow(
        "expected properties month passed as non floating number!"
    );
});

it("throw error when month set outside the expected value (0 to 11)", () => {
    return expect(monthCrawl({
        month: -1,
        year: 2019
    })).rejects.toThrow(
        "expected properties month passed integer from 1 to 12"
    );
});

it("throw error when month is not passed in options", () => {
    return expect(monthCrawl({ year: 2019 }))
        .rejects.toThrow(`expected properties month passed in options`);
});

it("throw error when year is not passed in options", () => {
    return expect(monthCrawl({ month: 11 }))
        .rejects.toThrow(`expected properties year passed in options`);
});

it("throw error when year set to string", () => {
    return expect(monthCrawl({
        month: 11,
        year: "two thousand and eighteenth"
    })).rejects.toThrow(
        "expected properties year passed in as number!"
    );
});

it("throw error when year set to floating number", () => {
    return expect(monthCrawl({
        month: 11,
        year: 2019.5
    })).rejects.toThrow(
        "expected properties year passed in as non floating number!"
    );
});

it("should return information and event in january 2019", () => {
    return monthCrawl({
        month: 1,
        year: 2019
    })
        .then(data => {
            const { monthData, events } = data;
            expect(monthData).toEqual({
                "month": {
                    "index": 1,
                    "string": "January"
                },
                "year": 2019,
                "caka_year": 1940,
                "timestamp": 1546300800000,
                "weeks": [
                    {
                        "wuku": "Kuningan",
                        "ingkel": "Buku",
                        "bhatara": "Bhatara Indra",
                        "dates": []
                    },
                    {
                        "wuku": "Langkir",
                        "ingkel": "Wong",
                        "bhatara": "Bhatara Kala",
                        "dates": []
                    },
                    {
                        "wuku": "Medangsia",
                        "ingkel": "Sato",
                        "bhatara": "Bhatara Brahma",
                        "dates": []
                    },
                    {
                        "wuku": "Pujut",
                        "ingkel": "Mina",
                        "bhatara": "Bhatara Guritna",
                        "dates": []
                    },
                    {
                        "wuku": "Pahang",
                        "ingkel": "Manuk",
                        "bhatara": "Bhatara Tantra",
                        "dates": []
                    }
                ]
            })

            expect(events).toEqual([
                {
                    date: 4,
                    month: 1,
                    year: 2019,
                    timestamp: 1546560000000,
                    event:
                    {
                        event_name: 'Hari Penampahan Kuningan',
                        event_type: 'rerainan'
                    }
                },
                {
                    date: 5,
                    month: 1,
                    year: 2019,
                    timestamp: 1546646400000,
                    event: { event_name: 'Hari Suci Siwalatri', event_type: 'rerainan' }
                },
                {
                    date: 5,
                    month: 1,
                    year: 2019,
                    timestamp: 1546646400000,
                    event: { event_name: 'Hari Raya Kuningan', event_type: 'rerainan' }
                },
                {
                    date: 5,
                    month: 1,
                    year: 2019,
                    timestamp: 1546646400000,
                    event: { event_name: 'Kajeng Kliwon Uwudan', event_type: 'rerainan' }
                },
                {
                    date: 6,
                    month: 1,
                    year: 2019,
                    timestamp: 1546732800000,
                    event:
                    {
                        event_name: 'Hari Tilem Sasih Kapitu',
                        event_type: 'rerainan'
                    }
                },
                {
                    date: 9,
                    month: 1,
                    year: 2019,
                    timestamp: 1546992000000,
                    event:
                    {
                        event_name: 'Hari Buda Cemeng Langkir',
                        event_type: 'rerainan'
                    }
                },
                {
                    date: 11,
                    month: 1,
                    year: 2019,
                    timestamp: 1547164800000,
                    event: { event_name: 'Hari Bhatari Sri', event_type: 'rerainan' }
                },
                {
                    date: 15,
                    month: 1,
                    year: 2019,
                    timestamp: 1547510400000,
                    event:
                    {
                        event_name: 'Hari Anggara Kasih Medangsia',
                        event_type: 'rerainan'
                    }
                },
                {
                    date: 20,
                    month: 1,
                    year: 2019,
                    timestamp: 1547942400000,
                    event: { event_name: 'Hari Purnama Kawolu', event_type: 'rerainan' }
                },
                {
                    date: 20,
                    month: 1,
                    year: 2019,
                    timestamp: 1547942400000,
                    event: { event_name: 'Kajeng Kliwon Enyitan', event_type: 'rerainan' }
                },
                {
                    date: 30,
                    month: 1,
                    year: 2019,
                    timestamp: 1548806400000,
                    event:
                    {
                        event_name: 'Hari Buda Kliwon Pahang (Pegat Uwakan)',
                        event_type: 'rerainan'
                    }
                },
                {
                    date: 1,
                    month: 1,
                    year: 2019,
                    timestamp: 1546300800000,
                    event: { event_name: 'Tahun Baru', event_type: 'ceremonial' }
                },
                {
                    date: 10,
                    month: 1,
                    year: 2019,
                    timestamp: 1547078400000,
                    event:
                    {
                        event_name: 'Hari Peringatan Tritura',
                        event_type: 'ceremonial'
                    }
                },
                {
                    date: 25,
                    month: 1,
                    year: 2019,
                    timestamp: 1548374400000,
                    event:
                    {
                        event_name: 'Hari Kusta Internasional',
                        event_type: 'ceremonial'
                    }
                },
                {
                    date: 5,
                    month: 1,
                    year: 2019,
                    timestamp: 1546646400000,
                    event:
                    {
                        event_name: 'Pura Ulun Kulkul Besakih',
                        event_type: 'temple\'s rerainan'
                    }
                },
                {
                    date: 5,
                    month: 1,
                    year: 2019,
                    timestamp: 1546646400000,
                    event:
                    {
                        event_name: 'Pura Dalem Purnajati Tanjungpuri Tanjung Priyok Jakarta Utara',
                        event_type: 'temple\'s rerainan'
                    }
                },
                {
                    date: 5,
                    month: 1,
                    year: 2019,
                    timestamp: 1546646400000,
                    event:
                    {
                        event_name: 'Pura Agung Blambangan Banyuwangi',
                        event_type: 'temple\'s rerainan'
                    }
                },
                {
                    date: 5,
                    month: 1,
                    year: 2019,
                    timestamp: 1546646400000,
                    event:
                    {
                        event_name: 'Pura Kerti Bhuana Waylunik Bandar Lampung',
                        event_type: 'temple\'s rerainan'
                    }
                },
                {
                    date: 5,
                    month: 1,
                    year: 2019,
                    timestamp: 1546646400000,
                    event:
                    {
                        event_name: 'Pura Sakenan Serangan Denpasar',
                        event_type: 'temple\'s rerainan'
                    }
                },
                {
                    date: 7,
                    month: 1,
                    year: 2019,
                    timestamp: 1546819200000,
                    event:
                    {
                        event_name: 'Pura Manik Bingin - Kemoning',
                        event_type: 'temple\'s rerainan'
                    }
                },
                {
                    date: 15,
                    month: 1,
                    year: 2019,
                    timestamp: 1547510400000,
                    event:
                    {
                        event_name: 'Pura Suralaya - Banda',
                        event_type: 'temple\'s rerainan'
                    }
                },
                {
                    date: 15,
                    month: 1,
                    year: 2019,
                    timestamp: 1547510400000,
                    event:
                    {
                        event_name: 'Pura Batur - Kemoning',
                        event_type: 'temple\'s rerainan'
                    }
                },
                {
                    date: 15,
                    month: 1,
                    year: 2019,
                    timestamp: 1547510400000,
                    event:
                    {
                        event_name: 'Pura Andakasa - Karangasem',
                        event_type: 'temple\'s rerainan'
                    }
                },
                {
                    date: 15,
                    month: 1,
                    year: 2019,
                    timestamp: 1547510400000,
                    event:
                    {
                        event_name: 'Pura Goa Lawah - Klungkung',
                        event_type: 'temple\'s rerainan'
                    }
                },
                {
                    date: 15,
                    month: 1,
                    year: 2019,
                    timestamp: 1547510400000,
                    event:
                    {
                        event_name: 'Pura Luhur Uluwatu - Badung',
                        event_type: 'temple\'s rerainan'
                    }
                },
                {
                    date: 15,
                    month: 1,
                    year: 2019,
                    timestamp: 1547510400000,
                    event:
                    {
                        event_name: 'Pura Taman Ayun',
                        event_type: 'temple\'s rerainan'
                    }
                },
                {
                    date: 15,
                    month: 1,
                    year: 2019,
                    timestamp: 1547510400000,
                    event:
                    {
                        event_name: 'Pura Pusering Jagat Tampaksiring',
                        event_type: 'temple\'s rerainan'
                    }
                },
                {
                    date: 16,
                    month: 1,
                    year: 2019,
                    timestamp: 1547596800000,
                    event:
                    {
                        event_name: 'Pura Dalem Kauh Kemoning',
                        event_type: 'temple\'s rerainan'
                    }
                },
            ])
        })
})
