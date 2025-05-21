import bcrypt from "bcryptjs";

const users = [
    {
        firstName: "admin",
        familyName: "admin",
        email: "admin@email.com",
        password: bcrypt.hashSync("1234", 10),
        isAdmin: "true",
    },
    {
        firstName: "John",
        familyName: "Doe",
        email: "john@email.com",
        password: bcrypt.hashSync("1234", 10),
        isAdmin: "false",
    },
    {
        firstName: "Jane",
        familyName: "Doe",
        email: "jane@email.com",
        password: bcrypt.hashSync("1234", 10),
        isAdmin: "false",
    },
];


export default users