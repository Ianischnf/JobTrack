import { ReactNode } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type InputProps = TextInputProps & {
  icon: ReactNode;
};

export default function Input({ icon, ...props }: InputProps) {
  return (
    <View style={styles.inputContainer}>
      {icon}

      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#CEC2C2",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 52,
    backgroundColor: "#FFF",
    gap: 10,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },
});