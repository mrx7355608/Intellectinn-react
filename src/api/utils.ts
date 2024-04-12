import axios from "axios";

const serverURL = import.meta.env.VITE_SERVER_URL;
const environment = import.meta.env.VITE_ENV;

const axiosAgent = axios.create({
    baseURL: environment === "production" ? undefined : serverURL,
    validateStatus: function (status) {
        return status < 500;
    },
    withCredentials: true,
});

export default axiosAgent;
