export const createTask = async (data: any) => {
    const response = await fetch(import.meta.env.VITE_URL + "/track/createTask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export const subjectCreate = async (data: any) => {
    const response = await fetch(import.meta.env.VITE_URL + "/track/subjectCreate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export const taskUpdate = async (data: any) => {
    const response = await fetch(import.meta.env.VITE_URL + "/track/taskUpdate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export const fetchSubjectAndTimeTable = async () => {
    const response = await fetch(import.meta.env.VITE_URL + "/track/fetchSubjectAndTimeTable", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },

    });
    return response.json();
}

export const deleteTask = async (id: string) => {
    const response = await fetch(import.meta.env.VITE_URL + "/track/deleteTask/" + id, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },

    });
    return response.json();
}

export const fetchTask   = async () => {
    const response = await fetch(import.meta.env.VITE_URL + "/track/fetchTask/" + localStorage.getItem("id"), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },

    });
    return response.json();
}