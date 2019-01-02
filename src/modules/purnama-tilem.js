require('dotenv').config();

const cheerio = require('cheerio');
const htmlFetch = require('../helpers/html-fetch');
const { checkObject, monthChecker, yearChecker } = require('../helpers/validators');
const utils = require('../helpers/utils');

const purnamaTilem = async options => {        
    try {
        checkObject(options, ['month', 'year']);
        const { month, year } = options;

        monthChecker(month);
        yearChecker(year);

        const targetedMonth = utils.getFullMonth(month);

        const html = await htmlFetch(`${process.env.SOURCE_DOT_ORG_URL}/purnamatilem.php?tahun=${year}`);
        const $ = cheerio.load(html);
        let lists = $(".daftar").html().split("<br>");
        let dates = [];        
        lists.forEach(list => {
            if (list.indexOf(targetedMonth) != -1) {
                list = list.replace("- ", "").split(". ");
                let date = list[0].split(" ");
                let information = list[1];
                let eventName = "purnama";
                if (information.indexOf("Tilem") != -1) {
                    eventName = "tilem";
                };
                dates = utils.insertToArray(dates, {
                    type: "purnama-tilem",
                    event_name: eventName,
                    information
                }, date);
            };
        });
        return dates;
    }
    catch (err) {        
        throw new Error(err);
    }
}

// purnamaTilem({
//     month: 11, 
//     year: 2018
// }).then(result => console.log(result))

module.exports = purnamaTilem;