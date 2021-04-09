// Model
const { User } = require('../models')

const userController = {
    //Get all users
    getAllUsers(req,res) {
        User.find({})
        .populate({
            path: 'thoughts',

            //    tell Mongoose not to return the "__v" field
            select: '-__v'
         })

        //    tell Mongoose not to return the "__v" field 
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
      },
    
    //Get User by ID with thoughts
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
           .populate({
               path: 'thoughts',

               //    tell Mongoose not to return the "__v" field
               select: '-__v'
            })
            .populate ({
                path: 'friends',

                //    tell Mongoose not to return the "__v" field
                select: '-__v'
            })
           
           //    tell Mongoose not to return the "__v" field 
           .select('-__v')
           .then(dbUserData => res.json(dbUserData))
           .catch(err => {
               console.log(err)
               res.status(500).json(err)
        });
     },

     //Create new User
     createUser({ body }, res) {
         User.create(body)
         .then(dbUserData => res.json(dbUserData))
         .catch(err => res.status(400).json(err));
     },

     //Add a friend
     addFriend({ params }, res) {
         User.findOneAndUpdate(
             {_id: params.userId},
             { $push: { friends: params.friendId } },
             { new: true, runValidators: true}
         )
         .then(dbUserData => {
             if (!dbUserData) {
                 res.status(404).json({ message: 'Invalid User ID' });
                 return;
             }
             res.json(dbUserData);
         })
         .catch(err => res.json(err));
     },

     //Update User
     updateUser({ params, body}, res) {
         User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true})
         .then(dbUserData => {
             if (!dbUserData) {
                 res.status(404).json({ message: 'Invalid User ID' });
                 return;
             }
             res.json(dbUserData);
         })
            .catch(err => res.json(err))
     },

     //Delete User
     deleteUser({ params }, res) {
         User.findOneAndDelete({ _id: params.id })
         .then(dbUserData => {
         if (!dbUserData) {
             res.status(404).json({ message: 'Invalid User ID' });
             return;
         }
         res.json(dbUserData);
         })
         .catch(err => res.status(400).json(err))
     },

     //Unfriend
     removeFriend( { params }, res) {
         User.findOneAndUpdate(
             { _id: params.userId },
             { $pull: { friends: params.friendId }},
             { new: true}
         )
         .then(dbUserData => res.json(dbUserData))
         .catch(err => res.json(err));
     }
     
};

module.exports = userController