const cheerio = require('cheerio');
const htmlFetch = require('../helpers/html-fetch');
const utils = require('../helpers/utils');
const { monthChecker, checkObject, yearChecker } = require('../helpers/validators');

const calendarBaliOrg = async options => {
    try {
        checkObject(options, ['month', 'year']);
        const { month, year } = options;

        monthChecker(month);
        yearChecker(year);
    }
    catch (err) {
        throw new Error(err);
    }
}

module.exports = calendarBaliOrg