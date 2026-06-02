const BASE_URL = "/tasks";

function getToken() {
    return localStorage.getItem("token");
}

function authHeader() {
    return {
        "Content-Type": "application/json",
        "x-access-token": getToken()
    };
}

export const getTasks = async () => {
    const res = await fetch(BASE_URL, {
        headers: authHeader()
    });
    return res.json();
};

export const getTask = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        headers: authHeader()
    });
    return res.json();
};

export const createTask = async (task) => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(task),
    });
    return res.json();
};

export const updateTask = async (id, task) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(task),
    });
    return res.json();
};

export const completeTask = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: { "x-access-token": getToken() }
    });
    return res.json();
};

export const deleteTask = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: { "x-access-token": getToken() }
    });
    return res.json();
};