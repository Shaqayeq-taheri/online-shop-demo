import mongoose from "mongoose";

const connetDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo DB connected 😊 ${conn.connection.host}`);
    } catch (error) {
        console.log(
            `An Error Accured while connecting to Database: 😢 ${error.message}`
        );
        process.exit(1); //for exiting the process
    }
};

export default connetDB;
