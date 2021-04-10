const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    addReaction,
    updateThought,
    deleteThought,
    removeReaction
} = require('../../controllers/thought-controller')

// GET to get all thoughts
// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field). Line 46 on thought-controller
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

// GET to get a single thought by its _id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

router
    .route('/:thoughtId/reactions')
    .post(addReaction)

router
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction)

module.exports = router;