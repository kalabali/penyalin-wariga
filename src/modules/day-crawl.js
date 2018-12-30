const cheerio = require('cheerio');
const htmlFetch = require('../helpers/html-fetch');
const { checkObject, dateChecker } = require('../helpers/validators');
const { getEngMonth } = require('../helpers/utils');

const dayCrawl = async options => {
    try {
        checkObject(options, ['month', 'year', 'date']);
        const { month, year, date } = options;        
        dateChecker(date, month, year);
    }
    catch (err) {
        throw new Error(err);
    }
}

module.exports = dayCrawl;