import axios from "axios";

const app = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
})

/*const appAuth = axios.create({
    baseURL,
    withCredentials: true,
})*/

export default app;