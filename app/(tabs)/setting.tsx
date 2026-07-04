import Navbar from "@/components/ui/navbar";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Setting() {
    const [profil, setProfil] = useState({
        FirstName: "",
        LastName: "",
        email: ""
    });

    return (
        <View style={styles.page}>
            <ScrollView
                style={styles.containerSetting}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text>Paramètres</Text>

                <View style={styles.containerProfilBloc}>
                    <View style={[styles.profilBloc, styles.bloc]}>
                        <View style={styles.titleBloc}>
                            <Text>Profil</Text>
                        </View>

                        <View style={styles.infoProfilBloc}>
                            <View style={styles.infoProfilLeft}>
                                <View style={styles.ProfilPicture}></View>
                            </View>

                            <View style={styles.infoProfilRight}>
                                <Text style={styles.LabelInput}>Nom</Text>
                                <TextInput
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                    value={profil.LastName}
                                    onChangeText={(value) =>
                                        setProfil({ ...profil, LastName: value })
                                    }
                                />

                                <Text style={styles.LabelInput}>Prénom</Text>
                                <TextInput
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                    value={profil.FirstName}
                                    onChangeText={(value) =>
                                        setProfil({ ...profil, FirstName: value })
                                    }
                                />

                                <Text style={styles.LabelInput}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    underlineColorAndroid="transparent"
                                    value={profil.email}
                                    onChangeText={(value) =>
                                        setProfil({ ...profil, email: value })
                                    }
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.preferenceAndDataBloc}>
                    <View style={[styles.preferenceBloc, styles.bloc]}>
                        <View style={styles.titleBloc}>
                            <Text>Préférences</Text>
                        </View>
                        <View style={styles.OptionLine}>
                            <Text>Thème  : </Text>
                            <Image
                                style={styles.Icon}
                                source={require('../../assets/images/moon.png')}
                            />
                            <Image
                                style={styles.Icon}
                                source={require('../../assets/images/sun.png')}
                            />
                        </View>
                        <View style={styles.OptionLine}>
                            <Text>Langue : </Text>
                            <Image
                                style={styles.Icon}
                                source={require('../../assets/images/icon-france.png')}
                            />
                            <Image
                                style={styles.Icon}
                                source={require('../../assets/images/icon-eng.png')}
                            />
                        </View>
                    </View>
                    <View style={[styles.dataBloc, styles.bloc]}>
                        <View style={styles.titleBloc}>
                            <Text>Données</Text>
                        </View>
                        <View style={styles.OptionLine}>
                            <Text>Exporter : </Text>
                            <Image
                                style={[styles.Icon, styles.IconData, styles.IconDataExport]}
                                source={require('../../assets/images/icon_export.png')}
                            />
                        </View>
                        <View style={styles.OptionLine}>
                            <Text>Réinitialiser : </Text>
                            <Image
                                style={[styles.Icon, styles.IconData]}
                                source={require('../../assets/images/icon-rei.png')}
                            />
                        </View>
                    </View>
                </View>

                <Navbar />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: "#FCFCFC",

    },

    containerSetting: {
        flex: 1,
    },

    scrollContent: {
        paddingTop: 100,
        paddingBottom: 140,
        gap: 5
    },

    containerProfilBloc: {
        width: "100%",
        paddingLeft: 15,
        paddingRight: 15,
    },

    bloc: {
        borderWidth: 1,
        borderColor: "#939090",
        backgroundColor: "#fff",
        borderRadius: 5,
    },
    profilBloc: {
        width: "100%",
        overflow: "hidden",
    },

    titleBloc: {
        width: "100%",
        height: 40,
        justifyContent: "center",
        paddingLeft: 15,
    },

    infoProfilBloc: {
        width: "100%",
        minHeight: 230,
        flexDirection: "row",
        paddingBottom: 20,
    },

    infoProfilRight: {
        width: "50%",
        gap: 3,
        paddingLeft: 15,
    },

    infoProfilLeft: {
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
    },

    ProfilPicture: {
        width: 150,
        height: 150,
        backgroundColor: "grey",
        borderRadius: 8,
    },

    LabelInput: {},

    input: {
        borderWidth: 1,
        width: 150,
        height: 30,
        paddingHorizontal: 8,
        paddingVertical: 0,
        backgroundColor: "#fff",
        borderRadius: 4,
    },

    preferenceAndDataBloc: {
        width: '100%',
        minHeight: 150,
        // backgroundColor: 'red',
        flexDirection: 'row',
        gap: 5,
        paddingLeft: 15,
        paddingRight: 20,
    },
    preferenceBloc: {
        width: '50%',
        minHeight: 50,
        gap: 20
    },
    dataBloc: {
        width: '50%',
        minHeight: 50,
        gap: 20
    },
    OptionLine: {
        width: '100%',
        height: 20,
        // backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    },
    Icon: {
        marginRight: 15,
        marginLeft: 15
    },
    IconData : {
        marginLeft: 20
    },
    IconDataExport : {
        marginLeft: 40
    }
});