function addMinutes(date, minutes){
    return new Date( date.getTime()+ minutes * 60000)
}
function currentDate(minutes){
    return addMinutes(new Date(),minutes)
}
function subMinutes(date,minutes){
    return new Date(date.getTime()-minutes*60000)
}
function previousDate(minutes){
    return subMinutes(new Date(),minutes)
}

module.exports = {
    currentDate,
    previousDate
}   