const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const url = `mongodb://imdbsd:denpasar220395@ds211592.mlab.com:11592/kalender-bali`;
const mongoOptions = {
    useNewUrlParser: true
};

const state = {
    db: null
};

const connect = callback => {
    if(state.db){
        callback();
    }
    else{
        MongoClient.connect(url, mongoOptions, (err, client) => {
            if(err){
                callback(err);
            }
            else{
                state.db = client;                
                callback();
            }
        });
    }
}

const disconnect = () => {
    if(state.db){
        state.db.close();
        console.log('connection close');        
    }
    else{
        console.log('no connection exist');        
    }
}

const getDb = () => {
    return state.db;
}

module.exports = {
    getDb,
    connect,
    disconnect,
    ObjectId
}