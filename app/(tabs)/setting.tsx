import Navbar from "@/components/ui/navbar";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Setting() {
  const [profil, setProfil] = useState({
    FirstName: "",
    LastName: "",
    email: "",
  });

  return (
    <View style={styles.page}>
      <ScrollView
        style={styles.containerSetting}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.blocTitle}>
          <Text style={styles.Title}>Paramètres</Text>
          <Ionicons name="settings-outline" size={28} color="#111" />
        </View>

        <View style={styles.containerProfilBloc}>
          <View style={[styles.profilBloc, styles.bloc]}>
            <View style={styles.titleBloc}>
              <Feather name="user" size={22} color="#111" />
              <Text>Profil</Text>
            </View>

            <View style={styles.infoProfilBloc}>
              <View style={styles.infoProfilLeft}>
                <View style={styles.ProfilPicture} />
              </View>

              <View style={styles.infoProfilRight}>
                <Text style={styles.LabelInput}>Nom</Text>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  value={profil.LastName}
                  onChangeText={(newValue) =>
                    setProfil({ ...profil, LastName: newValue })
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

        <View style={styles.preferenceAndDataContainer}>
          <View style={[styles.preferenceBloc, styles.bloc]}>
            <View style={styles.titleBloc}>
              <Feather name="sliders" size={22} color="#111" />
              <Text>Préférences</Text>
            </View>

            <View style={styles.OptionLine}>
              <Text>Thème :</Text>
              <Feather name="moon" size={20} color="#111" style={styles.Icon} />
              <Feather name="sun" size={20} color="#111" style={styles.Icon} />
            </View>

            <View style={styles.OptionLine}>
              <Text>Langue :</Text>
              <Image
                style={styles.FlagIcon}
                source={require("../../assets/images/icon-france.png")}
              />
              <Image
                style={styles.FlagIcon}
                source={require("../../assets/images/icon-eng.png")}
              />
            </View>
          </View>

          <View style={[styles.dataBloc, styles.bloc]}>
            <View style={styles.titleBloc}>
              <Feather name="database" size={22} color="#111" />
              <Text>Données</Text>
            </View>

            <View style={styles.OptionLine}>
              <Text>Exporter :</Text>
              <Feather name="download" size={20} color="#111" style={styles.IconDataExport} />
            </View>

            <View style={styles.OptionLine}>
              <Text>Réinitialiser :</Text>
              <Feather name="rotate-ccw" size={20} color="#111" style={styles.IconData} />
            </View>
          </View>
        </View>

        <View style={styles.AboutContainer}>
          <View style={[styles.bloc, styles.aboutBloc]}>
            <View style={styles.titleBloc}>
              <Feather name="info" size={22} color="#111" />
              <Text>A propos</Text>
            </View>

            <View style={styles.aboutText}>
              <Text>
                JobTrack v1.0.0{"\n\n"}
                Merci d’utiliser JobTrack{"\n\n"}
                JobTrack vous aide à suivre vos candidatures, analyser vos
                statistiques, et optimiser votre recherche d’emplois.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Navbar />
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
    paddingTop: 80,
    paddingBottom: 140,
    gap: 5,
  },

  containerProfilBloc: {
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
  },

  blocTitle: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    paddingLeft: 15,
    alignItems: "center",
    gap: 10,
  },

  Title: {
    fontSize: 30,
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
    alignItems: "center",
    paddingLeft: 15,
    flexDirection: "row",
    gap: 10,
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

  preferenceAndDataContainer: {
    width: "100%",
    minHeight: 150,
    flexDirection: "row",
    gap: 5,
    paddingLeft: 15,
    paddingRight: 20,
  },

  preferenceBloc: {
    width: "50%",
    minHeight: 50,
    gap: 20,
  },

  dataBloc: {
    width: "50%",
    minHeight: 50,
    gap: 20,
  },

  OptionLine: {
    width: "100%",
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },

  Icon: {
    marginHorizontal: 12,
  },

  FlagIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    marginHorizontal: 12,
  },

  IconData: {
    marginLeft: 20,
  },

  IconDataExport: {
    marginLeft: 40,
  },

  AboutContainer: {
    width: "100%",
    minHeight: 130,
    paddingLeft: 15,
    paddingRight: 15,
  },

  aboutBloc: {
    minHeight: 150,
  },

  aboutText: {
    padding: 10,
  },
});