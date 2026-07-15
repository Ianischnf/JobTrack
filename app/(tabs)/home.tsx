  import Navbar from "@/components/ui/navbar";
  import StatCard from "@/components/ui/startCard";
  import { Feather } from "@expo/vector-icons";
  import { View, StyleSheet, Text } from "react-native";
  import { useEffect, useState } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";

  export default function Home() {

    const [firstName, setFirstName] = useState("");

    useEffect(() => {
      async function loadUser() {
        const firstName = await AsyncStorage.getItem("firstName");

        if(firstName) {
          setFirstName(firstName);
        }
      }

      loadUser();
    }, []);

      return (
          <View style={styles.containerHome}>
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
                  <View style={styles.subContainerLastActivity}></View>
              </View>

              <Navbar />
          </View>
      );
  }

  const styles = StyleSheet.create({
    containerHome: {
      flex: 1,
      paddingTop: 40,
      backgroundColor: "#FCFCFC",
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
      height: 150,
      alignItems: "center",
    },

    subContainerLastActivity: {
      width: "96%",
      height: "100%",
      backgroundColor: "#F0F0F0",
      borderRadius: 18,
    },
  });