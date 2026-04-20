import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import ExampleIdeaCard from "../components/ExampleIdeaCard";
import PrimaryButton from "../components/PrimaryButton";
import SectionCard from "../components/SectionCard";
import TextAreaField from "../components/TextAreaField";
import { colors, spacing } from "../constants/theme";

const EXAMPLE_IDEA =
  "Kampüste öğrencilerin boş sınıf bulmasını kolaylaştıran ve uygun saatleri gösteren mobil uygulama";

export default function HomeScreen({ initialIdea, onStart }) {
  const [idea, setIdea] = useState(initialIdea || "");
  const [error, setError] = useState("");

  const handleIdeaChange = (value) => {
    setIdea(value);

    if (error) {
      setError("");
    }
  };

  const handleUseExample = (value) => {
    setIdea(value);
    setError("");
  };

  const handleContinue = () => {
    const trimmed = idea.trim();

    if (!trimmed) {
      setError("Devam etmek için önce ham fikrini yaz.");
      return;
    }

    if (trimmed.length < 10) {
      setError("Fikri biraz daha aç. Bir iki kelimeden fazlası yeterli.");
      return;
    }

    setError("");
    onStart(trimmed);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>Track A teslimi</Text>
          <Text style={styles.title}>Nokta Capture</Text>
          <Text style={styles.subtitle}>
            Ham ürün fikrini kısa bir metin olarak yaz. Uygulama sonraki adımda 4 takip sorusu
            sorarak bunu daha okunabilir bir ürün özetine dönüştürecek.
          </Text>
        </View>

        <SectionCard>
          <TextAreaField
            label="Ham fikir"
            value={idea}
            onChangeText={handleIdeaChange}
            placeholder="Örnek: öğrenciler için ortak ders çalışma planlama uygulaması"
            error={error}
            hint="Ne kadar net yazarsan, çıktı o kadar kullanışlı olur."
            minHeight={150}
          />

          <ExampleIdeaCard
            title="Hızlı başlangıç"
            description="Örnek bir fikirle akışı hemen deneyebilirsin."
            exampleText={EXAMPLE_IDEA}
            onPress={handleUseExample}
          />

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Bu adımda ne oluyor?</Text>
            <Text style={styles.infoText}>
              Önce fikir yakalanıyor. Devam ettiğinde uygulama problem, kullanıcı, kapsam ve risk
              başlıklarında 4 kısa soru soruyor.
            </Text>
          </View>

          <PrimaryButton title="Devam Et" onPress={handleContinue} />
        </SectionCard>

        <SectionCard style={styles.noteCard}>
          <Text style={styles.noteTitle}>Küçük ama net bir prototip</Text>
          <Text style={styles.noteText}>
            Bu uygulama Nokta vizyonunun tamamını değil, challenge için en gösterilebilir dilimini
            odağa alıyor: fikir girişi, soru akışı ve tek sayfalık özet.
          </Text>
        </SectionCard>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxl
  },
  hero: {
    paddingTop: spacing.md,
    gap: spacing.sm
  },
  eyebrow: {
    alignSelf: "flex-start",
    fontSize: 12,
    fontWeight: "800",
    color: colors.primary,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999
  },
  title: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "800",
    color: colors.text
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 25,
    color: colors.textMuted
  },
  infoBox: {
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    backgroundColor: colors.surfaceStrong,
    borderRadius: 14,
    padding: spacing.md
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 6
  },
  infoText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textMuted
  },
  noteCard: {
    backgroundColor: colors.surfaceAlt
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 6
  },
  noteText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textMuted
  }
});
