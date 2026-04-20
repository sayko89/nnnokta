import React from "react";
import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import ScreenContainer from "../components/ScreenContainer";
import SecondaryButton from "../components/SecondaryButton";
import SectionCard from "../components/SectionCard";
import SectionTitle from "../components/SectionTitle";
import { colors, spacing, typography } from "../constants/theme";

function BulletList({ items }) {
  return (
    <View style={styles.list}>
      {items.map((item, index) => (
        <View key={`${item}-${index}`} style={styles.listItem}>
          <View style={styles.bullet} />
          <Text style={styles.listText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function SpecSection({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function ResultScreen({ spec, onRestart, onBackToQuestions }) {
  if (!spec) {
    return (
      <ScreenContainer centered contentContainerStyle={styles.emptyContainer}>
        <SectionCard style={styles.emptyCard}>
          <SectionTitle
            align="center"
            title="Henüz sonuç oluşmadı"
            description="Önce fikir girişini ve soru akışının tamamını bitirdiğinde burada bir ürün özeti göreceksin."
          />
          <PrimaryButton title="Başa Dön" onPress={onRestart} />
        </SectionCard>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scroll contentContainerStyle={styles.content}>
      <SectionTitle
        eyebrow="Nokta Capture sonucu"
        title="Tek sayfalık ürün özeti"
        description="Fikir ve cevaplarından üretilen bu özet, MVP kapsamını daha net görmen için hazırlandı."
      />

      <SectionCard tone="tint">
        <Text style={styles.highlightLabel}>Hazır özet</Text>
        <Text style={styles.highlightText}>{spec.ideaSummary}</Text>
      </SectionCard>

      <SectionCard style={styles.resultCard}>
        <SpecSection title="Fikir özeti">
          <Text style={styles.bodyText}>{spec.ideaSummary}</Text>
        </SpecSection>

        <SpecSection title="Problem">
          <Text style={styles.bodyText}>{spec.problem}</Text>
        </SpecSection>

        <SpecSection title="Hedef kullanıcı">
          <Text style={styles.bodyText}>{spec.targetUser}</Text>
        </SpecSection>

        <SpecSection title="MVP kapsamı">
          <BulletList items={spec.mvpItems} />
        </SpecSection>

        <SpecSection title="Kısıt / risk">
          <Text style={styles.bodyText}>{spec.constraints}</Text>
        </SpecSection>

        <SpecSection title="Önerilen ilk adım">
          <Text style={styles.bodyText}>{spec.firstStep}</Text>
        </SpecSection>
      </SectionCard>

      <View style={styles.buttonGroup}>
        <PrimaryButton title="Yeniden Başlat" onPress={onRestart} />
        <SecondaryButton title="Cevapları Düzenle" onPress={onBackToQuestions} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl
  },
  highlightLabel: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.sm
  },
  highlightText: {
    ...typography.bodyLg,
    color: colors.text
  },
  resultCard: {
    gap: spacing.xs
  },
  section: {
    marginBottom: spacing.lg
  },
  sectionTitle: {
    ...typography.label,
    color: colors.text,
    marginBottom: spacing.xs
  },
  bodyText: {
    ...typography.bodyMd,
    color: colors.textMuted
  },
  list: {
    gap: spacing.sm
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.accent,
    marginTop: 7
  },
  listText: {
    flex: 1,
    ...typography.bodyMd,
    color: colors.textMuted
  },
  buttonGroup: {
    gap: spacing.sm
  },
  emptyContainer: {
    justifyContent: "center"
  },
  emptyCard: {
    gap: spacing.lg
  }
});
