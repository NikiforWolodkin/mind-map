const User = require('./models/User');

class authController {
    async registration(req, res) {
        try {
            const {email, password} = req.body;
            const candidate = await User.findOne({email});
            if (candidate) {
                return res.status(400).json({message: "Email is already taken"});
            }
            const user = new User({email, password});
            await user.save();
            return res.json({message: "Succesfully registered"});
        }
        catch (e) {
            res.status(400).json({message: "Registration error"});
            console.log(e);
        }
    }

    async login(req, res) {
        try {
            
        }
        catch (e) {
            res.status(400).json({message: "Login error"});
            console.log(e);
        }
    }

    async getUsers(req, res) {
        try {
            res.json("Nick");
        }
        catch (e) {
            console.log(e);
        }
    }
}

module.exports = new authController();