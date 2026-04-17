import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, View as RNView, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { useNoktalar } from '../../context/NoktaContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const STEPS = [
  { id: 0, title: 'Fikir', question: 'Aklındaki nokta nedir?' },
  { id: 1, title: 'Problem', question: 'Bu fikrin çözeceği ana PROBLEM tam olarak nedir?' },
  { id: 2, title: 'Kullanıcı', question: 'Hedef KULLANICI kitlesi kim?' },
  { id: 3, title: 'Kısıtlar', question: 'Teknik KISITLARIN neler? (Bütçe, zaman, teknoloji vb.)' },
  { id: 4, title: 'Spec', question: 'Engineering Specification Hazır!' },
];

export default function NoktaCaptureScreen() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const { addNokta } = useNoktalar();

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    problem: '',
    user: '',
    constraints: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    const currentField = ['title', 'problem', 'user', 'constraints'][step];
    if (formData[currentField as keyof typeof formData].trim() === '') {
      return; // Basic validation
    }
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      generateSpec();
    }
  };

  const generateSpec = () => {
    setLoading(true);
    
    // Heuristic Logic: Check for technical/budget keywords in constraints
    const constraintKeywords = ['tl', '$', '€', 'bütçe', 'saat', 'gün', 'hafta', 'react', 'api', 'sunucu', 'database', 'maliyet', 'zaman', 'paydaş'];
    const hasTechnicalData = constraintKeywords.some(kw => formData.constraints.toLowerCase().includes(kw));
    const titleRepetition = formData.constraints.toLowerCase().includes(formData.title.toLowerCase());
    
    let warningNote = '';
    if (!hasTechnicalData || titleRepetition) {
      warningNote = '\n⚠️ UYARI: Teknik kısıtlar kısmında yetersiz veya alakasız veri girişi tespit edildi. Lütfen bütçe, zaman veya teknoloji kısıtlarını belirtin.';
    }

    // Dynamic Scoring calculation for the UI display
    const totalLength = formData.title.length + formData.problem.length + formData.user.length + formData.constraints.length;
    const computedScore = Math.min(65 + Math.floor(totalLength / 12), 98) - (warningNote ? 5 : 0);

    setTimeout(() => {
      const specReport = `BU BİR MÜHENDİSLİK SPESİFİKASYONUDUR (V1.0)\n\n` +
        `PROJE: ${formData.title.toUpperCase()}\n` +
        `PROBLEM TANIMI: ${formData.problem}\n` +
        `HEDEF KULLANICI: ${formData.user}\n` +
        `SİSTEM KISITLARI: ${formData.constraints}\n\n` +
        `ANALİZ ÖZETİ: Bu projenin problem tanımı ${formData.problem.length > 50 ? 'güçlü' : 'geliştirilmeye açık'} görünmektedir. ` +
        `Mevcut kısıtlar dahilinde fizibilite puanı %${computedScore} olarak hesaplanmıştır. ${warningNote}`;
      
      addNokta({ ...formData, specReport }, computedScore);
      setLoading(false);
      setStep(4);
    }, 2500);
  };

  const reset = () => {
    setStep(0);
    setFormData({ title: '', problem: '', user: '', constraints: '' });
  };

  const renderProgress = () => (
    <RNView style={styles.progressContainer}>
      {STEPS.map((s, i) => (
        <RNView 
          key={s.id} 
          style={[
            styles.progressDot, 
            i <= step && styles.progressDotActive,
            i === step && styles.progressDotCurrent
          ]} 
        />
      ))}
    </RNView>
  );

  return (
    <View style={styles.container}>
      <RNView style={styles.glow} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Track A</Text>
          <Text style={styles.subtitle}>{step === 4 ? 'Mission Accomplished' : 'Dot Enrich Process'}</Text>
        </View>

        {renderProgress()}

        <View style={styles.card}>
          <Text style={styles.questionText}>{STEPS[step].question}</Text>
          
          {step < 4 ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Yanıtını buraya yaz..."
                placeholderTextColor="#94A3B8"
                value={formData[['title', 'problem', 'user', 'constraints'][step] as keyof typeof formData]}
                onChangeText={(v) => updateField(['title', 'problem', 'user', 'constraints'][step], v)}
                multiline
                editable={!loading}
              />

              <TouchableOpacity 
                style={[styles.button, loading && { opacity: 0.7 }]} 
                onPress={nextStep}
                disabled={loading}
              >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>{step === 3 ? 'Spec Üret' : 'İleri'}</Text>}
              </TouchableOpacity>
            </>
          ) : (
            <RNView style={styles.resultContainer}>
              <RNView style={styles.specBox}>
                <Text style={styles.specTitle}>{formData.title}</Text>
                <Text style={styles.specBody}>Mühendislik Spesifikasyonu başarıyla oluşturuldu ve History sekmesine kaydedildi.</Text>
                <RNView style={styles.divider} />
                <Text style={styles.specSummary}>Problem: {formData.problem.substring(0, 50)}...</Text>
              </RNView>

              <TouchableOpacity style={styles.resetButton} onPress={reset}>
                <Text style={styles.resetButtonText}>Yeni Bir Nokta At</Text>
              </TouchableOpacity>
            </RNView>
          )}
        </View>

        <Text style={styles.footer}>Sudenur Yazıcı // Otonom İnovasyon Döngüsü</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  glow: {
    position: 'absolute',
    top: -50,
    width: 600,
    height: 600,
    borderRadius: 300,
    backgroundColor: Colors.nokta.neonPurple,
    opacity: 0.05,
    filter: 'blur(80px)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.nokta.neonPurple,
    textTransform: 'uppercase',
    marginTop: 8,
    fontFamily: 'SpaceMono',
  },
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    backgroundColor: 'transparent',
  },
  progressDot: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 4,
    borderRadius: 2,
  },
  progressDotActive: {
    backgroundColor: Colors.nokta.neonPurple,
  },
  progressDotCurrent: {
    shadowColor: Colors.nokta.neonPurple,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.nokta.glass,
    borderRadius: 32,
    padding: 32,
    borderWidth: 1,
    borderColor: Colors.nokta.border,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    lineHeight: 26,
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    color: '#F8FAFC',
    minHeight: 150,
    textAlignVertical: 'top',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: Colors.nokta.neonPurple,
    borderRadius: 16,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  resultContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  specBox: {
    width: '100%',
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.3)',
    marginBottom: 30,
  },
  specTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.nokta.neonPurple,
    marginBottom: 12,
  },
  specBody: {
    color: '#CBD5E1',
    lineHeight: 22,
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 16,
  },
  specSummary: {
    color: '#64748B',
    fontSize: 12,
    fontStyle: 'italic',
  },
  resetButton: {
    borderWidth: 1,
    borderColor: Colors.nokta.neonPurple,
    borderRadius: 16,
    height: 56,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    color: Colors.nokta.neonPurple,
    fontWeight: '700',
  },
  footer: {
    marginTop: 40,
    fontSize: 10,
    color: '#475569',
    fontFamily: 'SpaceMono',
  },
});
