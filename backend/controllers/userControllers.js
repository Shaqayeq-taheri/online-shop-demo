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

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        //set jwt as an http-only cookie
        res.cookie("jwt", token, {
            httpOnly: true, //since it is true it means that The client browser stores jwt automatically as a cookie
            secure: process.env.NODE_ENV !== "development", //it means that in development it sends the cookies only to https
            sameSite: "strict",
            maxAge: 1 * 24 * 60 * 60 * 1000, //1 day
        });

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

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: "This user is already existed" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({
            firstName,
            familyName,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        //set jwt as an http-only cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 1 * 24 * 60 * 60 * 1000,
        });

        return res.status(StatusCodes.CREATED).json({
            message: "The user is created and signed in successfully!",
            user: {
                _id: user._id,
                firstName: user.firstName,
                familyName: user.familyName,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "An error occured while creating the user" });
    }
};

// @desc user signout //clearing the cookie because json webtoken stored in httponly cookie on the server
// @route  POST api/users/signout
// @access  private(the user need to be logged in)
export const signoutUser = async (req, res) => {
    //clear the cookie
    res.cookie("jwt", "", {
        httpOnly: "true",
        expiresIn: new Date(0),
    });
    return res
        .status(StatusCodes.OK)
        .json({ message: "User signed out successfully" });
};

// @desc user profile
// @route  GET api/users/userProfile
// @access  private
export const getUserProfile = async (req, res) => {
    //since the user is signed in , we have access to the req.user._id

    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (user) {
            //it means that if the user found with this id(in token) can have access to it's details
            return res.status(StatusCodes.OK).json({
                user: {
                    _id: user._id,
                    firstName: user.firstName,
                    familyName: user.familyName,
                    email: user.email,
                    isAdmin: user.isAdmin,
                },
            });
        } else {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({ message: "User not found" });
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong while fetching user profile",
        });
    }
};

// @desc userprofile update
// @route  PUT api/users/userProfileUpdate    //you don't need :id because the server already knows who the user is using JWT
// @access  private
export const updateUserProfile = async (req, res) => {
    try {

    
       const userUpdates ={
            firstName : req.body.firstName,
            familyName: req.body.familyName,
            email: req.body.email

        }
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            userUpdates.password = hashedPassword;
        }

        const user = await User.findByIdAndUpdate(req.user._id, userUpdates,{new:true});

        if (user) {
            return res.status(StatusCodes.OK).json({
                message: "Profile updated successfully",
                user: {
                    _id: user._id,
                    firstName: user.firstName,
                    familyName: user.familyName,
                    email: user.email,
                    isAdmin: user.isAdmin,
                },
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong while updating profile",
        });
    }
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
