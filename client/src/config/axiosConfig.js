import axios from "axios";

const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:8080/" : "http://localhost:8080"

const app = axios.create({
    baseURL,
    withCredentials: true
})

app.interceptors.response.use(
    response => (response),
    error => (Promise.reject(error.response.data.err))
)

export default app;