

const NotificationGet = require('../../api/models/notification');
import httpStatus = require('http-status');
import { Notifications, User } from '../../api/models';

// Get all notifications
exports.getAllNotifications =async  (req:any, res:any) => {
   try{
    let notif:any
    if(req.route.meta.user.role == "user"){
        notif = await Notifications.find({receiversUser:req.route.meta.user._id}).populate('idOwnerUniv idOwnerUser receiversUser receiversUniv')
    }else if(req.route.meta.user.role == "responsable"){
        notif = await Notifications.find({receiversUniv:req.route.meta.user._id}).populate('idOwnerUniv idOwnerUser receiversUser receiversUniv')

    }
    res.status(httpStatus.CREATED);
    return res.json(notif);
notif
   }catch(err){
    console.log(err);
    
   } 
   
};

// Get a specific notification by ID
exports.getNotificationById = (req:any, res:any) => {
  NotificationGet.findById(req.jwt.id)
    .then((notification:any) => {
        res.status(httpStatus.CREATED);
        return res.json(notification.transform());
    })
    .catch((err:any) => res.status(400).json(`Error: ${err}`));
};

// Create a new notification
exports.createNotification = async(req:any, res:any) => {
    
    const newNotification = new NotificationGet(req.body);
    console.log(newNotification);

    let data= await newNotification.save()
    console.log(data);
    
    if(!data)
        throw new Error('failed to create notif')

    let updated= User.findByIdAndUpdate(req.body.receivers, {$push:{notifications:data._id}}, { new: true })
    if(!updated)
        throw new Error('failed to add it to notif user')
    
    return res.status(200).json(data);
};

// Update an existing notification by ID
exports.updateNotificationById = (req:any, res:any) => {
  NotificationGet.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((notification:any) => res.json(notification))
    .catch((err:any) => res.status(400).json(`Error: ${err}`));
};

// Delete a notification by ID
exports.deleteNotificationById = (req:any, res:any) => {
  NotificationGet.findByIdAndDelete(req.params.id)
    .then(() => res.json('Notification deleted.'))
    .catch((err:any) => res.status(400).json(`Error: ${err}`));
};