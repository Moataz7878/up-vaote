import cloudinary from'cloudinary'
import { config } from "dotenv"
config({path:'./env/secret.env'})
cloudinary.v2.config({
    cloud_name: process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.apisecret,
    secure:true
  })
  export default cloudinary.v2
