function getFullMonth(index){
    index = parseInt(index);    
    const months = [
        "januari",
        "februari",
        "maret",
        "april",
        "mei",
        "juni",
        "juli",
        "agustus",
        "september",
        "oktober",
        "nopember",
        "desember"
    ];
    return months[index - 1];
}

function getEngMonth(index){
    const months = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"
    ];
    return months[index - 1];
}


function parseDateToMasehi(balineseDay){
    const day = {
        Redite: "minggu",
        Soma: "senin",
        Anggara: "selasa",
        Buda: "rabu",
        Wraspati: "kamis",
        Sukra: "jumat",
        Saniscara: "sabtu"
    }

    return day[balineseDay];
}

function parseDateToEnglish(balineseDay){
    const day = {
        Redite: "sunday",
        Soma: "monday",
        Anggara: "tuesday",
        Buda: "wednesday",
        Wraspati: "thursday",
        Sukra: "friday",
        Saniscara: "saturday"
    }

    return day[balineseDay];
}

function insertToArray(array, event, date){            
    if(array.length === 0){
        array.push({
            date: parseInt(date[0]),
            month: date[1],
            year: parseInt(date[2]),
            events: [
                event
            ]
        });
    }
    else{
        let dateIndex = array.findIndex(function(event){
            return (event.date == date[0] & event.month == date[1] && event.year == date[2])
        })                
        if(dateIndex != -1){
            array[dateIndex].events.push(event);
        }        
        else{
            array.push({
                date: parseInt(date[0]),
                month: date[1],
                year: parseInt(date[2]),
                events: [
                    event
                ]
            }); 
        }
    }    
    return array;
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
    else if((month > 7 && month % 2 == 0) || (month < 7 && month % 2 == 1) || month === 7){
        return 31;
    }
    return 30;    
}

module.exports = {
    insertToArray,
    getFullMonth,
    getEngMonth,
    parseDateToMasehi,
    parseDateToEnglish,
    getLastDate
}