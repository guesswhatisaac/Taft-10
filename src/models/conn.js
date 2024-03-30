const mongoose = require('mongoose');

const MONGO_URI = "mongodb://localhost:27017";
const DBNAME = "TAFT10";

function connectToDB (dbName = DBNAME) {
    return mongoose.connect(MONGO_URI, {dbName: dbName});
}

function disconnect(){
    console.log('Disconnecting from Mongodb...');
    mongoose.disconnect();
}

function signalHandler() {
    disconnect();
    process.exit();
}

process.on('SIGINT', signalHandler);
process.on('SIGQUIT', signalHandler);
process.on('SIGTERM', signalHandler);
process.on('SIGKILL', signalHandler);

process.on('SIG', signalHandler);

module.exports = {
    connect: connectToDB,
    disconnect: disconnect
};
