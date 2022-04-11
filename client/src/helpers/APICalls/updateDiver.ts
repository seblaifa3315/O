import { FetchOptions } from "../../interface/FetchOptions";

const updateDiver = async (firstName: string, lastName: string, status: string, shift: string, hiringDate: Date, isAdmin: boolean, tracks: String[], divingCert: String[], gearCert: String[], medicalCert: String[], otherCert: String[], diverId: string): Promise<any> => {
    const fetchOptions: FetchOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, status, shift, hiringDate, isAdmin, tracks, divingCert, gearCert, medicalCert, otherCert, diverId }),
        credentials: "include",
    };
    return await fetch(`/diver/${diverId}`, fetchOptions)
        .then((res) => res.json())
        .catch(() => ({
            error: { message: "Unable to connect to server. Please try again" },
        }));
};


export default updateDiver;
