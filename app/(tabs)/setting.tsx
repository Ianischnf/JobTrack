import Navbar from "@/components/ui/navbar";
import { ScrollView, StyleSheet, Text, View } from "react-native";


export default function Setting() {
    return (
        <View style={styles.page}>
            <ScrollView
                style={styles.containerSetting}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text>Paramètres</Text>

                <View style={styles.containerProfilBloc}>
                    <View style={styles.profilBloc}></View>
                </View>

                <Navbar />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    page: {
        flex: 1,
        backgroundColor: "#FCFCFC",
    },
    scrollContent: {
        paddingTop: 100,
        paddingBottom: 140,
    },
    containerProfilBloc : {
        // backgroundColor : 'red',
        width: '100%',
        height: 250,
        paddingLeft: 15,
        paddingRight: 15
    },

    profilBloc : {
        borderWidth : 1,
        borderColor : '#939090',
        backgroundColor : '#ffff',
        width: '100%',
        height: '100%',
        borderRadius: 5
    }
});