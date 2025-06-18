const User = require('../model/user.model');


const home =  (req, res) => {
    res.send("Welcome to the user Management API!");
}

const signup = async (req, res) => {
    try{
      const userData = req.body; // this will contain the data sent by the client
    //   const user = new User(userData);
    //   user.save()

    const user = await User.create(userData);
    res.json({
        message: `User ${user.email} signed up successfully!`,
        user: user
    });
         
    }
    catch(err){
       console.error("Error during singup:", err);
       res.status(500).json({
        message:"An error occurred during singup. Please try again later.",
        error: err.message
       });
    }
   
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;

    // we find user by email
    const user = await User.findOne({email:email});

    //in case of User.find all the users will be returned as an array
   //if user is not found, we return an error message
   if(!user){
    return res.status(404).send("User not found please sign up first.");
   }

   //if user is found, we check if the password matches
   if(user.password !== password){
      return res.status(401).send("Incorrect password. Please try again.");
   }

   res.status(200).json({
    message: "Login successful",
    user:user
   })
}
  catch(err){
    res.json({
        message: "An error occurred during login. Please try again later.",
        error: err.message
    })
  }
    
}

const changePassword = async (req, res) => {
    try{
        const {email, oldPassword, newPassword} = req.body;

        const user = await User.findOneAndUpdate({
            email:email,
            password:oldPassword
        },
        {
            password:newPassword
        }
    );

      const updateUser = await User.findOne({email:email});

      res.status(200).json({
        massage:"Password change successfully",
        user:updateUser
      })

      res.send("Password has been changed successfully!");
    }
    catch(err){
        res.json({
            message:"An error occurred during password change. Please try again later.",
            error:err.message
        });
    }
}

const allUser =  async (req, res) => {
    try{
        const users = await User.find();

        res.status(200).json({
        message:"All users fetched successfully!",
        users:users
    });
    }
    catch(err){
       res.json({
          message:"Users not found. Please try again",
          error:err.message
       });
    }
}

const logout =  (req, res) => {
    try{
        res.send("User logged out successfully.");
    }
    catch(err){
       res.jshon({
          message: "Not able to logout please try again",
          error: err.message
       })
    }
}

module.exports = {
    home, 
    signup,
    login,
    changePassword,
    allUser,
    logout
};