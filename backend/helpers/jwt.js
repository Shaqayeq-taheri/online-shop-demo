import jwt from "jsonwebtoken";

//when you want the first sign up/ sign in you need to the jwt token be generated

 const generateJwtToken = (user, res) => {

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return token; 
};


export { generateJwtToken };