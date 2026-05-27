const BASE_URL = "/tasks";

export const getTasks = async() => {
    const res = await fetch(BASE_URL);
    return res.json();
};

export const getTask = async(id) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    return res.json();
};

export const createTask = async(task) => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task),
    });
    return res.json();
};

export const updateTask = async(id, task) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(task),
    });
    return res.json();
};

export const completeTask = async(id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
    });
    return res.json();
};

export const deleteTask = async(id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });
    return res.json();
};