import jwt from 'jsonwebtoken';

// Middleware to authenticate the JWT token
export const authMiddleware = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

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
