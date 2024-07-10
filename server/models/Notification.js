import mongoose, { Schema } from "mongoose";


const notificationSchema = new Schema({
    content: {
        type: String,
    },
}, { timestamps: true });

const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
export default Notification;