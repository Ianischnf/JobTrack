import Navbar from "@/components/ui/navbar";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { CandidacyResponse, getAllCandidacy } from "@/services/candidacyService";
import { useEffect, useState } from "react";



export default function Statistics() {

  const screenWidth = Dimensions.get("window").width;
  const [candidacies, setCandidacies] = useState<CandidacyResponse[]>([]);
  const chartWidth = screenWidth - 64;

  useEffect(() => {
    async function handleGetAllCandidacy() {
      try {
        const getCandidacies = await getAllCandidacy();
        setCandidacies(getCandidacies);
        console.log("candidatures : ", candidacies);
      } catch (error) {
        console.log("Erreur pour la récupération des candidatures", error);
      }
    }
    handleGetAllCandidacy()
  }, [])


  //Récupération des plateformes
  // const Plateforms = candidacies.map((candidacy) => candidacy.webSite);
  
  const Plateforms = candidacies.reduce((acc, currentPlateform) => {
      if(acc[currentPlateform.webSite]){
        acc[currentPlateform.webSite]++;
      } else {
        acc[currentPlateform.webSite] = 1; 
      }

      return acc;
      
  },{} as Record<string,number>)

  const barData = {
    labels: Object.keys(Plateforms),
    datasets: [
      {
        data: Object.values(Plateforms),
      },
    ],
  };

  const pieData = [
    {
      name: "Entretien",
      population: 50,
      color: "#3B82F6",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "En attente",
      population: 15,
      color: "#F472B6",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "Refus",
      population: 35,
      color: "#A855F7",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(30, 41, 59, ${opacity})`,
    barPercentage: 0.7,
    propsForBackgroundLines: {
      strokeDasharray: "",
      stroke: "#E5E7EB",
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Candidatures</Text>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subtitle}>Mes statistiques</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Réponses par plateforme</Text>

          <Text style={styles.number}>30</Text>
          <Text style={styles.label}>candidatures</Text>

          <BarChart
            data={barData}
            width={chartWidth}
            height={200}
            yAxisSuffix="%"
            yAxisLabel=""
            chartConfig={chartConfig}
            fromZero
            showValuesOnTopOfBars={false}
            style={styles.chart}
          />

          <View style={styles.legend}>
            <View style={styles.legendDot} />
            <Text style={styles.legendText}>Plateforme</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Status des réponses</Text>

          <Text style={styles.number}>5</Text>
          <Text style={styles.label}>candidatures</Text>

          <PieChart
            data={pieData}
            width={chartWidth}
            height={180}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="10"
            absolute={false}
          />
        </View>
      </ScrollView>

      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingTop: 50,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#444",
    marginLeft: 24,
    marginBottom: 16,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },

  number: {
    fontSize: 32,
    fontWeight: "700",
    color: "#2563EB",
  },

  label: {
    fontSize: 14,
    color: "#111827",
    marginBottom: 8,
  },

  chart: {
    marginTop: 8,
    borderRadius: 12,
    marginLeft: -12,
  },

  legend: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3B82F6",
    marginRight: 6,
  },

  legendText: {
    fontSize: 12,
    color: "#374151",
  },
});