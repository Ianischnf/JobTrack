import Input from "@/components/ui/Input";
import Navbar from "@/components/ui/navbar";
import Popup from "@/components/ui/popup";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useAlert } from "@/hooks/useAlert";
import { CandidacyStatut, saveCandidacy } from "@/services/candidacyService";

export default function Candidacy() {
  const [showPicker, setShowPicker] = useState(false);

  const [status, setStatus] = useState<CandidacyStatut>(
    CandidacyStatut.ENVOYEE
  );

  const [showStatus, setShowStatus] = useState(false);
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [dateCandidacy, setDateCandidacy] = useState(new Date());

  const {
    message,
    type,
    showPopup,
    showAlert,
  } = useAlert();

  const statusOptions = [
    {
      label: "Envoyée",
      value: CandidacyStatut.ENVOYEE,
    },
    {
      label: "Entretien",
      value: CandidacyStatut.ENTRETIEN,
    },
    {
      label: "Refusée",
      value: CandidacyStatut.REFUS,
    },
  ];


  function getStatusColor(statusValue: CandidacyStatut): string {
    switch (statusValue) {
      case CandidacyStatut.ENVOYEE:
        return "#60A5FA";

      case CandidacyStatut.ENTRETIEN:
        return "#FBBF24";

      case CandidacyStatut.REFUS:
        return "#F87171";

      default:
        return "#999";
    }
  }

  function getStatusLabel(statusValue: CandidacyStatut): string {
    switch (statusValue) {
      case CandidacyStatut.ENVOYEE:
        return "Envoyée";

      case CandidacyStatut.ENTRETIEN:
        return "Entretien";

      case CandidacyStatut.REFUS:
        return "Refusée";

      default:
        return "Sélectionner un statut";
    }
  }

  async function handleSaveCandidacy() {
    const formattedDate = dateCandidacy.toISOString().split("T")[0];

    if (
      company.trim() === "" ||
      jobTitle.trim() === "" ||
      formattedDate === ""
    ) {
      showAlert("Veuillez remplir tous les champs", "error");
      return;
    }

    try {
      const data = await saveCandidacy(
        company,
        jobTitle,
        formattedDate,
        status
      );

      console.log("Candidature sauvegardée", data);

      showAlert("Candidature sauvegardée", "success");
    } catch (error) {
      console.log(error);
      showAlert("Erreur lors de l'enregistrement", "error");
    }
  }

  return (
    <View style={styles.page}>
      {showPopup && (
        <Popup
          message={message}
          type={type}
        />
      )}

      <ScrollView
        style={styles.containerCandidacy}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Ajouter une candidature
        </Text>

        <View style={styles.containerForm}>
          <Text style={styles.label}>Entreprise</Text>

          <Input
            icon={
              <Feather
                name="briefcase"
                size={22}
                color="#686868"
              />
            }
            placeholder="ex : Capgemini..."
            value={company}
            onChangeText={setCompany}
          />

          <Text style={styles.label}>Poste</Text>

          <Input
            icon={
              <Feather
                name="code"
                size={22}
                color="#686868"
              />
            }
            placeholder="ex : Développeur Full Stack..."
            value={jobTitle}
            onChangeText={setJobTitle}
          />

          <Text style={styles.label}>
            Date de la candidature
          </Text>

          <Pressable
            style={styles.dateInput}
            onPress={() => setShowPicker(true)}
          >
            <Feather
              name="calendar"
              size={20}
              color="#686868"
            />

            <Text>
              {dateCandidacy.toLocaleDateString("fr-FR")}
            </Text>
          </Pressable>

          {showPicker && (
            <DateTimePicker
              value={dateCandidacy}
              mode="date"
              display="default"
              onChange={(_, selectedDate) => {
                setShowPicker(false);

                if (selectedDate) {
                  setDateCandidacy(selectedDate);
                }
              }}
            />
          )}

          <Text style={styles.label}>Statut</Text>

          <Pressable
            style={styles.selectInput}
            onPress={() => setShowStatus(!showStatus)}
          >
            <View style={styles.statusRow}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: getStatusColor(status),
                  },
                ]}
              />

              <Text>{getStatusLabel(status)}</Text>

              <Feather
                name={
                  showStatus
                    ? "chevron-up"
                    : "chevron-down"
                }
                size={18}
                color="#686868"
                style={styles.chevron}
              />
            </View>
          </Pressable>

          {showStatus && (
            <View style={styles.dropdown}>
              {statusOptions.map((item) => (
                <Pressable
                  key={item.value}
                  style={styles.statusOption}
                  onPress={() => {
                    setStatus(item.value);
                    setShowStatus(false);
                  }}
                >
                  <View
                    style={[
                      styles.dot,
                      {
                        backgroundColor: getStatusColor(
                          item.value
                        ),
                      },
                    ]}
                  />

                  <Text>{item.label}</Text>
                </Pressable>
              ))}
            </View>
          )}

          <Pressable
            style={styles.btnSave}
            onPress={handleSaveCandidacy}
          >
            <Feather
              name="save"
              size={18}
              color="#2D73FF"
            />

            <Text style={styles.btnSaveText}>
              Enregistrer ma candidature
            </Text>
          </Pressable>
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

  scrollContent: {
    paddingTop: 100,
    paddingBottom: 140,
  },

  containerCandidacy: {
    flex: 1,
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
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
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

  chevron: {
    marginLeft: "auto",
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
    borderColor: "#DDD",
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
    flexDirection: "row",
    gap: 10,
  },

  btnSaveText: {
    color: "#2D73FF",
    fontSize: 16,
    fontWeight: "600",
  },
});