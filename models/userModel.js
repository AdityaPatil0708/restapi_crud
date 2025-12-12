import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: {type:String, required:true},
    password: { type: String, required: true },
    isLoggedin: { type: Boolean, default: false },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user",
    }
    
}, {timestamps: true})

export default mongoose.model("User", userSchema)