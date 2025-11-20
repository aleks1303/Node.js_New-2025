import express from "express";
import * as mongoose from "mongoose";
import {config} from "./configs/config";
import {apiRouter} from "./routers/api.router";


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/', apiRouter);

const port = config.PORT;
const mongoDb = config.MONGO_URI;
const dbConnection = async () => {
    let dbCon = false;

    while (!dbCon) {
        try{
            console.log("Connection to DB...");

            await mongoose.connect(mongoDb)
            dbCon = true;
            console.log('Database available!!!')
        }catch (e){
            console.log("Database unavailable, wait 3 seconds")
            await new Promise(resolve => setTimeout(resolve, 3000))
        }
    }
}

const start = async () => {
    try {
        await dbConnection()
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`)
        })
    }catch (e){
        console.log(e.message)
    }
}
start();