const cheerio = require('cheerio');
const htmlFetch = require('../helpers/html-fetch');
const { checkObject, monthChecker, yearChecker } = require('../helpers/validators');
const { getEngMonth }= require('../helpers/utils');

const monthCrawl = async options => {    
    try {        
        checkObject(options, ['month', 'year']);
        const { month, year } = options;        
        monthChecker(month);
        yearChecker(year);
               
        const html = await htmlFetch(`http://kalenderbali.info/?month=${month}&year=${year}&submit=Tampilkan`);        

        let monthData = {
            month : {
                index: month,
                string: getEngMonth(month)
            },
            year : year,
            caka_year : '',
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
                wuku : wuku,
                ingkel : ingkels[index],
                bhatara: bhatara[index],
                dates : []
            };
        })

        return monthData;

    }
    catch(err){
        throw new Error(err);
    }
}

// monthCrawl({month: 1, year: 2019})
// .then(data => console.log({data})).catch(err => console.log(err))

module.exports = monthCrawl;