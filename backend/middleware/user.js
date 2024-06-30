import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();


async function userAuthMiddleware(req, res, next) {

    const token = req.headers.authorization;
    const tokenWords = token.split(" ");

    const jwtToken = tokenWords[1];

    // Bearer xyz......

    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    const decodedValue = jwt.verify(jwtToken, jwtSecretKey)

    // if you want to include the type of the user then use
    /*
    if(decodedValue.username && decodedValue.type === 'user'){
    next()
    }
    */
    if (decodedValue.username) {
        //* This passes the username value in req object in subsequent requests

        req.username = decodedValue.username;
        req.randomData = "Mera Data Passed by middleware";
        next()
    }
    else {
        return res.status(403).json({ msg: "You are not authenticated" })
    }

}




export default userAuthMiddleware;