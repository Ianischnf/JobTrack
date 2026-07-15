import Input from "@/components/ui/Input";
import Navbar from "@/components/ui/navbar";
import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { saveCandidacy } from "../services/candidacyService";
import { useAlert } from "../hooks/useAlert";
import Popup from "@/components/ui/popup";

export default function Candidacy() {

  const [showPicker, setShowPicker]       = useState(false);
  const [status, setStatus]               = useState("Envoyée");
  const [showStatus, setShowStatus]       = useState(false);
  const [company, setCompany]             = useState("");
  const [jobTitle, setJobTitle]           = useState("");
  const [dateCandidacy, setdateCandidacy] = useState(new Date());

    const {
          message,
          type,
          showPopup,
          showAlert,
      } = useAlert();

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

  async function Candidacy() {
      try{

        const formattedDate = dateCandidacy.toISOString().split("T")[0];
        const data = await saveCandidacy(company, jobTitle, formattedDate, status);

        console.log("Candidature sauvegarder", data);
        
        showAlert("Candidature sauvegardée", "success");
      } catch(error) {
        console.log(error);
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
        <Text style={styles.title}>Ajouter une candidature</Text>

        <View style={styles.containerForm}>
          <Text style={styles.label}>Entreprise</Text>
          <Input
            icon={<Feather name="briefcase" size={22} color="#686868" />}
            placeholder="ex : Capgemini..."
            value={company}
            onChangeText={setCompany}
          />

          <Text style={styles.label}>Poste</Text>
          <Input
            icon={<Feather name="code" size={22} color="#686868" />}
            placeholder="ex : Développeur Full Stack..."
            value={jobTitle}
            onChangeText={setJobTitle}

          />

          <Text style={styles.label}>Date de la candidature</Text>
          <Pressable
            style={styles.dateInput}
            onPress={() => setShowPicker(true)}
          >
            <Feather name="calendar" size={20} color="#686868" />
            <Text>{dateCandidacy.toLocaleDateString()}</Text>
          </Pressable>

          {showPicker && (
            <DateTimePicker
              value={dateCandidacy}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowPicker(false);

                if (selectedDate) {
                  setdateCandidacy(selectedDate);
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

              <Feather
                name={showStatus ? "chevron-up" : "chevron-down"}
                size={18}
                color="#686868"
                style={styles.chevron}
              />
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

          <Pressable style={styles.btnSave} onPress={() => Candidacy()}>
            <Feather name="save" size={18} color="#2D73FF" />
            <Text style={styles.btnSaveText}>Enregistrer ma candidature</Text>
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
    flexDirection: "row",
    gap: 10,
  },

  btnSaveText: {
    color: "#2D73FF",
    fontSize: 16,
    fontWeight: "600",
  },
});