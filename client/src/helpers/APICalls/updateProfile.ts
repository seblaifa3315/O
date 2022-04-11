import { FetchOptions } from "../../interface/FetchOptions";

const updateProfile = async (city: string, country: string, month: string, day: string, year: string, phone: string, email: string): Promise<any> => {
    const fetchOptions: FetchOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, country, month, day, year, phone, email }),
        credentials: "include",
    };
    return await fetch(`/profile`, fetchOptions)
        .then((res) => res.json())
        .catch(() => ({
            error: { message: "Unable to connect to server. Please try again" },
        }));
};

export default updateProfile;
