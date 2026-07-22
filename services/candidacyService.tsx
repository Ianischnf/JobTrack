import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = 'http://192.168.1.16:8080/api/candidacy';

export type CandidacyResponse = {
    id : number,
    company: string,
    jobTitle: string,
    dateCandidacy: string,
    status: string
}

export enum CandidacyStatut {
    ENVOYEE     =   "ENVOYEE",
    ENTRETIEN   =   "ENTRETIEN",
    REFUS       =   "REFUS",
}

export async function saveCandidacy(
    company: string,
    jobTitle: string,
    dateCandidacy: string,
    status: CandidacyStatut
): Promise<CandidacyResponse> {

    const token = await AsyncStorage.getItem("token");


    const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
            company,
            jobTitle,
            dateCandidacy,
            status
        }),
    });

    const text = await response.text();
    console.log("Status : ", response.status);
    console.log("Reponse backend : ", text);

    if (!response.ok) {
        throw new Error(
            `Erreur HTTP ${response.status} : ${text || "Réponse vide du backend"}`
        );
    }



    return JSON.parse(text);
}

export async function getAllCandidacy() : Promise<CandidacyResponse[]> {


    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${API_URL}`, {
        method : 'GET',
        headers : {
            Authorization: `Bearer ${token}`,
        },
    });

    if(!response.ok){
        throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();
}

export async function getOneCandidacy(id: number) : Promise<CandidacyResponse> {
    const token = await AsyncStorage.getItem("token");
    
    const response = await fetch(`${API_URL}/${id}`, {
        method : 'GET',
        headers : {
            Authorization : `Bearer ${token}`
        }
    });

    if(!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();
}

export async function updateCandidacy(
    id : number,
    company: string,
    jobTitle: string,
    dateCandidacy: string,
    status: CandidacyStatut

) : Promise<CandidacyResponse> {
    const token = await AsyncStorage.getItem("token");

    const response = await fetch(`${API_URL}/${id}`, {
        method : 'PUT',
        headers : {
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },

        body : JSON.stringify({
            company,
            jobTitle,
            dateCandidacy,
            status
        })
    });

    if(!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();
}