export const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({errors: 'Access Denied'});
    }
    else{
        try {
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
            //next we have to add it to addtocart route middleware

        } catch (error) {
            res.status(401).send({errors: 'Invalid Token'});
        }
    }
}

export default fetchUser;
