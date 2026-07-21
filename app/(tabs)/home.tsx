import CandidacyCard from "@/components/ui/candidacy-card";
import Navbar from "@/components/ui/navbar";
import StatCard from "@/components/ui/startCard";
import { CandidacyResponse, CandidacyStatut, getAllCandidacy } from "@/services/candidacyService";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Candidacy from "./candidacy";

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
        // console.log("Candidatures récupérées : ", data);

        setCandidacies(data);
      } catch (error) {
        console.log("Erreur lors de la récupérations des candidatures", error);
      }
    }


    //   function StatsCandidaciesSend() {
    //     return candidacies.filter(
    //       (candidacy) => candidacy.status === CandidacyStatut.ENVOYEE
    //     ).length;
    // }


    loadUser();
    handleGetAllCandidacy();
  }, []);


  const sentCandidacies = candidacies.reduce((acc, candidacySend) => {
    console.log("Candidatures envoyées : ", acc);
    return candidacySend.status === CandidacyStatut.ENVOYEE ? acc + 1 : acc;
  }, 0);

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
            value={sentCandidacies}
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
          <View style={styles.containerLastActivityTitle}>
            <Text style={styles.lastActivityTitle}>
              Dernières candidatures
            </Text>

            <Text
              onPress={() => router.replace("/allCandidacies")}
              style={styles.seeAll}
            >Voir tous</Text>
          </View>

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
    fontSize: 24,
    fontWeight: "700",
    color: "#444",
    marginLeft: 24,
  },

  subTitle: {
    fontSize: 20,
    color: "#686868",
    marginLeft: 25,
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

  containerLastActivityTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },

  lastActivityTitle: {
    fontSize: 18,
    fontWeight: "600",
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

  seeAll: {
    textDecorationLine: "underline"
  }

});