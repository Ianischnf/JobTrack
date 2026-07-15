import Input from "@/components/ui/Input";
import Popup from "@/components/ui/popup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAlert } from "../hooks/useAlert";

import { router } from "expo-router";
import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { loginUser, RegisterUser } from "../services/authService";

export default function Login() {
    const [selectedTab, setSelectedTab] =
        useState<"login" | "register">("login");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const {
        message,
        type,
        showPopup,
        showAlert,
    } = useAlert();

    

    async function register() {

        if (password != confirmPassword) {
            showAlert("Les mots de passes ne correspondent pas", "error")
            return;
        } else {
            showAlert("Inscription réussi", "success");
        }

        try {

            const data = await RegisterUser(lastName, firstName, email, password, confirmPassword);
            console.log("Inscription réussi", data);

        } catch (error) {
            console.log("Erreur réseau :", error);
        }
    }

    async function login() {
        try {
            const data = await loginUser(email, password);

            await AsyncStorage.setItem("token", data.token);
            await AsyncStorage.setItem("firstName", data.firstName)

            router.replace("/home");
        } catch (error) {
            console.log("Erreur réseau :", error);
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.keyboardContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >

            {showPopup && (
                <Popup
                    message={message}
                    type={type}
                />
            )}

            <ScrollView
                style={styles.containerLogin}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.blocbtnLoginRegister}>
                    <Pressable
                        onPress={() => setSelectedTab("login")}
                        style={[
                            styles.button,
                            selectedTab === "login" && styles.buttonSelected,
                        ]}
                    >
                        <Text
                            style={[
                                styles.text,
                                selectedTab === "login" && styles.textSelected,
                            ]}
                        >
                            Connexion
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={() => setSelectedTab("register")}
                        style={[
                            styles.button,
                            selectedTab === "register" && styles.buttonSelected,
                        ]}
                    >
                        <Text
                            style={[
                                styles.text,
                                selectedTab === "register" &&
                                styles.textSelected,
                            ]}
                        >
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

                            <Input
                                icon={null}
                                placeholder="Adresse email..."
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Mot de passe</Text>

                            <Input
                                icon={null}
                                placeholder="Mot de passe..."
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <View style={styles.blocPwdFrgt}>
                            <Text style={styles.textPwdFrgt}>
                                Mot de passe oublié ?
                            </Text>
                        </View>

                        <Pressable
                            onPress={login}
                            style={styles.btnPrimary}
                        >
                            <Text style={styles.textBtnPrimary}>
                                Connexion
                            </Text>
                        </Pressable>
                    </View>
                )}

                {selectedTab === "register" && (
                    <View style={styles.containerForm}>
                        <View>
                            <Text style={styles.label}>Nom</Text>

                            <Input
                                icon={null}
                                placeholder="Votre nom..."
                                value={lastName}
                                onChangeText={setLastName}
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Prénom</Text>

                            <Input
                                icon={null}
                                placeholder="Votre prénom..."
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Email</Text>

                            <Input
                                icon={null}
                                placeholder="Adresse email..."
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>Mot de passe</Text>

                            <Input
                                icon={null}
                                placeholder="Mot de passe..."
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <View>
                            <Text style={styles.label}>
                                Confirmer le mot de passe
                            </Text>

                            <Input
                                icon={null}
                                placeholder="Confirmer le mot de passe..."
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                            />
                        </View>

                        <Pressable
                            onPress={() => register()}
                            style={styles.btnPrimary}
                        >
                            <Text style={styles.textBtnPrimary}>
                                Inscription
                            </Text>
                        </Pressable>
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
        backgroundColor: "#FFF",
    },

    containerLogin: {
        flex: 1,
        backgroundColor: "#FFF",
    },

    scrollContent: {
        flexGrow: 1,
        paddingTop: 60,
        paddingBottom: 60,
        gap: 35,
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