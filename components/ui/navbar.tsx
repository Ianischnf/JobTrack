import { router } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";

export default function Navbar() {
    return (
        <View style={styles.navbar}>
            <Pressable onPress={() => router.push('/')}>
                <Image
                    source={require('../../assets/images/nav_icon_home.png')}
                    style={styles.navIcon}
                />
            </Pressable>

            <Pressable onPress={() => router.push('/candidacy')}>
                <Image
                    source={require('../../assets/images/nav_icon_candidacy.png')}
                    style={styles.navIcon}
                />
            </Pressable>

            <Pressable onPress={() => router.push('/statistics')}>
                <Image
                    source={require('../../assets/images/nav_icon_stats.png')}
                    style={styles.navIcon}
                />
            </Pressable>

            <Pressable onPress={() => router.push('/setting')}>
                <Image
                    source={require('../../assets/images/nav_icon_setting.png')}
                    style={styles.navIcon}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: '#2D73FF',
        width: '96%',
        height: '100%',
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 50
    },
    navIcon: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
    }
})