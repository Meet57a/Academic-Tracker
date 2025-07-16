export const register = async (data: any) => {
    const response = await fetch(import.meta.env.VITE_URL + "/auth/registerCode", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export const login = async (data: any) => {
    const response = await fetch(import.meta.env.VITE_URL + "/auth/loginCode", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}