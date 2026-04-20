import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ExampleIdeaCard from "../components/ExampleIdeaCard";
import PrimaryButton from "../components/PrimaryButton";
import ScreenContainer from "../components/ScreenContainer";
import SectionCard from "../components/SectionCard";
import SectionTitle from "../components/SectionTitle";
import TextAreaField from "../components/TextAreaField";
import { colors, radius, spacing, typography } from "../constants/theme";

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
    <ScreenContainer scroll contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Track A teslimi</Text>
        </View>

        <SectionTitle
          title="Nokta Capture"
          description="Ham ürün fikrini kısa bir metin olarak yaz. Uygulama sonraki adımda 4 takip sorusu sorarak bunu daha okunabilir bir ürün özetine dönüştürecek."
        />
      </View>

      <SectionCard style={styles.mainCard}>
        <SectionTitle
          eyebrow="Adım 1"
          title="Ham fikri yakala"
          description="Net bir başlangıç yazman, sonraki soruları ve özeti daha güçlü hale getirir."
        />

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

      <SectionCard tone="muted">
        <Text style={styles.noteTitle}>Küçük ama net bir prototip</Text>
        <Text style={styles.noteText}>
          Bu uygulama Nokta vizyonunun tamamını değil, challenge için en gösterilebilir dilimini
          odağa alıyor: fikir girişi, soru akışı ve tek sayfalık özet.
        </Text>
      </SectionCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl
  },
  hero: {
    gap: spacing.md,
    paddingTop: spacing.xs
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft
  },
  badgeText: {
    ...typography.caption,
    color: colors.primary
  },
  mainCard: {
    gap: spacing.lg
  },
  infoBox: {
    backgroundColor: colors.surfaceTint,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.primarySoft
  },
  infoTitle: {
    ...typography.label,
    color: colors.text,
    marginBottom: spacing.xs
  },
  infoText: {
    ...typography.bodySm,
    color: colors.textMuted
  },
  noteTitle: {
    ...typography.titleSm,
    color: colors.text,
    marginBottom: spacing.xs
  },
  noteText: {
    ...typography.bodySm,
    color: colors.textMuted
  }
});
