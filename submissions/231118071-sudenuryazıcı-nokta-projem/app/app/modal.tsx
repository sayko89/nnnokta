import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hakkında</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.contentCard}>
        <Text style={styles.infoTitle}>Nokta — Otonom İnovasyon</Text>
        <Text style={styles.infoText}>
          Nokta, fikirlerinizi yalnızlıktan kurtaran otonom bir kuluçka merkezidir. Girdiğiniz her 'nokta', AI ajanları tarafından pazar verileri ve mühendislik kısıtlarıyla anlık olarak çarpıştırılır.
        </Text>
        <Text style={styles.infoText}>
          Track A akışı, ham veriyi yakalar ve otonom analiz döngüsünü başlatarak saniyeler içinde teknik bir spesifikasyon (artifact) üretir.
        </Text>
      </View>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: Colors.dark.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  contentCard: {
    backgroundColor: Colors.nokta.glass,
    borderRadius: 20,
    padding: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.nokta.border,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.nokta.neonPurple,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 22,
    marginBottom: 10,
  },
});
