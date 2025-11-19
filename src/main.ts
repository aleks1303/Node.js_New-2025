import express, {Request, Response} from "express";
import * as mongoose from "mongoose";
import {userService} from "./services/user.service";
import {IUserDTO} from "./interfaces/user.interface";
import {config} from "./configs/config";


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.get("/users", async (req: Request, res: Response) => {
   const data = await userService.getAll()
    res.json(data)
})
app.post("/users", async (req: Request, res: Response) => {
    const user = req.body as IUserDTO
    const data = await userService.create(user);
    res.json(data)
})
app.get("/users/:id", async (req: Request, res: Response) => {
    const {id} = req.params;
    const data = await userService.getById(id)
    res.json(data)
})

const dbConnection = async () => {
    let dbCon = false;

    while (!dbCon) {
        try{
            console.log("Connection to DB...");
            console.log("Mongo URI:", config.MONGO_URI);
            await mongoose.connect(config.MONGO_URI)
            dbCon = true;
            console.log('Database available!!!')
        }catch (e){
            console.log("Database unavailable, wait 3 seconds")
            await new Promise(resolve => setTimeout(resolve, 3000))
        }
    }
}
const port = config.PORT
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