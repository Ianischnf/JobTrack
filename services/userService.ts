import AsyncStorage from "@react-native-async-storage/async-storage";


const API_URL = 'http://192.168.1.16:8080/api/user/me';

export type UserResponse = {
    id : number,
    firstName : string,
    lastName : string,
    email : string
}

export async function getCurrentUser(): Promise<UserResponse> {

    const token = await AsyncStorage.getItem("token");

    const response = await fetch(`${API_URL}`, {
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