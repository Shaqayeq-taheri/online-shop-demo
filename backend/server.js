import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const port = process.env.PORT || 5000;

connectDB(); //connect to DB

const app = express();

app.use(cors());

//body parser middleware in order to access to the body of req object
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Api is running.. ");
}) 



app.use("/api/products", productRoutes);
app.use('/api/users',userRoutes)



app.listen(port, () => console.log(`the server is running on port ${port} 👍`));
