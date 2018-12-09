const cheerio = require('cheerio');
const htmlFetch = require('../helpers/html-fetch');
const { checkObject, monthChecker, yearChecker } = require('../helpers/validators');

const wuku = async options => {    
    try {        
        checkObject(options, ['month', 'year']);
        const { month, year } = options;
        monthChecker(month);
        yearChecker(year);
               
        const html = await htmlFetch(`http://www.babadbali.com/pewarigaan/kalebali.php?month=${month}&year=${year}`);

        const $ = cheerio.load(html);
        const wukuRow = $("table[background='img/bg2.gif'] tbody tr").html().trim().split("\n");
        wukuRow.shift();
        let wukus = wukuRow.map(week => $(week).find("h5").html());        
        return wukus;
    }
    catch(err){
        throw new Error(err);
    }
}

wuku({month: 11, year: 2018}).then(data => console.log({data})).catch(err => console.log({err}))

module.exports = wuku;