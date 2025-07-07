import mongoose from "mongoose";
const NotificationSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    entityId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    entityType: {
        type: String,
        required: true,
        enum: ['video', 'comment', 'like', 'dislike'],
        lowercase: true
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    recipients: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                requried: true,
                ref: 'user'
            },
            read: {
                type: Boolean,
                default: false,
            },
            readAt: {
                type: Date
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true
    });
NotificationSchema.index({
    'recipients.user': 1,
    createdAt: -1,
});
NotificationSchema.index({
    entityId: 1,
    entityType: 1
})
export const Notifcation = mongoose.model("Notification", NotificationSchema);