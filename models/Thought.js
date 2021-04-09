const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
const ReactionSchema = new Schema(
    {
      
      reactionId: {

        // Use Mongoose's ObjectId data type
        type: Schema.Types.ObjectId,
        // Default value is set to a new ObjectId
        default: () => new Types.ObjectId()

      },
      reactionBody: {
        type: String,
        required: true,
        trim: true,
        maxlength: 280
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,

        // Set default value to the current timestamp
        default: Date.now,

        // Use a getter method to format the timestamp on query
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      }
    },
    {
      toJSON: {
        getters: true
      }
    }
  );

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,

            // Must be between 1 and 280 characters
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,

            // Set default value to the current timestamp
            default: Date.now,

            // Use a getter method to format the timestamp on query
            get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true,
        },
        // Array of nested documents created with the reactionSchema
        reactions: [ReactionSchema],
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
  }
)

const Thought = model('Thought', ThoughtSchema);

// Retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual('reactionCount').get(function() {
return this.reactions.length;
});


module.exports = Thought;