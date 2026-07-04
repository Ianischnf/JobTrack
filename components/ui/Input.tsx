import { ReactNode, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type InputProps = {
  icon: ReactNode;
  placeholder: string;
};

export default function Input({ icon, placeholder }: InputProps) {
  const [text, setText] = useState<string>("");

  return (
    <View style={styles.inputContainer}>
      {icon}

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={placeholder}
        style={styles.input}
        placeholderTextColor="#999"
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