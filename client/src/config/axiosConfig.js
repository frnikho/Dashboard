import axios from "axios";
import env from "react-dotenv";

const baseURL = process.env.NODE_ENV === "development" ? env.API_URL : "http://localhost:8080"

const app = axios.create({
    baseURL,
    withCredentials: true
})

export default app;