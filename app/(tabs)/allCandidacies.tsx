import CandidacyCard from "@/components/ui/candidacy-card";
import Navbar from "@/components/ui/navbar";
import { CandidacyResponse, getAllCandidacy } from "@/services/candidacyService";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function allCandidacies() {
    const [candidacies, setCandidacies] = useState<CandidacyResponse[]>([]);


    useEffect(() => {
        async function handleGetAllCandidacy() {
            try {
                const data = await getAllCandidacy();

                setCandidacies(data);
            } catch (error) {
                console.log("Erreur lors de la récupération des candidatures", error);
            }
        }

        handleGetAllCandidacy();
    }, []);


    return (
        <View style={styles.containerAllCandidacies}>
            <Text style={styles.title}>Mes candidatures</Text>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.subContainerLastActivity}>
                    {candidacies.map((candidacy) => (
                        <CandidacyCard
                            key={candidacy.id}
                            company={candidacy.company}
                            jobTitle={candidacy.jobTitle}
                            dateCandidacy={candidacy.dateCandidacy}
                            status={candidacy.status}
                        />
                    ))}
                </View>
            </ScrollView>

            <Navbar />
        </View>
    );
}

const styles = StyleSheet.create({

    subContainerLastActivity: {
        width: "100%",
        backgroundColor: "#F0F0F0",
        borderRadius: 18,
        paddingLeft: 10,
        paddingRight: 10
    },

    scrollContent: {
        paddingTop: 40,
        paddingHorizontal: 10,
        paddingBottom: 150, // laisse la place à la navbar
    },

   title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#444",
    marginLeft: 24,
    marginBottom: 16,
    marginTop : 60
  },
    containerAllCandidacies: {
        flex: 1,
        backgroundColor: "#FCFCFC"
    },

})

