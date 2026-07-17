import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type CandidacyCardProps = {
  company: string;
  jobTitle: string;
  dateCandidacy: string;
  status: string;
};

export default function CandidacyCard({
  company,
  jobTitle,
  dateCandidacy,
  status,
}: CandidacyCardProps) {
  function getStatusStyle() {
    switch (status) {
      case "ENTRETIEN":
        return styles.statusInterview;

      case "ACCEPTEE":
        return styles.statusAccepted;

      case "REFUSEE":
        return styles.statusRefused;

      default:
        return styles.statusSent;
    }
  }

  function getStatusLabel() {
    switch (status) {
      case "ENTRETIEN":
        return "Entretien";

      case "REFUSEE":
        return "Refusée";

      default:
        return "Envoyée";
    }
  }

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Feather name="briefcase" size={22} color="#3373FF" />
      </View>

      <View style={styles.informationContainer}>
        <Text style={styles.company} numberOfLines={1}>
          {company}
        </Text>

        <Text style={styles.jobTitle} numberOfLines={1}>
          {jobTitle}
        </Text>

        <Text style={styles.date}>{dateCandidacy}</Text>
      </View>

      <View style={[styles.status, getStatusStyle()]}>
        <Text style={styles.statusText}>{getStatusLabel()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    minHeight: 85,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 10,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#EAF1FF",
    justifyContent: "center",
    alignItems: "center",
  },

  informationContainer: {
    flex: 1,
  },

  company: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D1D1D",
  },

  jobTitle: {
    fontSize: 14,
    color: "#686868",
    marginTop: 2,
  },

  date: {
    fontSize: 12,
    color: "#9A9A9A",
    marginTop: 5,
  },

  status: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusSent: {
    backgroundColor: "#EAF1FF",
  },

  statusInterview: {
    backgroundColor: "#F3E8FF",
  },

  statusAccepted: {
    backgroundColor: "#DCFCE7",
  },

  statusRefused: {
    backgroundColor: "#FEE2E2",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333333",
  },
});