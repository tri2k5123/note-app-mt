import mongoose, { Schema } from "mongoose";


const authorSchema = new Schema({
    uid: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    
}, { timestamps: true });

const Author = mongoose.models.Author || mongoose.model("Author", authorSchema);
export default Author;