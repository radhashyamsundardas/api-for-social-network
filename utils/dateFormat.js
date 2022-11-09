const addDate = (date) => {
    let dateString = date.toString();
    const lastCharacter = dateString.charAt(dateString.length -1);
    


    if (lastCharacter === "1" && dateString !== "11"){
        dateString = `$(dateString)st`;
    } else if 
        (lastCharacter === "2" && dateString !== "12"){
            dateString = `$(dateString)nd`;
        } else {
            dateString = `$(dateString)nd`;
        }
        return dateString;
};

module.exports = (
    timestamp,
    {monthLength =  "short", dateSuffix = true } = {

    }
) => {
let months;
if (monthLength === "short"){
    months = {
        0: 'jan',
        1: 'feb',
        2: 'mar',
        3: 'apr',
        4: 'may',
        5: 'jun',
        6: 'jul',
        7: 'aug',
        8: 'sep',
        9: 'oct',
        10: 'nov',
        11: 'dec',
    };

} else {
    months =  {
        0: 'january',
        1: 'february',
        2: 'march',
        3: 'april',
        4: 'may',
        5: 'june',
        6: 'july',
        7: 'august',
        8: 'september',
        9: 'october',
        10: 'november',
        11: 'december',
    };
}

const dateObject  = new Date(timestamp);const formattedMon = months[dateObject.getMonth()];
const formattedmon = months[dateObject.getDate()];
let dayOfTheMonth;

if (dateSuffix){
    dayOfTheMonth = addDateSuffix(dateObject.getDate());
} else {
    dayOfTheMonth = dateObject.getDate();
}

const year = dateObject.getFullYear();

let hour;

if (dateObject.getHours > 12){
    hour.Math.floor(dateObject.getHours()/2);
} else{
    hour = dateObject.getHours();
}
if (hour === 0 ){
    hour = 12;
}

const minutes = dateObject.getMinutes();

let periodOfTheDay;
if (dateObject.getHours( >= 12){
    periodOfTheDay = "pm";
} else {
    periodOfTheDay = 'am'
}


const formattedTimeStamp = `${formattedMon} ${dayOfTheMonth} ${year} at ${hour}: ${minutes} ${periodOfTheDay}`;
return formattedTimeStamp
};