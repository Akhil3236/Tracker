import axios from "axios";

export const fetchFromMainServer = async (userId, jwtToken, cookieHeader = "") => {
    try {
        const serviceToken = process.env.MAIN_SERVER_BEARER;
        const authorization = serviceToken ? `Bearer ${serviceToken}` : `Bearer ${jwtToken}`;
        const baseURL = process.env.MAIN_SERVER_URL || "http://localhost:8080";

        const res = await axios.get(`${baseURL}/cart/${userId}`, {
            headers: {
                "Authorization": authorization,
                "Content-Type": "application/json",
                ...(cookieHeader ? { "Cookie": cookieHeader } : {})
            },
            timeout: 10000
        });
        return res.data;
    } catch (err) {
        console.error("Error fetching from main server:", err);
        return null;
    }
}

