import axios from "axios";


const request=axios.create({
    baseURL:"https://apiblogapp-production.up.railway.app"
})

export default request;