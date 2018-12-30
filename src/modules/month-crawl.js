const cheerio = require('cheerio');
const htmlFetch = require('../helpers/html-fetch');
const { checkObject, monthChecker, yearChecker } = require('../helpers/validators');
const { getEngMonth } = require('../helpers/utils');

const monthCrawl = async options => {
    try {
        checkObject(options, ['month', 'year']);
        const { month, year } = options;
        monthChecker(month);
        yearChecker(year);

        const html = await htmlFetch(`http://kalenderbali.info/?month=${month}&year=${year}&submit=Tampilkan`);

        let monthData = {
            month: {
                index: month,
                string: getEngMonth(month)
            },
            year: year,
            caka_year: '',
            timestamp: new Date(`${year}-${month < 10 ? `0${month}` : month}-01T00:00:00Z`).valueOf(),
            weeks: []
        };

        const $ = cheerio.load(html);

        monthData.caka_year = parseInt($('div.judul2').text().split(' ')[1]);
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
                wuku: wuku,
                ingkel: ingkels[index],
                bhatara: bhatara[index],
                dates: []
            };
        });

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
                    timestamp: new Date(`${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}T00:00:00Z`).valueOf(),
                    event: {
                        event_name: event.trim(),
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

monthCrawl({ month: 1, year: 2019 })
    .then(data => console.log({ data })).catch(err => console.log(err))

module.exports = monthCrawl;