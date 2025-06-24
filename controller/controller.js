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

// get user by name
const getByName = async (req, res) => {
    try{
        
        const userName = req.params.name;
        const response = await User.find({
            name: userName
        });

        if(response.length === 0){
            return res.status(404).send("User not found.");
        }

        res.status(200).json({
            message:"User fetched successfully",
            user: response
        });
    }
    catch(err){
        console.error("Error fetching user:", err);
    }
}

// get user by country
const getByCountry = async (req,res) => {
    try{
       const countryName = req.params.country;
       const user = await User.find({
            country:countryName
       });

       if(user.length === 0){
           return res.status(404).send("No users found from this country.");
       }
       
       res.status(200).json({
          message: "Users from the specified country fetched successfully",
          user: user
       });

    }
    catch(err){
        console.error("Error fetching user:", err);
    }
}

//get user by age greater then
const userGreaterThenAge = async (req, res) => {
      try{
         const age = parseInt(req.params.age, 10);
         const users = await User.find({
            age: {
                $gte: age
            }
         });

         res.status(200).json({
            message:"Users older than specified age fetched successfully",
            users:users
         })
      }
      catch(err){
        consloe.error("Error fetching by age:", err);
      }
}


//get user by age less then
const userLessThenAge = async (req, res) => {
    try{
        const age = parseInt(req.params.age, 10);
        const users = await User.find({
            age:{
                $lte: age
            }
        });

        res.status(200).json({
            message: "Users yonger than specified age fetched successfully",
            users:users
        });
    }
    catch(err){
        console.error("Error fetching by age:", err);
    }
}

// get user which is not-equal to
const notEqualTo = async (req, res) => {
    try{
        const age = parseInt(req.params.age, 10);
        const users = await User.find({
            age: {
               $ne: age
            }
        });

        res.status(200).json({
            message: "Users specified age fetched successfully",
            users:users
        });
    }
    catch(err){
        console.error("Error fetching users by age", err);
    }
}

// get user by logical OR Operator
const getUserByCountryOrAge = async (req, res) =>{
    try{
       const country = req.params.country;
       const age = parseInt(req.params.age, 10);

       const users = await User.find({
           $or:[
            {
                country:country
              },
              {
                age:age
              }
           ]
       });

       res.status(200).json({
            message: "Users from specified country and age fetched successfully",
            users: users
       });
    }
    catch(err){
        console.log("Error fetching users by country and age:",err);
    }
}

// get user by logical NOR Operator

const userByNotAge = async (req, res) => {
            try{
               const age = req.params.age;
               const users = await User.find({
                  $nor:[
                    {
                        age: age
                    }
                  ]
               });

               res.status(200).json({
                message:"Users not of specified age fetched successfully",
                users:users
               })
            }
            catch(err){
                console.error("Error fetching users not of specified age:", err);
            }
}

// get user by logical AND Operator
const multipleQuery = async (req, res) => {
    try{
        const age = parseInt(req.params.age, 10);

        const users = await User.find({
            $and:[
                {
                    age: {$gte:age}
                },
                {
                    country:"India"
                },
                {
                    isActive: true
                }
            ]
        });

        res.status(200).json({
            message: "Users matching query criteria fetched successfully",
            users: users
        });
    }
    catch(err){
        console.error("Error fetching users by query:", err);
    } 
}

// get user by age in range of maximum and minimum 
const getUserByMaxMinAge = async (req, res) => {
    try{
        const minAge = parseInt(req.params.age, 10);
        const maxAge = parseInt(req.params.age, 10);

        const users = await User.find({
            // $and:[
            //     {
            //         age: {$gte:minAge}
            //     },
            //     {
            //         age: {$lte:maxAge}
            //     }
            // ]

            age:{
                $gte:minAge,
                $lte:maxAge
            }
        });

        res.status(200).json({
             message: "Users within specified age range fetched successfully",
            users:users
        })

    }
    catch(err){
        console.error("Error fetching users by age range:", err);
    }
}




//****************Aggregation********************* */
const activUser = async (req, res) => {
    try{
      const user = await User.aggreate([
       {
         $match:{
            country:"India",
            age: {$gte:age},
            isActive: true,
            email: {isExist: true}
        }
       },   
      ])
    }
    catch(err){

    }
}

const userCountByCountry = async (req, res) => {
    try{
       const usersCountByCountry = await User.aggregate([
        {
            $group:{
                _id:"$country",
                count:{
                    $sum:1
                }
            },
             $project:{
                _id:0,
                country:"$_id",
                count:1
            }
        }
       ])
    }
    catch(err){

    }
}

// exmpl
// const usersCountByRole = await User.aggregate([
//         {
//             $group:{
//                  _id:"$roles",
//                     count:{
//                     $sum:1
//                    }
//             }, 
//             $prject:{
//                 roles:"$_id",
//                 _id:0,
//                 count:{
//                     $sum:1
//                 }
//             }
             
//         }
//        ])






module.exports = {
    home, 
    signup,
    login,
    changePassword,
    allUser,
    logout,
    getByName,
    getByCountry,
    userGreaterThenAge,
    userLessThenAge,
    notEqualTo,
    getUserByCountryOrAge,
    multipleQuery,
    userByNotAge,
    getUserByMaxMinAge
};