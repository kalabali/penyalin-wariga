require('dotenv').config();

const cheerio = require('cheerio');
const htmlFetch = require('../helpers/html-fetch');
const { monthChecker, checkObject, yearChecker } = require('../helpers/validators');

const calendarBaliInfo = async options => {    
    try {
        checkObject(options, ['month', 'year']);
        const { month, year } = options;

        monthChecker(month);
        yearChecker(year);
        
        const html = await htmlFetch(`${process.env.SOURCE_DOT_INFO_URL}/?month=${month}&year=${year}`);        
        const $ = cheerio.load(html);

        const wuku = $('.judulAtas.orange').map((index, el) => $(el).text().trim()).get()
        console.log({wuku})
        return { wuku: wuku };
    }
    catch (err) {
        throw new Error(err);
    }
}

// calendarBaliInfo({year: 2018, month: 12 })
//     .then(result => {  console.log(JSON.stringify(result)); })

module.exports = calendarBaliInfo;

