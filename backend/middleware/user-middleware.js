const fetchUser = async (req, res, next) => {
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


App.post('/addtocart',fetchUser,async(req,res)=>{
    console.log(req.body, req.user)

    let userData = await Users.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id: req.user.id},{cartData: userData.cartData});
    res.send({message: 'Item added to cart'});
})

//creating endpoint to remove product from cartdata