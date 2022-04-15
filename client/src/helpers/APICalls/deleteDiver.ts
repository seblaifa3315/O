import { FetchOptions } from "../../interface/FetchOptions";

const deleteDiver = async (diverId: string): Promise<any> => {
    const fetchOptions: FetchOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ diverId }),
        credentials: "include",
    };
    return await fetch(`/auth/delete`, fetchOptions)
        .then((res) => res.json())
        .catch(() => ({
            error: { message: "Unable to connect to server. Please try again" },
        }));
};

export default deleteDiver;
