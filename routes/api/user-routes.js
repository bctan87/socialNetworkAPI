const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    addFriend,
    updateUser,
    deleteUser,
    removeFriend
} = require('../../controllers/user-controller');

// GET all users
// POST a new user:
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// GET a single user by its _id and populated thought and friend data. Line 25 on user-controller
// PUT to update a user by its _id
// DELETE to remove user by its _id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// POST to add a new friend to a user's friend list
// DELETE to remove a friend from a user's friend list
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;