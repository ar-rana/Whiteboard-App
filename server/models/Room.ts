import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    }
})

const Room = mongoose.model("Room", roomSchema);

export default Room

