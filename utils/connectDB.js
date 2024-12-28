const mongoose = require('mongoose');
const uri = "mongodb://localhost:27017";
const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    } 
}

export default connectDB;