import mongoose from 'mongoose';
import { config } from '../config/config';


export class MongoDb {

    constructor() { };

    public init() {
        mongoose.connect(config.server.mongoDB, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }).catch(err => { console.log('Erro ao conectar no banco de dados.') });
        mongoose.set('useCreateIndex', true);

        mongoose.connection.on('connected', () => {
            var conn: any = mongoose.connections[0]
            console.log(`Mongoose default connection open to: ${conn.host}:${conn.port} --> ${conn.name}`);
        });

        mongoose.connection.on('error', (err: any) => {
            console.log('Mongoose default connection error: ' + err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose default connection disconnected');
        });

        process.on('SIGINT', () => {
            this.clearCache()
            mongoose.connection.close(function () {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(1);
            });
        });

    };

    public clearCache() {
        mongoose.connections.forEach((connection: any) => {
            const modelNames = Object.keys(connection.models)

            modelNames.forEach(modelName => { delete connection.models[modelName] });

            const collectionNames = Object.keys(connection.collections);

            collectionNames.forEach(collectionName => { delete connection.collections[collectionName] });
        });

        if (global.gc) { global.gc() }

        console.log('Cache released');
    };

    public getCollection(collectionName: string): mongoose.Collection { return mongoose.connection.collection(collectionName); };
};

export const mongoDB = new MongoDb();