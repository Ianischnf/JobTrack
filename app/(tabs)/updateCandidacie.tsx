import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  CandidacyResponse,
  CandidacyStatut,
  getOneCandidacy,
  updateCandidacy,
} from "@/services/candidacyService";

export default function UpdateCandidacie() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [candidacy, setCandidacy] =
    useState<CandidacyResponse | null>(null);

  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [dateCandidacy, setDateCandidacy] = useState("");
  const [status, setStatus] = useState<CandidacyStatut>(
    CandidacyStatut.ENVOYEE
  );

  const [showStatus, setShowStatus] = useState(false);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    async function fetchCandidacy() {
      if (!id) {
        console.log("Aucun ID reçu");
        setLoading(false);
        return;
      }

      const candidacyId = Number(id);

      if (Number.isNaN(candidacyId)) {
        console.log("ID invalide :", id);
        setLoading(false);
        return;
      }

      try {
        const data = await getOneCandidacy(candidacyId);

        setCandidacy(data);

        // On préremplit les champs avec les données récupérées.
        setCompany(data.company);
        setJobTitle(data.jobTitle);
        setDateCandidacy(data.dateCandidacy);
        setStatus(data.status as CandidacyStatut);

        console.log("Candidature récupérée :", data);
      } catch (error) {
        console.log(
          "Erreur lors de la récupération de la candidature :",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCandidacy();
  }, [id]);


  async function updateMyCandidacy() {
    try{
      const candidacyId = Number(id);
      const CandidacyUpdated = await updateCandidacy(candidacyId, company, jobTitle, dateCandidacy, status);
      console.log("Modif de la candidature réussi", CandidacyUpdated);

      setCandidacy(CandidacyUpdated);
    } catch(error) {
      console.log("Erreur lors de la modification de la candidature : ", error);
    }
  }

  function getStatusLabel() {
    const selectedStatus = statusOptions.find(
      (option) => option.value === status
    );

    return selectedStatus?.label ?? "Sélectionner un statut";
  }


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3373FF" />
        <Text style={styles.loadingText}>
          Chargement de la candidature...
        </Text>
      </View>
    );
  }

  if (!candidacy) {
    return (
      <View style={styles.loadingContainer}>
        <Feather name="alert-circle" size={42} color="#DC2626" />

        <Text style={styles.errorTitle}>
          Candidature introuvable
        </Text>

        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Retour</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.page}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Pressable style={styles.headerBack} onPress={() => router.back()}>
            <Feather name="arrow-left" size={23} color="#111827" />
          </Pressable>

          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Modifier la candidature</Text>

            <Text style={styles.subtitle}>
              Modifie les informations de ta candidature
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.companyIcon}>
            <Feather name="briefcase" size={24} color="#3373FF" />
          </View>

          <View style={styles.candidacyInformation}>
            <Text style={styles.currentCompany}>{candidacy.company}</Text>
            <Text style={styles.currentJob}>{candidacy.jobTitle}</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Entreprise</Text>

            <View style={styles.inputContainer}>
              <Feather name="briefcase" size={19} color="#6B7280" />

              <TextInput
                style={styles.input}
                value={company}
                onChangeText={setCompany}
                placeholder="Nom de l'entreprise"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Poste</Text>

            <View style={styles.inputContainer}>
              <Feather name="user" size={19} color="#6B7280" />

              <TextInput
                style={styles.input}
                value={jobTitle}
                onChangeText={setJobTitle}
                placeholder="Intitulé du poste"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date de candidature</Text>

            <View style={styles.inputContainer}>
              <Feather name="calendar" size={19} color="#6B7280" />

              <TextInput
                style={styles.input}
                value={dateCandidacy}
                onChangeText={setDateCandidacy}
                placeholder="AAAA-MM-JJ"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Statut</Text>

            <Pressable
              style={styles.statusSelector}
              onPress={() => setShowStatus((current) => !current)}
            >
              <View style={styles.statusSelectorLeft}>
                <Feather name="activity" size={19} color="#6B7280" />
                <Text style={styles.statusSelectorText}>
                  {getStatusLabel()}
                </Text>
              </View>

              <Feather
                name={showStatus ? "chevron-up" : "chevron-down"}
                size={21}
                color="#6B7280"
              />
            </Pressable>

            {showStatus && (
              <View style={styles.statusOptions}>
                {statusOptions.map((option) => (
                  <Pressable
                    key={option.value}
                    style={[
                      styles.statusOption,
                      status === option.value &&
                      styles.statusOptionSelected,
                    ]}
                    onPress={() => {
                      setStatus(option.value);
                      setShowStatus(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.statusOptionText,
                        status === option.value &&
                        styles.statusOptionTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>

                    {status === option.value && (
                      <Feather name="check" size={19} color="#3373FF" />
                    )}
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          <Pressable
            style={styles.updateButton}
            onPress={updateMyCandidacy}
          >
            <Feather name="save" size={20} color="#FFFFFF" />
            <Text style={styles.updateButtonText}>
              Enregistrer les modifications
            </Text>
          </Pressable>

          <Pressable
            style={styles.cancelButton}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#F7F8FC",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  headerBack: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  headerTextContainer: {
    flex: 1,
  },

  title: {
    fontSize: 23,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#E8EBF2",
  },

  companyIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#EEF4FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  candidacyInformation: {
    flex: 1,
  },

  currentCompany: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  currentJob: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },

  form: {
    gap: 19,
  },

  inputGroup: {
    position: "relative",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },

  inputContainer: {
    height: 56,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E1E5EC",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    marginLeft: 12,
  },

  statusSelector: {
    height: 56,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E1E5EC",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  statusSelectorLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  statusSelectorText: {
    fontSize: 16,
    color: "#111827",
    marginLeft: 12,
  },

  statusOptions: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E1E5EC",
    marginTop: 8,
    overflow: "hidden",
  },

  statusOption: {
    minHeight: 52,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F1F4",
  },

  statusOptionSelected: {
    backgroundColor: "#EEF4FF",
  },

  statusOptionText: {
    fontSize: 15,
    color: "#374151",
  },

  statusOptionTextSelected: {
    color: "#3373FF",
    fontWeight: "600",
  },

  updateButton: {
    height: 57,
    borderRadius: 16,
    backgroundColor: "#3373FF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  updateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10,
  },

  cancelButton: {
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },

  cancelButtonText: {
    color: "#6B7280",
    fontSize: 15,
    fontWeight: "600",
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#F7F8FC",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  loadingText: {
    fontSize: 15,
    color: "#6B7280",
    marginTop: 14,
  },

  errorTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#111827",
    marginTop: 15,
  },

  backButton: {
    backgroundColor: "#3373FF",
    borderRadius: 14,
    paddingHorizontal: 25,
    paddingVertical: 13,
    marginTop: 20,
  },

  backButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});