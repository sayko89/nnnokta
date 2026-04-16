import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([]);
  const [inputText, setInputText] = useState('');
  const [step, setStep] = useState(0);
  const [spec, setSpec] = useState<any>(null);

  const questions = [
    "What specific problem does this idea solve?",
    "Who is the exact target user or customer?",
    "What is the MVP scope? What will we NOT build?",
    "What are the biggest technical or market constraints?"
  ];

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMsgs = [...messages, { role: 'user', text: inputText }];
    setMessages(newMsgs as {role: 'user'|'ai', text: string}[]);
    setInputText('');

    if (step < questions.length) {
      setTimeout(() => {
        setMessages([...newMsgs, { role: 'ai', text: questions[step] }]);
        setStep(step + 1);
      }, 500);
    } else {
      setTimeout(() => {
        setSpec({
          Idea: newMsgs[0].text,
          Problem: newMsgs[1]?.text || 'N/A',
          User: newMsgs[2]?.text || 'N/A',
          Scope: newMsgs[3]?.text || 'N/A',
          Constraint: newMsgs[4]?.text || 'N/A'
        });
      }, 500);
    }
  };

  const reset = () => {
    setMessages([]);
    setStep(0);
    setSpec(null);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.header}>Nokta - Track A (Dot to Spec)</Text>
      
      {!spec ? (
        <>
          <ScrollView style={styles.chatArea}>
            {messages.length === 0 && (
              <Text style={styles.placeholderText}>Enter your raw idea spark to begin...</Text>
            )}
            {messages.map((m, i) => (
              <View key={i} style={m.role === 'ai' ? styles.msgAi : styles.msgUser}>
                <Text style={m.role === 'ai' ? styles.textAi : styles.textUser}>{m.text}</Text>
              </View>
            ))}
          </ScrollView>
          
          <View style={styles.inputArea}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder={step === 0 ? "Type your idea..." : "Answer..."}
              onSubmitEditing={handleSend}
            />
            <Button title="Send" onPress={handleSend} />
          </View>
        </>
      ) : (
        <ScrollView style={styles.specArea}>
          <Text style={styles.specHeader}>Generated Spec (Page)</Text>
          <Text style={styles.specProp}>Idea: {spec.Idea}</Text>
          <Text style={styles.specProp}>Problem: {spec.Problem}</Text>
          <Text style={styles.specProp}>User: {spec.User}</Text>
          <Text style={styles.specProp}>Scope: {spec.Scope}</Text>
          <Text style={styles.specProp}>Constraints: {spec.Constraint}</Text>
          <Button title="Start Over" onPress={reset} />
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9fb', paddingTop: 60, paddingBottom: 20 },
  header: { fontSize: 24, fontWeight: '800', textAlign: 'center', marginBottom: 15, color: '#1c1c1e' },
  chatArea: { flex: 1, padding: 15 },
  placeholderText: { textAlign: 'center', color: '#8e8e93', marginTop: 30, fontStyle: 'italic' },
  msgAi: { alignSelf: 'flex-start', backgroundColor: '#e5e5ea', padding: 12, borderRadius: 18, marginVertical: 6, maxWidth: '85%' },
  msgUser: { alignSelf: 'flex-end', backgroundColor: '#007aff', padding: 12, borderRadius: 18, marginVertical: 6, maxWidth: '85%' },
  textAi: { color: '#000', fontSize: 16 },
  textUser: { color: '#fff', fontSize: 16 },
  inputArea: { flexDirection: 'row', padding: 15, borderTopWidth: 1, borderColor: '#e5e5ea', backgroundColor: '#fff', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#d1d1d6', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 10, marginRight: 10, fontSize: 16 },
  specArea: { flex: 1, padding: 25, backgroundColor: '#fff', margin: 15, borderRadius: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
  specHeader: { fontSize: 26, fontWeight: '800', marginBottom: 25, color: '#007aff' },
  specProp: { fontSize: 17, marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#f2f2f7', paddingBottom: 10, color: '#3a3a3c' }
});
