import axios from "axios";

const axiosAgent = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    validateStatus: function (status) {
        return status < 500;
    },
});

export default axiosAgent;
