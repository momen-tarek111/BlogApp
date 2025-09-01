import axios from "axios";


const request=axios.create({
    baseURL:"apiblogapp-production.up.railway.app"
})

export default request;