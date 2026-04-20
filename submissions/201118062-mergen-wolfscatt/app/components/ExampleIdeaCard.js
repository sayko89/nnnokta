import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing, typography } from "../constants/theme";

export default function ExampleIdeaCard({ title, description, exampleText, onPress }) {
  return (
    <Pressable
      onPress={() => onPress(exampleText)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Örnek fikir</Text>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.exampleText}>{exampleText}</Text>
      <Text style={styles.hint}>Dokununca metni otomatik olarak doldurur</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceTint,
    borderWidth: 1,
    borderColor: colors.primarySoft
  },
  cardPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.995 }]
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.surface
  },
  badgeText: {
    ...typography.caption,
    color: colors.primary
  },
  title: {
    ...typography.titleSm,
    color: colors.text,
    marginTop: spacing.sm,
    marginBottom: spacing.xs
  },
  description: {
    ...typography.bodySm,
    color: colors.textMuted,
    marginBottom: spacing.sm
  },
  exampleText: {
    ...typography.bodyMd,
    color: colors.text
  },
  hint: {
    marginTop: spacing.sm,
    ...typography.caption,
    color: colors.primary
  }
});
