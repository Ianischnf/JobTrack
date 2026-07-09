import Input from "@/components/ui/Input";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Login() {

    const [selectedTab, setSelectedTab] = useState<"login" | "register">("login");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    async function register() {
        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    FirstName,
                    LastName,
                    Email,
                    Password,
                    ConfirmPassword
                }),
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ScrollView
            style={styles.containerLogin}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.blocbtnLoginRegister}>
                <Pressable
                    onPress={() => setSelectedTab("login")}
                    style={[styles.button, selectedTab === "login" && styles.buttonSelected]}
                >
                    <Text style={[styles.text, selectedTab === "login" && styles.textSelected]}>
                        Connexion
                    </Text>
                </Pressable>

                <Pressable
                    onPress={() => setSelectedTab("register")}
                    style={[styles.button, selectedTab === "register" && styles.buttonSelected]}
                >
                    <Text style={[styles.text, selectedTab === "register" && styles.textSelected]}>
                        Inscription
                    </Text>
                </Pressable>
            </View>

            <View style={styles.blocLogo}>
                <Image
                    source={require("../../assets/images/logoJobTrack.png")}
                    style={styles.logo}
                />
            </View>

            {selectedTab === "login" && (
                <View style={styles.containerForm}>
                    <View>
                        <Text style={styles.label}>Email</Text>
                        <Input icon={null} placeholder="Adresse email..." />
                    </View>

                    <View>
                        <Text style={styles.label}>Mot de passe</Text>
                        <Input icon={null} placeholder="Mot de passe..." />
                    </View>

                    <View style={styles.blocPwdFrgt}>
                        <Text style={styles.textPwdFrgt}>Mot de passe oublié ?</Text>
                    </View>

                    <Pressable style={styles.btnPrimary}>
                        <Text style={styles.textBtnPrimary}>Connexion</Text>
                    </Pressable>
                </View>
            )}

            {selectedTab === "register" && (
                <View style={styles.containerForm}>
                    <View>
                        <Text style={styles.label}>Nom</Text>
                        <Input icon={null} placeholder="Votre nom..." />
                    </View>

                    <View>
                        <Text style={styles.label}>Prénom</Text>
                        <Input icon={null} placeholder="Votre prénom..." />
                    </View>

                    <View>
                        <Text style={styles.label}>Email</Text>
                        <Input icon={null} placeholder="Adresse email..." />
                    </View>

                    <View>
                        <Text style={styles.label}>Mot de passe</Text>
                        <Input icon={null} placeholder="Mot de passe..." />
                    </View>

                    <View>
                        <Text style={styles.label}>Confirmer mot de passe</Text>
                        <Input icon={null} placeholder="Confirmer le mot de passe..." />
                    </View>

                    <Pressable style={styles.btnPrimary}>
                        <Text style={styles.textBtnPrimary}>Inscription</Text>
                    </Pressable>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    containerLogin: {
        flex: 1,
        backgroundColor: "#FFF",
    },

    scrollContent: {
        paddingTop: 100,
        paddingBottom: 40,
        gap: 50,
    },

    blocbtnLoginRegister: {
        width: "100%",
        minHeight: 70,
        flexDirection: "row",
        justifyContent: "center",
    },

    blocLogo: {
        width: "100%",
        alignItems: "center",
    },

    logo: {
        width: 170,
        height: 170,
        resizeMode: "contain",
    },

    button: {
        backgroundColor: "transparent",
        padding: 15,
        width: 150,
        alignItems: "center",
    },

    buttonSelected: {
        borderBottomWidth: 2,
        borderBottomColor: "#3373FF",
    },

    text: {
        color: "#888",
        fontWeight: "500",
    },

    textSelected: {
        color: "#3373FF",
    },

    containerForm: {
        width: "100%",
        gap: 20,
        paddingHorizontal: 10,
    },

    label: {
        fontSize: 15,
        marginLeft: 7,
        marginBottom: 10,
    },

    blocPwdFrgt: {
        width: "100%",
        alignItems: "flex-end",
    },

    textPwdFrgt: {
        color: "#2D73FF",
        textDecorationLine: "underline",
    },

    btnPrimary: {
        backgroundColor: "#3373FF",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        borderRadius: 5,
    },

    textBtnPrimary: {
        color: "#FFF",
        fontSize: 15,
    },
});