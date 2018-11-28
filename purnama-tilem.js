const cheerio = require('cheerio');
const htmlFetch = require('./html-fetch');
const utils = require('./utils');

const purnamaTilem = async (bulan, tahun) => {
    try {
        const html = await htmlFetch(`http://kalenderbali.org/purnamatilem.php?tahun=${tahun}`);        
        const $ = cheerio.load(html);
        let lists = $(".daftar").html().split("<br>");
        let dates = [];
        bulan = utils.getFullMonth(bulan);
        lists.forEach((list, index) => {
            if (list.indexOf(bulan) != -1) {
                list = list.replace("- ", "").split(". ");
                let date = list[0].split(" ");
                let information = list[1];
                let eventName = "purnama";
                if (information.indexOf("Tilem") != -1) {
                    eventName = "tilem";
                }
                dates = utils.insertToArray(dates, {
                    type: "purnama-tilem",
                    event_name: eventName,
                    information
                }, date);
            }
        })
        // console.log({dates})
        return dates;
    }
    catch (err) {
        console.log({ err })
        return 0;
    }
}

module.exports = purnamaTilem;