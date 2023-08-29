const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
// when there are more than one function which we need to use in a file
const {registervalidation,loginValidation} = require('../validation');




router.get('/home',(req,res)=>{
    res.render('home.ejs')
});
router.get('/login',(req,res)=>{
    res.render('login.ejs')
});
router.get('/register',(req,res)=>{
    res.render('register.ejs')
})
// For registration 
router.post('/register',async (req,res)=>{
    // Validation check
    // We use hapi/joi library for validating
        const {error} = registervalidation(req.body);
        if(error) {
            return res.status(404).send(error);
        }

    // check if user exist or not in database
    const emailpresent = await User.findOne({email: req.body.email});
    if(emailpresent){
    return res.status(400).send("this is email exist");
    }
    // Hash the password
    // here 10 means routes
      const salt  = await bcrypt.genSalt(10);
      const hashedPassword  = await bcrypt.hash(req.body.password, salt);
    // create a user
    const newUser = new User({
        username : req.body.username,
        email:     req.body.email,
        password:  hashedPassword
    })
    // Save to the db
    // error occuring
    try{
    const userData = await newUser.save();
     res.status(201).redirect('/login')
    }
    catch(err){
        res.status(400).send(err)
    }
})
// Login process
router.post('/login', async(req, res)=> {
    //validation of data
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error);

   //  checking if email exists or not
   const user = await User.findOne({email : req.body.email });
   if(!user) return res.status(400).render('register.ejs');
//    or
// res.status(400).redirect('/register)

   // password matching
   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if(!validPassword) return res.status(500).send("Invalid credentials");


   res.status(200).send("Profile Page");
})

module.exports = router;



// Assesment Rest API with postman

//1. create a user account
//2. Fetch all the products and services(name,price)
//3. add a product or service in the cart
// remove product or service from cart
// clear the cart
// example of cart
// cart{
//     type: Array,
//     required:true
// }