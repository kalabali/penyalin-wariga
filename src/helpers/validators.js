const utils = require('./utils');
const monthChecker = month => {
    if(typeof(month) !== 'number'){
        throw new Error('expected properties month passed in as number!');
    }
    if(month % 1 !== 0){
        throw new Error('expected properties month passed as non floating number!');
    }
    if(month < 1 || month > 12){
        throw new Error('expected properties month passed integer from 1 to 12');
    }
    return true;
}

const checkObject = (obj, keys) => {
    if(typeof(obj) !== 'object'){
        throw new Error('expected to passed object as options!');
    }
    keys.forEach(key => {
        if(!obj.hasOwnProperty(key)){
            throw new Error(`expected properties ${key} passed in options`);
        }
    })
    return true;
}

const yearChecker = year => {
    if(typeof(year) !== 'number'){
        throw new Error('expected properties year passed in as number!');
    }
    if(year % 1 !== 0){
        throw new Error('expected properties year passed in as non floating number!');
    }
    if(year < 0){
        throw new Error('expected properties year passed in as non negatif number!');
    }
    return true;
}

const dateChecker = (date, month, year) => {    
    monthChecker(month);
    yearChecker(year);
    if(typeof(date) !== 'number'){
        throw new Error('expected properties date passed in as number!');
    }
    if(date % 1 !== 0){
        throw new Error('expected properties date passed in as non floating number!');
    }
    if(date <= 0){
        throw new Error('expected properties date passed not as negatif number or zero!');
    }
    const lastDate = utils.getLastDate(month, year);
    if(date > lastDate){
        throw new Error(`${date}/${month}/${year} is not a valid date!`);
    }
    return true;
}

module.exports = {
    validateDate,
    monthChecker,
    checkObject,
    yearChecker,
    dateChecker
}