import axios from "axios";

const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:8080/" : "http://localhost:8080"

const app = axios.create({
    baseURL,
    withCredentials: true
})

export default app;