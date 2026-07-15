import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export default function Navbar() {
  return (
    <View style={styles.containerNavbar}>
      <View style={styles.navbar}>
        <Pressable onPress={() => router.push("/home")}>
          <Feather name="home" size={26} color="white" />
        </Pressable>

        <Pressable onPress={() => router.push("/candidacy")}>
          <Feather name="briefcase" size={26} color="white" />
        </Pressable>

        <Pressable onPress={() => router.push("/statistics")}>
          <Feather name="bar-chart-2" size={26} color="white" />
        </Pressable>

        <Pressable onPress={() => router.push("/setting")}>
          <Feather name="settings" size={26} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerNavbar: {
    position: "absolute",
    bottom: 55,
    left: 0,
    width: "100%",
    alignItems: "center",
  },

  navbar: {
    backgroundColor: "#2D73FF",
    width: "96%",
    height: 60,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
  },
});