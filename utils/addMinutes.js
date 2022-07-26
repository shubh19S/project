function addMinutes(date, minutes){
    return new Date( date.getTime()+ minutes * 60000)
}
function currentDate(minutes){
    return addMinutes(new Date(),minutes)
}

module.exports = {
    currentDate
}