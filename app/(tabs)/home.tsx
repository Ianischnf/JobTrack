import CandidacyCard from "@/components/ui/candidacy-card";
import Navbar from "@/components/ui/navbar";
import StatCard from "@/components/ui/startCard";
import { CandidacyResponse, getAllCandidacy } from "@/services/candidacyService";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Home() {

  const [firstName, setFirstName] = useState("");
  const [candidacies, setCandidacies] = useState<CandidacyResponse[]>([]);

  useEffect(() => {
    async function loadUser() {
      const firstName = await AsyncStorage.getItem("firstName");

      if (firstName) {
        setFirstName(firstName);
      }
    }

    async function handleGetAllCandidacy() {
      try {
        const data = await getAllCandidacy();
        console.log("Candidatures récupérées : ", data);

        setCandidacies(data);
      } catch (error) {
        console.log("Erreur lors de la récupérations des candidatures", error);
      }
    }

    loadUser();
    handleGetAllCandidacy();

  }, []);

  return (
    <View style={styles.containerHome}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Bonjour {firstName}</Text>
          <Text style={styles.subTitle}>Voici tes stats</Text>
        </View>

        <View style={styles.containerStatsCard}>
          <StatCard
            title="Candidatures envoyées"
            value={0}
            subtitle="Aucune candidature"
            icon={<Feather name="send" size={22} color="#2D73FF" />}
            iconBackgroundColor="#BAD8FF"
          />

          <StatCard
            title="Réponses reçues"
            value={0}
            subtitle="0% de taux de réponses"
            icon={<Feather name="mail" size={22} color="#22C55E" />}
            iconBackgroundColor="#BDFFD0"
          />

          <StatCard
            title="Entretiens"
            value={0}
            subtitle="0% de taux d'entretiens"
            icon={<Feather name="users" size={22} color="#A855F7" />}
            iconBackgroundColor="#F7D5FF"
          />

          <StatCard
            title="Refus"
            value={0}
            subtitle="0% de taux de refus"
            icon={<Feather name="x-circle" size={22} color="#EF4444" />}
            iconBackgroundColor="#FFC9C9"
          />
        </View>

        <View style={styles.containerLastActivity}>
          <Text style={styles.lastActivityTitle}>
            Dernières candidatures
          </Text>

          <View style={styles.subContainerLastActivity}>
            {candidacies.slice(0, 3).map((candidacy) => (
              <CandidacyCard
                key={candidacy.id}
                company={candidacy.company}
                jobTitle={candidacy.jobTitle}
                dateCandidacy={candidacy.dateCandidacy}
                status={candidacy.status}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    backgroundColor: "#FCFCFC",
  },

  scrollContent: {
    paddingTop: 40,
    paddingBottom: 110,
    gap: 10,
  },

  containerTitle: {
    marginTop: 15,
  },

  title: {
    fontSize: 30,
    marginLeft: 20,
  },

  subTitle: {
    fontSize: 20,
    color: "#686868",
    marginLeft: 20,
  },

  containerStatsCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
  },

  containerLastActivity: {
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 10,
     marginBottom: 40,
  },

  lastActivityTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    marginLeft: 5,
  },

  subContainerLastActivity: {
    width: "100%",
    height: 300,          // hauteur fixe
    backgroundColor: "#F0F0F0",
    borderRadius: 18,
    paddingLeft: 10,
    paddingRight: 10
  },

  candidaciesContainer: {
    gap: 10,
    paddingBottom: 10,
  }, 

});