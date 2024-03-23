const GCAM_API_STATE = {
    Developers  : 0,
    Gcam : 1,
    PhoneData : 2,
    GcamVersions : 3,
    Generic : 4,
    GcamVersionData : 5

}
const CRICKET_API_STATE = {
    players : 0,
    teamDetails : 1,
    playerStats : 2,
    teamStats : 3,
}
const MONGO = {
    findOne : process.env.HOST + '/api/find',
    findAll : process.env.HOST + '/api/finda'
}
export {GCAM_API_STATE , CRICKET_API_STATE , MONGO}