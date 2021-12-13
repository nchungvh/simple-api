import mongoose from 'mongoose';

export class MongooseService {
    private static instance: MongooseService;

    options = {
        autoIndex: false,
        poolSize: 10,
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    };
    count = 0;

    constructor() {
        this.connectWithRetry();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new MongooseService();
        }
        return this.instance;
    }

    connectWithRetry() {
        console.log('MongoDB connection with retry');
        mongoose.connect("mongodb://localhost/api-db", this.options).then(() => {
            console.log('MongoDB is connected')
        }).catch(err => {
            console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++this.count);
            setTimeout(this.connectWithRetry, 5000)
        })
    };

}