import { useAlert } from "../hooks/useAlert";

const API_URL = 'http://192.168.1.16/api/candidacy';

export type CandidacyResponse = {
    company : string,
    jobTitle : string,
    dateCandidacy : string,
    status : string
}

    const {
        message,
        type,
        showPopup,
        showAlert,
    } = useAlert();

export async function saveCandidacy(
    company : string,
    jobTitle : string,
    dateCandidacy : string,
    status : string
) : Promise<CandidacyResponse> {

    const response = await fetch(`${API_URL}`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },

        body : JSON.stringify({
            company,
            jobTitle,
            dateCandidacy,
            status
        }),
    });

    const data = await response.json();

    if(company.trim() === "" || jobTitle.trim() === "" || dateCandidacy === "" || status === ""){
        showAlert("Veuillez remplir tous les champs", "error");
    }
    
    return data
}