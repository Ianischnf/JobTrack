const API_URL = 'http://192.168.1.16:8080/api/candidacy';

export type CandidacyResponse = {
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

    const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
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