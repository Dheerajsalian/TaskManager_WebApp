const mongoose = require("mongoose");
const User = require("../models/User"); 

const bcrypt = require("bcryptjs");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    
    const existingUser = await User.findOne({
      email: "dheerajsalian4@gmail.com",
    });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("DefaultPassword123", 10);
      const user = new User({
        name: "Dheeraj Salian",
        email: "dheerajsalian4@gmail.com",
        password: hashedPassword,
      });

      await user.save();
      console.log("User created: dheerajsalian4@gmail.com");
    } 
else {
      console.log("User already exists");
    }
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
