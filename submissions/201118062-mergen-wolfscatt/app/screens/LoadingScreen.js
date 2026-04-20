import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import SectionCard from "../components/SectionCard";
import { colors, spacing } from "../constants/theme";

function SkeletonLine({ width }) {
  return <View style={[styles.skeletonLine, { width }]} />;
}

export default function LoadingScreen({ idea }) {
  return (
    <View style={styles.container}>
      <SectionCard style={styles.card}>
        <View style={styles.iconWrap}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>

        <Text style={styles.title}>Özet hazırlanıyor</Text>
        <Text style={styles.text}>
          "{idea}" fikri için cevaplar birleştiriliyor. Birkaç saniye içinde tek sayfalık sonuç
          ekrana gelecek.
        </Text>

        <View style={styles.preview}>
          <Text style={styles.previewLabel}>Hazırlanan bölümler</Text>
          <SkeletonLine width="88%" />
          <SkeletonLine width="72%" />
          <SkeletonLine width="94%" />
          <SkeletonLine width="68%" />
        </View>
      </SectionCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: "center"
  },
  card: {
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.xxl
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 23,
    color: colors.textMuted,
    maxWidth: 320
  },
  preview: {
    width: "100%",
    marginTop: spacing.sm,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 18,
    padding: spacing.md,
    gap: spacing.sm
  },
  previewLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.textMuted,
    marginBottom: 2
  },
  skeletonLine: {
    height: 12,
    borderRadius: 999,
    backgroundColor: colors.primarySoft
  }
});
