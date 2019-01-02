require('dotenv').config();

const cheerio = require('cheerio');
const htmlFetch = require('../helpers/html-fetch');
const { checkObject, monthChecker, yearChecker } = require('../helpers/validators');
const { getEngMonth, getFullMonth } = require('../helpers/utils');

const monthCrawl = async options => {
    try {
        checkObject(options, ['month', 'year']);
        const { month, year } = options;
        monthChecker(month);
        yearChecker(year);

        const html = await htmlFetch(`${process.env.SOURCE_DOT_INFO_URL}/?month=${month}&year=${year}&submit=Tampilkan`);

        let monthData = {
            month: {
                index: month,
                english: getEngMonth(month),
                bahasa: getFullMonth(month)
            },
            year: {
                masehi: year,
                caka: ''
            },            
            timestamp: new Date(`${year}-${month < 10 ? `0${month}` : month}-01T00:00:00Z`),
            weeks: []
        };

        const $ = cheerio.load(html);

        monthData.year.caka = parseInt($('div.judul2').text().trim().split(' ').pop());
        const wukus = $('td.judulAtas.orange').map((index, el) => {
            return $(el).text().trim();
        }).get();

        const bhatara = $('td.judulAtas.hitam').filter((index, el) => {
            return index % 2 === 0;
        }).map((index, el) => {
            return $(el).text().trim();
        }).get();

        const ingkels = $('td.first.style1').filter((index, el) => {
            return $(el).children().length === 0
        }).map((index, el) => {
            return $(el).text().trim();
        }).get();

        monthData.weeks = wukus.map((wuku, index) => {
            return {
                wuku: wuku.toLowerCase(),
                ingkel: ingkels[index].toLowerCase(),
                bhatara: bhatara[index].toLowerCase(),
                dates: []
            };
        });

        let listing = $('table.listing > tbody > tr').map((index, el) => $(el).html()).get();
        // console.log(listing)
        listing.shift();
        listing.pop();
        listing.forEach(list => {
            const cells = $('td.first', list).map((index, el) => $(el).html()).get();            
            cells.shift();
            cells.forEach((cell, index) => {                
                if($(cell).children().length === 0){
                    return false;
                }                
                monthData.weeks[index].dates.push({
                    date : parseInt($('span > a',cell).html()),
                    month: {
                        index: month,
                        english: getEngMonth(month),
                        bahasa: getFullMonth(month)
                    },
                    year: { 
                        masehi: year
                    }
                });            
            });
        })        

        //getting event to push
        const events = $("div[id^='right-column'] .box tr").map((index, el) => {
            if ($(el).find('img').length !== 0) {
                return null;
            }
            const { id } = $(el).parent().parent().parent().parent().attr();
            let eventType = '';
            if (id === 'right-column-1') {
                eventType = 'rerainan';
            }
            else if (id === 'right-column-2') {
                eventType = 'ceremonial';
            }
            else if (id === 'right-column-3') {
                eventType = 'religious day';
            }
            else if (id === 'right-column-4') {
                eventType = 'temple\'s rerainan';
            }
            const event = $(el).text().trim().split('.');
            const date = parseInt(event[0]);
            const events = event[1].split(';');
            return events.map(event => {
                return {
                    date: date,
                    month: month,
                    year: year,
                    timestamp: new Date(`${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}T00:00:00Z`),
                    events: {
                        event_name: event.trim().toLowerCase(),
                        event_type: eventType
                    }
                };
            });
        }).get();

        return {
            monthData,
            events
        };

    }
    catch (err) {
        throw new Error(err);
    }
}

// monthCrawl({ month: 1, year: 2019 })
//     .then(data => console.log(
//         JSON.stringify(data)
//         )).catch(err => console.log(err))

module.exports = monthCrawl;