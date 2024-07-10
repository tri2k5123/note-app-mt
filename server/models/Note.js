import mongoose, { Schema } from "mongoose";


const noteSchema = new Schema({
    content: {
        type: String,
        default: ""
    },
    folderId: {
        type: String,
        require: true
    },
    
}, { timestamps: true });

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);
export default Note;