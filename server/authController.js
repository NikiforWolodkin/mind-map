const User = require('./models/User');
const MindMap = require('./models/MM');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secretKey } = require('./config');

const generateAccessToken = (id, email) => {
    const payload = { id, email };
    return jwt.sign(payload, secretKey, {expiresIn: "12h"});
};

class authController {
    async registration(req, res) {
        try {
            if (mongoose.connection.readyState !== 1) {
                res.status(400).json({message: "Database unavailable", type: 0});
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({message: "Incorrect data", type: 0});
            }
            const {email, password} = req.body;
            const candidate = await User.findOne({email});
            if (candidate) {
                return res.status(400).json({message: "Email is already taken", type: 1});
            }
            const hashPassword = bcrypt.hashSync(password, 4);
            const user = new User({email, password: hashPassword, name: email.split("@")[0]});
            await user.save();
            return res.json({message: "Succesfully registered"});
        }
        catch (e) {
            res.status(400).json({message: "Registration error", type: 0});
            console.log(e);
        }
    }

    async login(req, res) {
        try {
            if (mongoose.connection.readyState !== 1) {
                return res.json({message: "Demo log in", token: "Demo"});
            }

            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({message: "Incorrect data", type: 1});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: "Incorrect data", type: 1});
            }
            const token = generateAccessToken(user._id, email);
            return res.json({message: "Successfully logged in", token: token});
        }
        catch (e) {
            res.status(400).json({message: "Login error", type: 0});
            console.log(e);
        }
    }

    async getUser(req, res) {
        try {
            if (mongoose.connection.readyState !== 1) {
                return res.json({message: "Demo fetched", user: {email: "Demo", name: "Демо-режим"}, mindMaps: [{
                    userId: "Demo",
                    name: "Демо-карта",
                    lastAccessTime: new Date(),
                    favorited: false,
                    markedForDeletion: false,
                    tabs: [],
                    lines: [],
                    theme: "gradBlue",
                }]});
            }

            const user = await User.findOne({email: req.user.email});
            if (!user) {
                return res.status(400).json({message: "User not found", type: 1});
            }
            const mindMaps = await MindMap.find({userId: user._id});
            return res.json({message: "Successfully fetched", user: {email: user.email, name: user.name}, mindMaps: mindMaps});
        }
        catch (e) {
            console.log(e);
        }
    }

    async getMindMap(req, res) {
        try {
            if (mongoose.connection.readyState !== 1) {
                return res.json({message: "Demo fetched", mindMap: {
                    userId: "Demo",
                    name: "Демо-карта",
                    lastAccessTime: new Date(),
                    favorited: false,
                    markedForDeletion: false,
                    tabs: [],
                    lines: [],
                    theme: "gradBlue",
                }});
            }

            const mindMap = await MindMap.findOne({_id: req.body._id});
            if (!mindMap) {
                return res.status(400).json({message: "Mind map not found", type: 1});
            }
            mindMap.lastAccessTime = new Date();
            mindMap.save();
            
            return res.json({message: "Successfully fetched", mindMap: mindMap});
        }
        catch (e) {
            console.log(e);
        }
    }

    async addMindMap(req, res) {
        try {
            const user = await User.findOne({email: req.user.email});
            if (!user) {
                return res.status(400).json({message: "User not found", type: 1});
            }
            const mindMap = new MindMap({userId: user._id, favorited: req.body.favorited, lastAccessTime: new Date()});
            await mindMap.save();
            return res.json({message: "Succesfully added"});
        }
        catch (e) {
            console.log(e);
        }
    }

    async changeMindMap(req, res) {
        try {
            const mindMap = await MindMap.findOne({_id: req.body._id});
            if (!mindMap) {
                return res.status(400).json({message: "Mind map not found", type: 1});
            }
            mindMap.favorited = req.body.favorited;
            mindMap.markedForDeletion = req.body.markedForDeletion;
            mindMap.name = req.body.name;
            mindMap.tabs = req.body.tabs;
            mindMap.lines = req.body.lines;
            mindMap.theme = req.body.theme;
            mindMap.markModified('tabs');
            mindMap.markModified('lines');
            await mindMap.save();
            return res.json({message: "Succesfully changed"});
        }
        catch (e) {
            console.log(e);
        }
    }

    async deleteMindMap(req, res) {
        try {
            const mindMap = await MindMap.findOne({_id: req.body._id});
            if (!mindMap) {
                return res.status(400).json({message: "Mind map not found", type: 1});
            }
            await MindMap.deleteOne({_id: req.body._id});
            return res.json({message: "Succesfully deleted"});
        }
        catch (e) {
            console.log(e);
        }
    }
}

module.exports = new authController();