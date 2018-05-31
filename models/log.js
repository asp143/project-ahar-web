const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogsSchema = mongoose.Schema({
  
})

const Log = module.exports = mongoose.model('Log', LogsSchema);

module.exports.getByUsername = function(username,callback){
    var query = {
        to:username
    };
    Log.find(query,callback);
};
module.exports.getByaccidentID = function(accidentID,callback){
    var query = {
        to:accidentID
    };
    Log.find(query,callback);
};
module.exports.getAllLocations = function(callback){
    //aggregate
    var query = [
                {$group:{_id:{location:"$location"},total:{$sum:1}}},
                {$sort:{total:-1}}
    ]

    Log.aggregate(query,callback);
}
