import AsyncStorage from "@react-native-async-storage/async-storage";


const API_URL = 'http://192.168.1.16:8080/api/user';

export type UserResponse = {
    lastName : string,
    firstName : string,
    email : string
}

export async function getCurrentUser(): Promise<UserResponse> {

    const token = await AsyncStorage.getItem("token");

    const response = await fetch(`${API_URL}/me`, {
        method : "GET",
        headers: {
            Authorization : `Bearer ${token}`
        },
    });

    if(!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json();

}

export async function updateUserData(
    lastName: string,
    firstName : string,
    email : string
) : Promise<UserResponse> {

    const token = await AsyncStorage.getItem("token");

    const response = await fetch(`${API_URL}/id`, {
        method: "PUT",
        headers : {
            "Content-Type": "application/json",
            Authorization : `Bearer ${token}`
        },

        body : JSON.stringify({
            firstName,
            lastName,
            email
        })
    });

    if(!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
    }

    return await response.json()

}