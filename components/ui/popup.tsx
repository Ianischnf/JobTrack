import { View , Text, StyleSheet} from "react-native";

type PopupProps = {
    message : string;
    type : "success" | "error";
}

export default function Popup({message, type} : PopupProps){
    return (
        <View
            style={[
                styles.popup,
                {
                    backgroundColor:
                        type === "success" ? "#4CAF50" : "#F44336",
                },
            ]}
        >
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    popup: {
        width: "90%",
        minHeight: 55,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        position: "absolute",
        top: 50,
        zIndex: 100,
        elevation: 5,
    },

    popupSuccess: {
        backgroundColor: "#4CAF50",
    },

    popupError: {
        backgroundColor: "#F44336",
    },

    text: {
        color: "#FFF",
        fontSize: 15,
        fontWeight: "600",
        textAlign: "center",
    },
});