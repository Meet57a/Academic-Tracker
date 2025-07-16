export const createTable = async (data: any) => {
    const response = await fetch(import.meta.env.VITE_URL + "/timeTable/createTable", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export const fetchTable = async () => {
    const response = await fetch(import.meta.env.VITE_URL + "/timeTable/fetchTable", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
       
    });
    return response.json();
}
