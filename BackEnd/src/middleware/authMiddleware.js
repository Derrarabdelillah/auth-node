import jwt from "jsonwebtoken";

export const requireAuth = async (req, res, next) => {
    // Verify authentication
    const token = req.cookies.jwt;
    // If there is a token here, we will verify it and the user will be logged in
    if ( token ) {
        jwt.verify(token, "Abdelilah_Developer_Secret_Key", (err, decodedToken) => {
            // if there is an error, we will redirect the user to the login page.
            if ( err ) {
                console.log(err.message);
                res.redirect('/api/auth/login');
            } // if there is no error, we will allow the user to proceed 
            else {
                console.log(decodedToken);
                next();
            }
        } )
    } // if there is no token, we will redirect the user to the login page
    else {
        res.redirect('/api/auth/login')
    }
}