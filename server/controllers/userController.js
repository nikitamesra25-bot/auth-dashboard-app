const User = require("../models/User");

const getUserProfile = async (req, res) => {
    try {
        res.status(200).json({
            message: "User profile fetched successfully",
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                createdAt: req.user.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateUserProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        req.user.name = name.trim();
        req.user.email = email.trim().toLowerCase();

        const updatedUser = await req.user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                createdAt: updatedUser.createdAt
            }
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                message: "This email is already registered"
            });
        }

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile
};
