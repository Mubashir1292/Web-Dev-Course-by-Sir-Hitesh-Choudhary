import { Notifcation } from "../models/notification.models.js";
class NotificationService {
    static async createNotification({
        content,
        entityId,
        entityType,
        senderId,
        recipientIds
    }) {
        if (!recipientIds || recipientIds.length === 0) return null;
        //! removing duplicate recipients
        const uniqueRecipients = [...new Set(recipientIds.map((id) => id))];
        const recipients = uniqueRecipients.map((Id) => ({
            user : Id,
            read:false
        }));
        const newNotification = await Notifcation.create({
            content,
            entityId,
            entityType,
            sender: senderId,
            recipients
        })
        return newNotification;
    }
    static async MarkAsRead({
        notificationId,
        userId
    }) {
        return await Notifcation.findByIdAndUpdate({
            _id: notificationId,
            'recipients.user': userId
        },
            {
                $set: {
                    'recipients.$.read': true,
                    'recipients.$.readAt': new Date()
                }
            },
            { new: true }
        )
    }
    static async markAllAsRead(userId) {
        return await Notification.updateMany(
            {
                'recipients.user': userId,
                'recipients.read': false
            },
            {
                $set: {
                    'recipients.$[elem].read': true,
                    'recipients.$[elem].readAt': new Date()
                }
            },
            {
                arrayFilters: [{ 'elem.user': userId }],
                multi: true
            }
        );
    }
    static async getUnreadCount(userId) {
        const result = await Notification.aggregate([
            {
                $match: {
                    'recipients.user': userId,
                    'recipients.read': false
                }
            },
            {
                $unwind: '$recipients'
            },
            {
                $match: {
                    'recipients.user': userId,
                    'recipients.read': false
                }
            },
            {
                $count: 'unreadCount'
            }
        ]);
        return result[0]?.unreadCount || 0;
    }
}

export {NotificationService};