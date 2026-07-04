import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import StartCardIcon from "../../components/ui/startCardIcon";

type StatCardProps = {
  title: string;
  value: number;
  subtitle: string;
  icon: ReactNode;
  iconBackgroundColor: string;
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconBackgroundColor,
}: StatCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.middle}>
        <StartCardIcon
          icon={icon}
          backgroundColor={iconBackgroundColor}
        />

        <View style={styles.middleValue}>
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 175,
    height: 180,
    backgroundColor: "#EAEAEA",
    borderRadius: 18,
    padding: 16,
  },

  top: {
    height: 45,
    justifyContent: "center",
  },

  middle: {
    flex: 1,
    justifyContent: "center",
    flexWrap: "wrap",
    paddingLeft: 5,
    gap: 5,
  },

  middleValue: {},

  bottom: {
    height: 35,
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#222",
    textAlign: "center",
  },

  value: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#000",
  },

  subtitle: {
    fontSize: 13,
    color: "#777",
    textAlign: "center",
  },
});