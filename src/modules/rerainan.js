const { monthChecker, checkObject, yearChecker, dateChecker } = require('../helpers/validators');
const calendarBaliInfo = require('./calendar-bali-info');

const rerainan = async (options) => {
    try{
        checkObject(options, ['month', 'year']);
        const { month, year } = options;
        let date = 0;        
        
        if(options.hasOwnProperty('date')){
            dateChecker(options.date, month, year);
            date = options.date;
            console.log("masul")
        }
        else{
            monthChecker(month);
            yearChecker(year);
        }
        
        const { rerainanDay } = await calendarBaliInfo({month, year});

        if(date !== 0){
            const rerainan = rerainanDay.find(day => day.date === date);
            return rerainan;
        }
        
        return rerainanDay;
    }
    catch(err){
        throw new Error(err);
    }
}

module.exports = rerainan;