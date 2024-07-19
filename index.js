import express from "express"    //this way of importing is new , from ES6 edition , it is also applicable in backend
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors"

import bookRoute from "./route/book_route.js"
import userRoute from "./route/user_route.js"

const app = express()

app.use(cors())

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 3000
const URI = process.env.MongoDBURI


try{
    mongoose.connect(URI , {
        useUnifiedTopology : true,
        useNewUrlParser : true
    })
    console.log("connected to MongoDB successfully");
}
catch(error)
{
  console.log("Error",error);
}

//defining routes
app.use("/book" , bookRoute);
app.use("/user" , userRoute);


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})