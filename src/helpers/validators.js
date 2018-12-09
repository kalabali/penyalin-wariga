
const validateDate = ({ year, month, date }) => {
    let err = [];    
    if(year != undefined){        
        year = parseInt(year);
        if(typeof year != "number" || !Number.isInteger(year)){            
            err.push({
                error: "tahun",
                message: "date must be an"
            })
        }
        else{
            if(year < 2013 || year > 2023){
                err.push({
                    error: "tahun",
                    message: "tahun yang tersedia saat ini dari 2013 - 2023"
                })  
            }
        }
    }
    if(month != undefined){        
        month = parseInt(month);
        if(typeof month != "number" || !Number.isInteger(month)){
            err.push({
                error: "bulan",
                message: "bulan harus berupa angka (integer)"
            })
        }            
        else{            
            if(month > 12 || month < 1){
                err.push({
                    error: "bulan",
                    message: "bulan yang tersedia dari 1 (januari) hingga 12 (desember)"
                })
            }
        }
    }
    if(date != undefined){        
        date = parseInt(date);
        if(typeof date != "number" || !Number.isInteger(date)){            
            err.push({
                error: "tanggal",
                message: "tanggal harus berupa angka (integer)"
            })
        }
        else{
            let lastDate = this.getLastDate(month, year);
            if(date > lastDate || date <= 0){
                err.push({
                    error: "tanggal",
                    message: `tanggal yang tersedia untuk bulan ${this.getFullMonth(month)} adalah 1 hingga ${lastDate}`
                })  
            }
        }
    }
    return err;
}

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
        if(!obj[key]){
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
        throw new Error('expected properties date passed as number!');
    }
    if(date % 1 !== 0){
        throw new Error('expected properties date passed as integer!');
    }
    if(date < 0){
        throw new Error('expected properties date passed not as negatif integer!');
    }
    const lastDate = getLastDate(month, year);
    if(date > lastDate){
        throw new Error(`${date}/${month}/${year} is not a valid date!`);
    }
    return true;
}

const getLastDate = (month, year) => {
    let isKabisat = false;
    if(year % 4 == 0){
        if(year % 100 == 0){
            if(year % 400 == 0){
                isKabisat = true;
            }            
        }
        else{
            isKabisat = true;
        }
    }
    if(isKabisat && month === 2){
        return 29;
    }
    else if(month === 2){
        return 28;
    }
    else if((month > 7 && month % 2 == 0) || (month < 7 && month % 2 == 1)){
        return 31;
    }
    return 30;    
}

module.exports = {
    validateDate,
    monthChecker,
    checkObject,
    yearChecker,
    dateChecker
}