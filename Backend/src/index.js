import express from "express";
import dotenv from "dotenv";
import {authRouter} from "../router/authRout.js"
import cors from "cors"
import {connectDB} from "../config/mongoBD.js";
import cookieParser from "cookie-parser";
import { userRouter } from "../router/userRouter.js";
import { productRouth } from "../router/productRout.js";
import { emailRouter } from "../router/emailRouter.js";
import { cartRouter } from "../router/cratRout.js";
dotenv.config();

const app=express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}))

//here
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
app.use("/product",productRouth);
app.use("/email",emailRouter);
app.use("/cart",cartRouter);

