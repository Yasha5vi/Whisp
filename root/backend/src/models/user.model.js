import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:[true, 'Email is Required'],
            unique:true,
            lowercase:true,
            trim: true,
            index:true
        },
        email:{
            type:String,
            required:[true, 'Email is Required'],
            unique:true,
            trim: true,
        },
        firstName:{
            type:String,
            required:[true, 'First Name is Required'],
            lowercase:true,
            trim:true,
            index:true
        },
        lastName:{
            type:String,
            required:[true, 'Last Name is Required'],
            lowercase:true,
            trim:true,
            index:true
        },
        password:{
            type:String,
            required:[true, 'Password is Required'],
        },
        refreshToken:{
            type:String
        }
    },
    {
        timestamps:true
    }
)

// hashing hook
var saltingRounds = 10
userSchema.pre("save",async function (next){
    if((this.isModified("password"))){
        this.password = await bcrypt.hash(this.password,saltingRounds)
    }
    next()
})

userSchema.methods.isMatched = async function (password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = async function (){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function (){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema);