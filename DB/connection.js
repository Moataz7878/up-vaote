import mongoose from "mongoose";


export const DBConnection =async ()=>{
  return  await mongoose.connect(process.env.DBconnect)
  .then(result=> console.log('DB success'))
  .catch((err)=> console.log('Fail connections DB'))
}