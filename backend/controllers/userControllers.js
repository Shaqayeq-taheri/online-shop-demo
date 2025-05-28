import User from '../models/userModel.js'
import { StatusCodes } from 'http-status-codes'

// @desc user signin
// @route  POST api/users/signin
// @access  public
export const signinUser = async(req,res)=>{
    res.send('signin user')
}


// @desc user signup
// @route  POST api/users/signup
// @access  public
export const signupUser = async(req,res)=>{
    res.send('signup user')
}

// @desc user signout //clearing the cookie because json webtoken stored in httponly cookie on the server
// @route  POST api/users/signout
// @access  private(the user need to be logged in)
export const signoutUser= async(req,res)=>{
    res.send('sigout user')
}


// @desc user profile
// @route  GET api/users/userProfile
// @access  private
export const getUserProfile = async(req,res)=>{
    res.send('the user profile')
}

// @desc userprofile update
// @route  PUT api/users/userProfileUpdate    //you don't need :id because the server already knows who the user is using JWT
// @access  private
export const updateUserProfile = async(req,res)=>{
    res.send('update the user profile')
}


// @desc Get all users 
// @route  Get api/users/allUsers
// @access  private(admin)
export const getAllUsers = async(req,res)=>{
    try {
        
        const users = await User.find({})
        if(users){
            res.status(StatusCodes.OK).json('this is the list of users', users)
        }
        else{
            res.status(StatusCodes.NOT_FOUND).json('there is no user on DB')
        }
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
        
    }
}

// @desc Get a user by id 
// @route  Get api/users/:id
// @access  private(admin)
export const getUserById = async (req,res)=>{
    res.send("get the user by id");
}

// @desc update a user by id 
// @route  PUT api/users/:id
// @access  private(admin)

export const updateUser = async (req, res)=>{

    res.send("update a user");
}


// @desc delete user 
// @route  DELETE api/users/:id
// @access  private(admin)
export const deleteUser = async(req,res)=>{
    res.send('delete the user')
}