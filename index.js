require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ CORS (Frontend URL yahan lazmi dalen jab deploy ho jaye)
app.use(cors({
  origin:"https://auth-app-miss-maria-frontend.vercel.app",methods:["GET,"POST","PUT","DELETE"],credentials:true}));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Routes
app.use("/api/auth", require("../routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("API Running...");
});

// ✅ Vercel ke liye Serverless Export (Aham!)
if (process.env.NODE_ENV !== 'production') {
    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });
}

module.exports = app; // Ye line Vercel ke liye zaroori hai
