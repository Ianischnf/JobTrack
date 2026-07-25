import { useEffect, useState } from "react";


const API_URL = 'http://192.168.1.16:8080/api/auth';



export type LoginResponse = {
    token: string;
    firstName: string;
    lastName: string;
    email: string;
};

export type RegisterResponse = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}


export async function loginUser(
    email: string,
    password: string
): Promise<LoginResponse> {

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            email, password
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error("Email ou mot de passe incorrect");
    }

    return data
}


export async function RegisterUser(
    lastName: string,
    firstName: string,
    email: string,
    password: string,
    confirmPassword: string
): Promise<RegisterResponse> {

    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        }),
    });

    if (!response.ok) {
        const errorMessage = await response.text();

        throw new Error(errorMessage || "Erreur lors de l'inscription");
    }

    const data: RegisterResponse = await response.json();


    return data;
}