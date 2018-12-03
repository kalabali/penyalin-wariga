
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
        throw new Error('month expect as a number!');
    }
    if(month < 0 || month > 11){
        throw new Error('month expect from 0 to 11!');
    }
    return true;
}

const checkObject = (obj, keys) => {
    if(typeof(obj) !== 'object'){
        throw new Error('expected object as options!');
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
        throw new Error('year expect as a number!');
    }
    if(year % 1 !== 0){
        throw new Error('year expect as a non floating number!');
    }
    if(year < 0){
        throw new Error('year expect as a non negatif number!');
    }
    return true;
}

module.exports = {
    validateDate,
    monthChecker,
    checkObject,
    yearChecker
}