import { StyleSheet, Text, View } from "react-native"
import { useEffect, useState } from "react";
import { CandidacyResponse, getOneCandidacy } from "@/services/candidacyService";
import { useLocalSearchParams } from "expo-router";



export default function UpdateCandidacie() {

  const [candidacy, setCandidacy] = useState<CandidacyResponse | null>(null);
  const { id } = useLocalSearchParams();

  useEffect(() => {

    async function GetCandidacy() {

      if(!id){
        console.log("Aucun ID reçu");
        return;
      }

      const candidacyId = Number(id);

      if(Number.isNaN(candidacyId)) {
        console.log("ID invalide :", id);
        return
      }

      try {
        const data = await getOneCandidacy(Number(id));
        setCandidacy(data);
        console.log("Candidature récupérée : ", data);
      } catch (error) {
        console.log("Erreur lors de la récupérations de la candidature", error);
      }
    }

    GetCandidacy();
  }, [id]);


  return (
    <View>
      <Text>Modifier candidatures</Text>
    </View>
  );
}

const sytles = StyleSheet.create({

})