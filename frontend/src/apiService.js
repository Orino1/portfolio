import axios from "axios";

export const api = axios.create({
    baseURL: "http://127.0.0.1:5000/api",
    withCredentials: true,
});

export const fetchLastestPosts = async (setGlobalMessage) => {
    try {
        const response = await api.get("/posts/listed/latest");
        return response.data;
    } catch (err) {
        if (err.response) {
            console.error("backend error:", err.response.data.msg);
            setGlobalMessage({ msg: err.response.data.msg, type: "error" });
        } else if (err.request) {
            console.error("network error:", err.request);
            setGlobalMessage({
                msg: "unable to reach the server",
                type: "error",
            });
        } else {
            console.error("unknown error:", err.message);
            setGlobalMessage({ msg: "Unknown error occurred", type: "error" });
        }
        return null;
    }
};

export const fetchAllPosts = async (setGlobalMessage) => {
    try {
        const response = await api.get("/posts/listed");
        return response.data;
    } catch (err) {
        if (err.response) {
            console.error("backend error:", err.response.data.msg);
            setGlobalMessage({ msg: err.response.data.msg, type: "error" });
        } else if (err.request) {
            console.error("network error:", err.request);
            setGlobalMessage({
                msg: "unable to reach the server",
                type: "error",
            });
        } else {
            console.error("unknown error:", err.message);
            setGlobalMessage({ msg: "Unknown error occurred", type: "error" });
        }
        return null;
    }
};

export const fetchSkills = async (setGlobalMessage) => {
    try {
        const response = await api.get("/skills");
        return response.data;
    } catch (err) {
        if (err.response) {
            console.error("backend error:", err.response.data.msg);
            setGlobalMessage({ msg: err.response.data.msg, type: "error" });
        } else if (err.request) {
            console.error("network error:", err.request);
            setGlobalMessage({
                msg: "unable to reach the server",
                type: "error",
            });
        } else {
            console.error("unknown error:", err.message);
            setGlobalMessage({ msg: "Unknown error occurred", type: "error" });
        }
        return null;
    }
};
