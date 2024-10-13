const mongoose = require('mongoose');

const connectToDatabase = (databaseURI) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.DATABASE_URI)
            .then(() => {
                console.log('[Eldar Backend] Base de datos conectada con éxito');
                resolve();
            })
            .catch((error) => {
                console.error('[Eldar Backend] Error al conectar a la base de datos:', error);
                reject(error);
            });
    });
};

module.exports = {
    connectToDatabase
}