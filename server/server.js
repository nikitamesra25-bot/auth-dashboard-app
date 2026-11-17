const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config({ path: "./server/.env" });

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Authentication Dashboard API is running!");
});

const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server failed:", error.message);
        process.exit(1);
    }
};

startServer();
