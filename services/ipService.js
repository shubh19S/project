const fetch = require('node-fetch')
const IP_TO_LOCATION_URL = 'http://ip-api.com/json/'

/**
* This function uses @see http://ip-api.com/json/ api  convert ip address to lat , long.
* @return this function returns @see https://datatracker.ietf.org/doc/html/rfc7946 geoJson type.
* In case ip to location give an error or not lat long for that particular api
* in that case function return null.
* */
async function ipToLocation(ipAddress) {
  try {

    const response = await fetch(IP_TO_LOCATION_URL + ipAddress)
    const result = await response.json()

    if(!result.lon || !result.lat){
      return null
    }

    return  {
      type: 'Point',
      coordinates: [result.lon, result.lat], // GeoJson format: [lng, lat]
    }
  }
catch(err){
 return null
}
}
module.exports = {
  ipToLocation
}
