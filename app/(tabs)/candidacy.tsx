import Input from "@/components/ui/Input";
import Navbar from "@/components/ui/navbar";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Candidacy() {
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const [status, setStatus] = useState("Envoyée");
    const [showStatus, setShowStatus] = useState(false);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Envoyée":
                return "#60A5FA";
            case "Entretien":
                return "#FBBF24";
            case "Acceptée":
                return "#34D399";
            case "Refusée":
                return "#F87171";
            default:
                return "#999";
        }
    };

    return (
        <View style={styles.page}>
            <ScrollView
                style={styles.containerCandidacy}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Ajouter une candidature</Text>

                <View style={styles.containerForm}>
                    <Text style={styles.label}>Entreprise</Text>
                    <Input
                        icon={require("../../assets/images/icon_input_business.png")}
                        placeholder="ex : Capgemini..."
                    />

                    <Text style={styles.label}>Poste</Text>
                    <Input
                        icon={require("../../assets/images/icon_input_poste.png")}
                        placeholder="ex : Développeur Full Stack..."
                    />

                    <Text style={styles.label}>Date de la candidature</Text>
                    <Pressable
                        style={styles.dateInput}
                        onPress={() => setShowPicker(true)}
                    >
                        <Text>{date.toLocaleDateString()}</Text>
                    </Pressable>

                    {showPicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowPicker(false);

                                if (selectedDate) {
                                    setDate(selectedDate);
                                }
                            }}
                        />
                    )}

                    <Text style={styles.label}>Status</Text>
                    <Pressable
                        style={styles.selectInput}
                        onPress={() => setShowStatus(!showStatus)}
                    >
                        <View style={styles.statusRow}>
                            <View
                                style={[
                                    styles.dot,
                                    { backgroundColor: getStatusColor(status) },
                                ]}
                            />
                            <Text>{status}</Text>
                        </View>
                    </Pressable>

                    {showStatus && (
                        <View style={styles.dropdown}>
                            {["Envoyée", "Entretien", "Acceptée", "Refusée"].map((item) => (
                                <Pressable
                                    key={item}
                                    style={styles.statusOption}
                                    onPress={() => {
                                        setStatus(item);
                                        setShowStatus(false);
                                    }}
                                >
                                    <View
                                        style={[
                                            styles.dot,
                                            { backgroundColor: getStatusColor(item) },
                                        ]}
                                    />
                                    <Text>{item}</Text>
                                </Pressable>
                            ))}
                        </View>
                    )}

                    <Pressable style={styles.btnSave}>
                        <Text style={styles.btnSaveText}>Enregistrer ma candidature</Text>
                    </Pressable>
                </View>
            </ScrollView>

            <View style={styles.containerNavbar}>
                <Navbar />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#FCFCFC",
    },

    scrollContent: {
        paddingTop: 100,
        paddingBottom: 140,
    },

    containerForm: {
        gap: 20,
        padding: 20,
    },

    title: {
        fontSize: 30,
        marginLeft: 20,
    },

    label: {
        fontSize: 15,
        marginLeft: 6,
    },

    dateInput: {
        borderColor: "#CEC2C2",
        borderWidth: 1,
        borderRadius: 12,
        height: 50,
        paddingHorizontal: 12,
        backgroundColor: "#FFF",
        justifyContent: "center",
    },

    selectInput: {
        borderColor: "#CEC2C2",
        borderWidth: 1,
        borderRadius: 12,
        height: 52,
        justifyContent: "center",
        paddingHorizontal: 12,
        backgroundColor: "#FFF",
    },

    statusRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    dot: {
        width: 10,
        height: 10,
        borderRadius: 50,
        marginRight: 10,
    },

    dropdown: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ddd",
        paddingVertical: 6,
    },

    statusOption: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 12,
    },

    btnSave: {
        backgroundColor: "#FFF",
        height: 52,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#2D73FF",
        justifyContent: "center",
        alignItems: "center",
    },

    btnSaveText: {
        color: "#2D73FF",
        fontSize: 16,
        fontWeight: "600",
    },

    containerNavbar: {
        position: "absolute",
        bottom: 25,
        left: 0,
        width: "100%",
        alignItems: "center",
    },
});