const { Schema, model } = require('mongoose');

const MindMap = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, default: "Интеллект-карта" },
    lastAccessTime: { type: Date, default: new Date() },
    favorited: { type: Boolean, default: false },
    markedForDeletion: { type: Boolean, default: false },
});

module.exports = model("MindMap", MindMap);