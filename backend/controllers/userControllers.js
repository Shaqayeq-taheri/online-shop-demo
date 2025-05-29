import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateJwtToken } from "../helpers/jwt.js";

// @desc user signin
// @route  POST api/users/signin
// @access  public
export const signinUser = async (req, res) => {

    const { email, password } = req.body;
    
    if (!email || !password) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "Please provide email and password" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "The email or password is not correct" });
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: "The email or password is not correct" });
        }

        generateJwtToken(user, res);

/* 
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        //set jwt as an http-only cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development", //it means that in development it sends the cookies only to https
            sameSite: "strict",
            maxAge: 1 * 24 * 60 * 60 * 1000, //1 day
        });
 */

        return res
            .status(StatusCodes.OK)
            .json({ user, message: "The user logged in successfully" });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Internal Server Error Happened" });
    }
};

// @desc user signup
// @route  POST api/users/signup
// @access  public
export const signupUser = async (req, res) => {
    const { firstName, familyName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            firstName,
            familyName,
            email,
            password: hashedPassword,
        });

        return res
            .status(StatusCodes.CREATED)
            .json({ message: "The user is created successfully!" });
    } catch (error) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "An error occured while creating the user" });
    }
};

// @desc user signout //clearing the cookie because json webtoken stored in httponly cookie on the server
// @route  POST api/users/signout
// @access  private(the user need to be logged in)
export const signoutUser = async (req, res) => {
    res.send("sigout user");
};

// @desc user profile
// @route  GET api/users/userProfile
// @access  private
export const getUserProfile = async (req, res) => {
    res.send("the user profile");
};

// @desc userprofile update
// @route  PUT api/users/userProfileUpdate    //you don't need :id because the server already knows who the user is using JWT
// @access  private
export const updateUserProfile = async (req, res) => {
    res.send("update the user profile");
};

// @desc Get all users
// @route  Get api/users/allUsers
// @access  private(admin)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (users) {
            res.status(StatusCodes.OK).json("this is the list of users", users);
        } else {
            res.status(StatusCodes.NOT_FOUND).json("there is no user on DB");
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

// @desc Get a user by id
// @route  Get api/users/:id
// @access  private(admin)
export const getUserById = async (req, res) => {
    res.send("get the user by id");
};

// @desc update a user by id
// @route  PUT api/users/:id
// @access  private(admin)

export const updateUser = async (req, res) => {
    res.send("update a user");
};

// @desc delete user
// @route  DELETE api/users/:id
// @access  private(admin)
export const deleteUser = async (req, res) => {
    res.send("delete the user");
};
