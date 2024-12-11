import axios from "axios";

axios.defaults.withCredentials = true;

const domain = process.env.REACT_APP_DOMAIN;

export const api = axios.create({
    baseURL: domain,
    withCredentials: true,
});

export const privateApi = axios.create({
    baseURL: domain,
    withCredentials: true,
});

privateApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            try {
                await api.get("/auth/refresh");
                return api.request(error.config);
            } catch (error) {
                //setIsAdmin(false);
                if (window.location.href != "/admin/login") {
                    window.location.href = "/admin/login";
                }
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

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

export const login = async (credentials, setGlobalMessage) => {
    try {
        const response = await api.post("/auth/login", credentials);
        setGlobalMessage({ msg: response.data.msg });
        return true;
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

export const getSkills = async (setGlobalMessage) => {
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

export const createLanguege = async (language, setGlobalMessage) => {
    try {
        const response = await privateApi.post("/skills/language", language);
        setGlobalMessage({ msg: response.data.msg });
        return true;
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

export const createTech = async (tech, setGlobalMessage) => {
    try {
        const response = await privateApi.post("/skills/techonolgy", tech);
        setGlobalMessage({ msg: response.data.msg });
        return true;
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

export const deleteTech = async (tech_id, setGlobalMessage) => {
    try {
        const response = await privateApi.delete(
            `/skills/techonolgy/${tech_id}`
        );
        setGlobalMessage({ msg: response.data.msg });
        return true;
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

export const deleteLanguege = async (lang_id, setGlobalMessage) => {
    try {
        const response = await privateApi.delete(`/skills/language/${lang_id}`);
        setGlobalMessage({ msg: response.data.msg });
        return true;
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

export const updateLanguege = async (lang_id, language, setGlobalMessage) => {
    try {
        const response = await privateApi.patch(
            `/skills/language/${lang_id}`,
            language
        );
        setGlobalMessage({ msg: response.data.msg });
        return true;
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

export const updateTech = async (tech_id, tech, setGlobalMessage) => {
    try {
        const response = await privateApi.patch(
            `/skills/techonolgy/${tech_id}`,
            tech
        );
        setGlobalMessage({ msg: response.data.msg });
        return true;
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

export const fetchAllProjects = async (setGlobalMessage) => {
    try {
        const response = await api.get("/projects/");
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

export const deletProject = async (project_id, setGlobalMessage) => {
    try {
        const response = await api.delete(`/projects/${project_id}`);
        setGlobalMessage({ msg: response.data.msg });
        return true;
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

export const addProject = async (project, setGlobalMessage) => {
    try {
        const response = await privateApi.post("/projects/", project);
        setGlobalMessage({ msg: response.data.msg });
        return true;
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


export const changePassword = async (newPass, setGlobalMessage) => {
    try {
        const response = await privateApi.patch("/auth/password", newPass);
        setGlobalMessage({ msg: response.data.msg });
        return true;
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
}