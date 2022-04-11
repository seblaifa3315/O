export interface DiversApiData {
    _id: string;
    firstName: string;
    lastName: string;
    hiringDate: Date;
    status: string;
    shift: string;
    photo: string;
    userId: string;
    divingCert: Array<String>;
    gearCert: Array<String>;
    medicalCert: Array<String>;
    otherCert: Array<String>;
    tracks: Array<String>;
    coverPicture: string;
    city: string;
    country: string;
    birthMonth: string;
    birthDay: string;
    birthYear: string;
    phone: string;
    email: string;
    isAdmin: boolean;
}