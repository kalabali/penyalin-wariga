function getFullMonth(index){
    index = parseInt(index);    
    const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "Nopember",
        "Desember"
    ];
    return months[index - 1];
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

module.exports = {
    insertToArray,
    getFullMonth
}