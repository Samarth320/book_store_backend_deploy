import User from "../model/user_model.js";
import bcryptjs from "bcryptjs";

export const signup = async(req,res)=>
{

    try{
        const {fullname,email,password} = req.body;

        const user = await User.findOne({email})
    
        if(user)
        {
            return res.status(400).json({message : "user already exists"})
        }

        // encrypting the password to store in database
        const hashPassword = await bcryptjs.hash(password,10);

        const createdUser = new User({
            fullname : fullname,
            email : email,
            password : hashPassword
        })

        await createdUser.save()

        res.status(200).json({ message : "user created successfully",
            user : {
                _id : createdUser._id,
                fullname : createdUser.fullname,
                email : createdUser.email
            }
        })
    }
    catch(error)
    {
        console.log("Error: "+ error.message)
        res.status(500).json({message : "internal server error"})
    }
};

// login controller

export const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        
        const isMatch = await bcryptjs.compare(password , user.password);
        if(!user || !isMatch)
        {
            return res.status(400).json({ message : "Invalid username or password"});
        }
        else{
            res.status(200).json({ message : "login successfull", user : {
                _id : user._id,
                email : user.email,
                fullname : user.fullname
            } })
        }

    }
    catch(error)
    {
        console.log("Error "+ error.message);
        res.status(500).json({ message : "internal server error" })
    }
}