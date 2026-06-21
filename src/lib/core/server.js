"use server"
const baseUrl = process.env.BACKEND_BASE_URL;

export const serverMutaion = async (apiPath, formData, actionMethod = "POST") => {
    try {
        const res = await fetch(`${baseUrl}${apiPath}`, {
            method: actionMethod,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        return res.json();
    } catch (error) {
        console.log(error)
    }
}

export const serverFetch = async (apiUrl)=>{
    try {
        const res = await fetch(`${baseUrl}${apiUrl}`);
        return res.json();
    } catch (error) {
        console.log(error)
    }
}