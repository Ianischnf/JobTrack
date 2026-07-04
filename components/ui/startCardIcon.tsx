import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type StatCardIconProps = {
  icon: ReactNode;
  backgroundColor: string;
};

export default function StartCardIcon({
  icon,
  backgroundColor,
}: StatCardIconProps) {
  return (
    <View style={[styles.middleIcon, { backgroundColor }]}>
      {icon}
    </View>
  );
}

const styles = StyleSheet.create({
  middleIcon: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});