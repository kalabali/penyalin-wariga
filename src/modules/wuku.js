const cheerio = require('cheerio');
const htmlFetch = require('../helpers/html-fetch');
const utils = require('../helpers/utils');

const wuku = async ({ month, year }) => {    
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
        const html = await htmlFetch(`http://www.babadbali.com/pewarigaan/kalebali.php?month=${month}&year=${targetedYear}`);        
        const $ = cheerio.load(html);
        const wukuRow = $("table[background='img/bg2.gif'] tbody tr").html().trim().split("\n");
        let wukus = [];
        wukuRow.shift();
        wukuRow.forEach(week => {
            wukus.push($(week).find("h5").html());
        })                
        return wukus;
    }
    catch(err){
        throw new Error(err);
    }
}

module.exports = wuku;