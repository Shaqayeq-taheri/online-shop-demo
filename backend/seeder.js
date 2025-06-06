import mongoose from "mongoose";
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from "./models/productModel.js";
import Order from './models/orderModel.js'
import connectDB from './config/db.js'


dotenv.config()

connectDB()


const importData = async ()=>{
    try {
        await Order.deleteMany()
        await Product.deleteMany();
        await User.deleteMany();

        const createUser = await User.insertMany(users)

        const adminUser =  createUser[0]._id


        /* Creates a new object with all the original product properties (...product spread operator)
        Adds a new user field containing the adminUser's ID (_id) */
        const sampleProducts = products.map((product)=>{
            return { ...product, user: adminUser };
        })

        await Product.insertMany(sampleProducts)

        console.log('the data imported!'.green.inverse)  //the color package

    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
        
    }
}


const destroyData = async ()=>{
try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('data destroyed'.red.inverse)
    process.exit()
} catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
}
}

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}