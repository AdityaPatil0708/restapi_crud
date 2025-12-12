import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js"

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", userRoute)

// db connection 
mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("MongoDB connected successfully"))
    .catch(err=> console.log(err));

//port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});