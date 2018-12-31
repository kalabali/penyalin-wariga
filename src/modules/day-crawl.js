const cheerio = require('cheerio');
const htmlFetch = require('../helpers/html-fetch');
const { checkObject, dateChecker } = require('../helpers/validators');
const { getEngMonth, getFullMonth, parseDateToMasehi, parseDateToEnglish } = require('../helpers/utils');

const dayCrawl = async options => {
    try {
        checkObject(options, ['month', 'year', 'date']);
        const { month, year, date } = options;        
        dateChecker(date, month, year);

        const html = await htmlFetch(`http://www.kalenderbali.info/kalender/detailHari/${date}/${month}/${year}/hitam/html`);

        let $ = cheerio.load(html);

        if($('body').children().length === 0){
            return null;
        }

        let dateData = {            
            timestamp : new Date(`${year}-${month < 10 ? `0${month}` : month}-${date < 10 ? `0${date}` : date}T00:00:00Z`),
            date : date,
            day_name : {
                balinese: '',
                bahasa: '',
                english: ''
            },
            month: {
                index: month,
                english: getEngMonth(month),
                bahasa: getFullMonth(month)
            },
            year: { 
                masehi: year,
                caka: ''
            },
            wewaran : {
                ekawara: '-',
                dwiwara: '',
                triwara: '',
                caturwara: '',
                pancawara: '',
                sadwara: '',
                saptawara: '',
                astawara: '',
                sangawara: '',
                dasawara: ''
            },
            penanggal_pangelong: {
                status: '',
                value: 0
            },
            purnama_tilem: {
                status: false,
                type: '-'
            },
            wuku: '',
            ingkel: '',
            sasih : '',
            urip: '',           
            event : [ 
                {
                    event_name : 'purnama',
                    event_type : 'rerainan'
                }, 
                {
                    event_name : 'galungan',
                    event_type : 'rerainan'
                }
            ]
        };

        //wuku, nama hari, sasih, purnama tilem status                
        let centerUpCell = $(".isitanggal.hitam.tengahbawah").html().trim().split("<br>");                                
        dateData.day_name.balinese = $(centerUpCell[0]).text();        
        dateData.day_name.bahasa = parseDateToMasehi($(centerUpCell[0]).text());
        dateData.day_name.english = parseDateToEnglish($(centerUpCell[0]).text());
        dateData.wuku = centerUpCell[1];
        dateData.sasih = centerUpCell[2].split("-")[1];
        dateData.penanggal_pangelong.value = parseInt($(centerUpCell[3]).text());
        if(centerUpCell.indexOf("red")){
            dateData.penanggal_pangelong.status = "penanggal";
        }
        else{
            dateData.penanggal_pangelong.status = "pangelong";
        }

        //wewaran
        let wewaranFirstCell = $(".isitanggal.hitam.kiri").html().trim().split("<br>");             
        let wewaranSecondCell = $(".isitanggal.hitam.kanan")[1];                
        wewaranSecondCell = $(wewaranSecondCell).html().trim().split("<br>");                
        dateData.urip = wewaranFirstCell[4].split("=")[1];
        if(wewaranFirstCell[3] !== "--"){
            dateData.wewaran.ekawara = wewaranFirstCell[3];
        }
        dateData.wewaran.dwiwara = wewaranFirstCell[2];
        dateData.wewaran.triwara = $(wewaranFirstCell[0]).text();
        dateData.wewaran.caturwara = wewaranFirstCell[1];       
        dateData.wewaran.pancawara = $(wewaranSecondCell[0]).text();
        dateData.wewaran.sadwara = wewaranSecondCell[1];
        dateData.wewaran.saptawara = $(centerUpCell[0]).text();
        dateData.wewaran.astawara = wewaranSecondCell[2];
        dateData.wewaran.sangawara = wewaranSecondCell[3];
        dateData.wewaran.dasawara = wewaranSecondCell[4];
        
        let dateCell = $('.isitanggal.hitam.tengah')
        return dateData;
    }
    catch (err) {
        throw new Error(err);
    }
}

dayCrawl({
    month: 1,
    date: 3,
    year: 2019
})   .then(data => console.log(JSON.stringify(data)))
module.exports = dayCrawl;