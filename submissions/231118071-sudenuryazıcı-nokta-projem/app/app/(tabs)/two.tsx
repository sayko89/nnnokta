import { StyleSheet, FlatList, View as RNView, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNoktalar } from '../../context/NoktaContext';

export default function HistoryScreen() {
  const { noktalar } = useNoktalar();

  const renderItem = ({ item }: { item: any }) => (
    <RNView style={styles.card}>
      <RNView style={styles.cardHeader}>
        <FontAwesome name="shield" size={18} color={Colors.nokta.neonPurple} />
        <RNView style={styles.infoBadge}>
          <Text style={styles.statusText}>{item.status}</Text>
        </RNView>
      </RNView>
      
      <Text style={styles.cardTitle}>{item.title}</Text>
      
      <RNView style={styles.specContent}>
        <RNView style={styles.specItem}>
          <Text style={styles.specLabel}>PROBLEM_LOG:</Text>
          <Text style={styles.specText}>{item.problem}</Text>
        </RNView>
        
        <RNView style={styles.specItem}>
          <Text style={styles.specLabel}>USR_TARGET:</Text>
          <Text style={styles.specText}>{item.user}</Text>
        </RNView>
        
        <RNView style={styles.specItem}>
          <Text style={styles.specLabel}>SYS_CONSTRAINTS:</Text>
          <Text style={styles.specText}>{item.constraints}</Text>
        </RNView>
      </RNView>

      <RNView style={styles.footerRow}>
        <RNView style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>TRUST_INDEX:</Text>
          <Text style={styles.scoreValue}>{item.score}</Text>
        </RNView>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>FULL_REPORT_V1</Text>
        </TouchableOpacity>
      </RNView>
      
      <RNView style={[styles.progressBar, { width: `${item.score}%` }]} />
    </RNView>
  );

  return (
    <View style={styles.container}>
      <RNView style={styles.header}>
        <Text style={styles.headerTitle}>Mission_Archive</Text>
        <Text style={styles.headerSubtitle}>Sudenur Yazıcı // Otonom_Kuluçka</Text>
      </RNView>

      {noktalar.length === 0 ? (
        <RNView style={styles.emptyContainer}>
          <FontAwesome name="folder-open-o" size={40} color="rgba(255,255,255,0.1)" />
          <Text style={styles.emptyText}>Henüz bir mühendislik spesifikasyonu bulunmuyor.</Text>
        </RNView>
      ) : (
        <FlatList
          data={noktalar}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 2,
    fontFamily: 'SpaceMono',
  },
  headerSubtitle: {
    fontSize: 10,
    color: Colors.nokta.neonPurple,
    fontFamily: 'SpaceMono',
    marginTop: 5,
    textTransform: 'uppercase',
  },
  listContent: {
    paddingBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  emptyText: {
    fontSize: 12,
    color: '#475569',
    fontFamily: 'SpaceMono',
    marginTop: 15,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  card: {
    backgroundColor: Colors.nokta.glass,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.nokta.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  infoBadge: {
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 9,
    color: Colors.nokta.neonPurple,
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 20,
  },
  specContent: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  specItem: {
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  specLabel: {
    fontSize: 10,
    color: Colors.nokta.neonPurple,
    fontFamily: 'SpaceMono',
    marginBottom: 4,
  },
  specText: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 18,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 15,
  },
  scoreBox: {
    backgroundColor: 'transparent',
  },
  scoreLabel: {
    fontSize: 10,
    color: '#475569',
    fontFamily: 'SpaceMono',
  },
  scoreValue: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'SpaceMono',
    fontWeight: 'bold',
  },
  viewButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#CBD5E1',
    fontSize: 10,
    fontFamily: 'SpaceMono',
  },
  progressBar: {
    height: 3,
    backgroundColor: Colors.nokta.neonPurple,
    borderRadius: 1.5,
  },
});
