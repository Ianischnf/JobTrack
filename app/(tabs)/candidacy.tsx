import Input from "@/components/ui/Input";
import Navbar from "@/components/ui/navbar";
import { StyleSheet, Text, View } from "react-native";

export default function Candidacy() {
    return (
        <View style={styles.containerCandidacy}>
            <Text style={styles.title}>Ajouter une candidature</Text>

            <View>
                <Input
                    icon={require('../../assets/images/icon_input_business.png')}
                    placeholder="ex : Capgemini..."
                />

                <Input
                    icon={require('../../assets/images/icon_input_poste.png')}
                    placeholder="ex : Développeur Full Stack..."
                />
            </View>

            <View style={styles.containerNavbar}>
                <Navbar />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    containerCandidacy: {
        flex: 1,
        backgroundColor: '#FCFCFC',
        paddingTop: 100
    },

    title: {
        fontSize: 30,
        marginLeft: 20
    },

    containerNavbar: {
        // backgroundColor : 'red',
        width: '100%',
        height: 60,
        alignItems: 'center'
    },
})