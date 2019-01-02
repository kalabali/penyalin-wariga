require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const url = process.env.MONGODB_URL;
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