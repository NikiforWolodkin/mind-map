const { Schema, model } = require('mongoose');

const MindMap = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    lastAccessTime: Date,
    favorited: Boolean,
    markedForDeletion: Boolean,
});

module.exports = model("MindMap", MindMap);