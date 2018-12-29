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

it("should return information about january 2019", () => {    
    return monthCrawl({
        month: 1,
        year: 2019
    })
    .then(data => {
        expect(data).toEqual({    
            "month" : {
                "index": 1,
                "string": "January"
            },
            "year" : 2019,
            "caka_year" : 1940,
            "weeks" : [ 
                {
                    "wuku" : "Kuningan",
                    "ingkel" : "Buku",
                    "bhatara": "Bhatara Indra",
                    "dates" : []
                }, 
                {
                    "wuku" : "Langkir",
                    "ingkel" : "Wong",
                    "bhatara": "Bhatara Kala",
                    "dates" : []
                }, 
                {
                    "wuku" : "Medangsia",
                    "ingkel" : "Sato",
                    "bhatara": "Bhatara Brahma",
                    "dates" : []
                },
                {
                    "wuku" : "Pujut",
                    "ingkel" : "Mina",
                    "bhatara": "Bhatara Guritna",
                    "dates" : []
                },
                {
                    "wuku" : "Pahang",
                    "ingkel" : "Manuk",
                    "bhatara": "Bhatara Tantra",
                    "dates" : []
                }
            ]
        })
    })
})
