import Navbar from "@/components/ui/navbar";
import Popup from "@/components/ui/popup";
import { useAlert } from "@/hooks/useAlert";
import {
  getCurrentUser,
  updateUserData,
  UserResponse,
} from "@/services/userService";
import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Setting() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [currentUser, setCurrentUser] = useState<UserResponse | null>(null);

  const {
    message,
    type,
    showPopup,
    showAlert
  } = useAlert();

  useEffect(() => {
    async function handleGetCurrentUser() {
      try {
        const user = await getCurrentUser();

        setCurrentUser(user);

        // On préremplit les inputs avec les données actuelles
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);

        console.log("Utilisateur connecté :", user);
      } catch (error) {
        console.log(
          "Erreur lors de la récupération de l'utilisateur connecté",
          error
        );
      }
    }

    handleGetCurrentUser();
  }, []);

  async function handleUpdateUser() {
    try {
      const userUpdate = await updateUserData(
        lastName,
        firstName,
        email
      );

      // On met aussi à jour l'utilisateur affiché
      setCurrentUser(userUpdate);

      console.log("Utilisateur modifié :", userUpdate);
      showAlert("Modification réussi", "success");
    } catch (error) {
      console.log(
        "Erreur lors de la modification de l'utilisateur",
        error
      );
    }
  }

  return (
    <View style={styles.page}>

      <ScrollView
        style={styles.containerSetting}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.blocTitle}>
          <Text style={styles.Title}>Paramètres</Text>

          <Ionicons
            name="settings-outline"
            size={28}
            color="#111"
          />
        </View>

        {/* PROFIL */}
        <View style={styles.containerProfilBloc}>
          <View style={[styles.profilBloc, styles.bloc]}>
            <View style={styles.titleBloc}>
              <Feather name="user" size={22} color="#111" />
              <Text>Profil</Text>
            </View>

            <View style={styles.infoProfilBloc}>
              {/* Partie gauche */}
              <View style={styles.infoProfilLeft}>
                <View style={styles.ProfilPicture}>
                  <Feather
                    name="user"
                    size={65}
                    color="#fff"
                  />
                </View>
              </View>

              {/* Partie droite */}
              <View style={styles.infoProfilRight}>
                <Text style={styles.LabelInput}>
                  Nom
                </Text>

                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  value={lastName}
                  onChangeText={setLastName}
                />

                <Text style={styles.LabelInput}>
                  Prénom
                </Text>

                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  value={firstName}
                  onChangeText={setFirstName}
                />

                <Text style={styles.LabelInput}>
                  Email
                </Text>

                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                {/* Bouton modification */}
                <Pressable
                  style={styles.updateButton}
                  onPress={handleUpdateUser}
                >
                  <Feather
                    name="save"
                    size={17}
                    color="#fff"
                  />

                  <Text style={styles.updateButtonText}>
                    Modifier
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        {/* PREFERENCES + DONNEES */}
        <View style={styles.preferenceAndDataContainer}>
          <View style={[styles.preferenceBloc, styles.bloc]}>
            <View style={styles.titleBloc}>
              <Feather
                name="sliders"
                size={22}
                color="#111"
              />

              <Text>Préférences</Text>
            </View>

            <View style={styles.OptionLine}>
              <Text>Thème :</Text>

              <Feather
                name="moon"
                size={20}
                color="#111"
                style={styles.Icon}
              />

              <Feather
                name="sun"
                size={20}
                color="#111"
                style={styles.Icon}
              />
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
              <Feather
                name="database"
                size={22}
                color="#111"
              />

              <Text>Données</Text>
            </View>

            <View style={styles.OptionLine}>
              <Text>Exporter :</Text>

              <Feather
                name="download"
                size={20}
                color="#111"
                style={styles.IconDataExport}
              />
            </View>

            <View style={styles.OptionLine}>
              <Text>Réinitialiser :</Text>

              <Feather
                name="rotate-ccw"
                size={20}
                color="#111"
                style={styles.IconData}
              />
            </View>
          </View>
        </View>

        {/* A PROPOS */}
        <View style={styles.AboutContainer}>
          <View style={[styles.bloc, styles.aboutBloc]}>
            <View style={styles.titleBloc}>
              <Feather
                name="info"
                size={22}
                color="#111"
              />

              <Text>A propos</Text>
            </View>

            <View style={styles.aboutText}>
              <Text>
                JobTrack v1.0.0{"\n\n"}
                Merci d’utiliser JobTrack{"\n\n"}
                JobTrack vous aide à suivre vos candidatures,
                analyser vos statistiques, et optimiser votre
                recherche d’emplois.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Navbar />
            {showPopup && (
        <Popup 
          message={message}
          type={type}
        />
      )}
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
    minHeight: 260,
    flexDirection: "row",
    paddingBottom: 20,
  },

  infoProfilRight: {
    width: "50%",
    gap: 5,
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
    backgroundColor: "#939090",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  LabelInput: {
    fontSize: 13,
  },

  input: {
    borderWidth: 1,
    borderColor: "#939090",
    width: 150,
    height: 32,
    paddingHorizontal: 8,
    paddingVertical: 0,
    backgroundColor: "#fff",
    borderRadius: 4,
  },

  updateButton: {
    marginTop: 10,
    width: 150,
    height: 38,
    backgroundColor: "#3373FF",
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  updateButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
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