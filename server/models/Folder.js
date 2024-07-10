import mongoose, { Schema } from "mongoose";


const folderSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    authorId: {
        type: String,
        require: true
    },
    
}, { timestamps: true });

const Folder = mongoose.models.Folder || mongoose.model("Folder", folderSchema);
export default Folder;