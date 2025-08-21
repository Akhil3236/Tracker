import express from "express";
import dotenv from "dotenv";
import {authRouter} from "../router/authRout.js"
import cors from "cors"
import {connectDB} from "../config/mongoBD.js";
import cookieParser from "cookie-parser";
import { userRouter } from "../router/userRouter.js";

dotenv.config();

const app=express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:"*",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))

const PORT=process.env.PORT || 4000;

app.get("/",(req,res)=>{
    
    res.status(200).json({ message: 'ok' });
})


connectDB()
.then(() => app.listen(PORT, () => console.log(`Server on ${PORT}`)))
.catch((err) => {
console.error('Startup aborted due to DB error: ', err);
process.exit(1);
});

app.use("/auth",authRouter);
app.use("/user",userRouter);


