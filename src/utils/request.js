import axios from "axios";


const request=axios.create({
    baseURL:"https://api-blog-app-two.vercel.app"
})

export default request;