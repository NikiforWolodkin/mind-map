const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRouter = require('./authRouter');

app.use(express.json());
app.use("/api/auth", authRouter);

const startServer = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/mindmap");
        app.listen(5000, () => {console.log("Server started on port 5000")});
    }
    catch (e) {
        console.log(e);
    }
};

startServer();