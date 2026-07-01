import Navbar from '@/components/ui/navbar';
import { StyleSheet, Text, View } from 'react-native';
import StatCard from '../../components/ui/startCard';


export default function HomeScreen() {
  return (
    <View style={styles.containerHome}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Bonjour Ianis</Text>
        <Text style={styles.subTitle}>Voici tes stats</Text>
      </View>

      <View style={styles.containerStatsCard}>
        <StatCard
          title="Candidatures envoyées"
          value={0}
          subtitle="Aucune candidature"
          icon={require('../../assets/images/icon_candidacy_send.png')}
          iconBackgroundColor="#BAD8FF"
        />

        <StatCard
          title="Réponses reçues"
          value={0}
          subtitle="0% de taux de réponses"
          icon={require('../../assets/images/icon_response.png')}
          iconBackgroundColor="#BDFFD0"
        />

        <StatCard
          title="Entretiens"
          value={0}
          subtitle="0% de taux d'entretiens"
          icon={require('../../assets/images/icon_interview.png')}
          iconBackgroundColor="#F7D5FF"
        />

        <StatCard
          title="Refus"
          value={0}
          subtitle="0% de taux de refus"
          icon={require('../../assets/images/icon_refu.png')}
          iconBackgroundColor="#FFC9C9"
        />
      </View>

      <View style={styles.containerLastActivity}>
        <View style={styles.subContainerLastActivity}></View>
      </View>

      <View style={styles.containerNavbar}>
        <Navbar/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#FCFCFC',
    gap: 10
  },

  containerTitle: {
    marginTop: 15,
  },
  title: {
    fontSize: 30,
    marginLeft: 20
  },
  subTitle: {
    fontSize: 20,
    color: '#686868',
    marginLeft: 20
  },


  containerStatsCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    width: '100%',
    marginTop: 10
  },

  containerLastActivity: {
    width: '100%',
    height: 150,
    alignItems: 'center',
  },
  subContainerLastActivity: {
    width: '96%',
    height: '100%',
    backgroundColor: '#F0F0F0',
    borderRadius: 18
  },

  containerNavbar: {
    // backgroundColor : 'red',
    width: '100%',
    height: 60,
    alignItems: 'center'
  },
});