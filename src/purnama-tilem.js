const cheerio = require('cheerio');
const htmlFetch = require('./html-fetch');
const utils = require('./helpers/utils');

const purnamaTilem = async ( month, year ) => {        
    try {
        const targetedMonth = utils.getFullMonth(month);
        if(!targetedMonth){
            throw new Error("month expected as integer and value from 0 to 11!");
        };
        const targetedYear = parseInt(year);                
        if(isNaN((targetedYear))){
            throw new Error("year expected as integer!");
        };
        if(targetedYear < 0){
            throw new Error("year expected not as negatif number!")
        };
        const html = await htmlFetch(`http://kalenderbali.org/purnamatilem.php?tahun=${year}`);
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

module.exports = purnamaTilem;