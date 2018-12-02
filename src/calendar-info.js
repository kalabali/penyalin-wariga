const cheerio = require('cheerio');
const htmlFetch = require('./html-fetch');
const utils = require('./helpers/utils');

const rerainan = async ({ month, year }) => {
    try {
        const html = await htmlFetch(`http://kalenderbali.info/?month=${month}&year=${year}`);
        const $ = cheerio.load(html);

        let rerainanCol = $("#right-column-1 .box table tbody").html();
        let memorialCol = $("#right-column-2 .box table tbody").html().replace(/<\/tr><tr>/g, "<tr>||</tr>").split("||");

        if (!rerainanCol || !memorialCol) {
            throw new Error('There is an error in resource.');
        }
        rerainanCol = rerainanCol.replace(/<\/tr><tr>/g, "<tr>||</tr>").split("||");
        let rerainanDay = [];
        rerainanCol.forEach(r => {
            const d = $(r).text().split(".");
            let storedR = {
                date: d[0],
                month: utils.getFullMonth(month),
                year: year,
                events: []
            }
            d[1].split(";").forEach(e => {
                let event = e.split(",");
                storedR.events.push({
                    type: "rerainan",
                    event_name: event[0],
                    information: (event[1] !== undefined) ? event[1] : ""
                })
            })
            rerainanDay.push(storedR);
        });

        let memorialDay = [];
        memorialCol.forEach(r => {
            const d = $(r).text().split(".");
            let storedP = {
                date: d[0],
                month: utils.getFullMonth(month),
                year: year,
                events: []
            }
            d[1].split(";").forEach(e => {
                let event = e.split(",");
                storedP.events.push({
                    type: "hari-peringatan",
                    event_name: event[0],
                    information: (event[1] !== undefined) ? event[1] : ""
                })
            })
            memorialDay.push(storedP);
        })

        return {
            rerainanDay,
            memorialDay
        };
    }
    catch (err) {
        throw new Error(err);
    }
}

rerainan({ month: 12, year: 2018 })
    .then(result => console.log({result}))

module.exports = rerainan;

