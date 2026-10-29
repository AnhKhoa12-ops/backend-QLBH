import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        unique: true
    },
    store_id: {
        type: Number,
        required: true
    },
    role_id: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100
    },
    password: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true,
        maxlength: 100
    }
});

const User = mongoose.model("User", userSchema);
export default User;