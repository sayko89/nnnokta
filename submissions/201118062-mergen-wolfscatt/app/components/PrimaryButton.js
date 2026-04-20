import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "../constants/theme";

export default function PrimaryButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false
}) {
  const isGhost = variant === "ghost";

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        isGhost ? styles.ghostButton : styles.primaryButton,
        pressed && !disabled && !loading && (isGhost ? styles.ghostPressed : styles.primaryPressed),
        (disabled || loading) && styles.disabledButton
      ]}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color={isGhost ? colors.primary : "#FFFFFF"} />
        ) : (
          <Text style={[styles.text, isGhost ? styles.ghostText : styles.primaryText]}>{title}</Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    justifyContent: "center"
  },
  content: {
    alignItems: "center",
    justifyContent: "center"
  },
  primaryButton: {
    backgroundColor: colors.primary,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 18,
    elevation: 2
  },
  primaryPressed: {
    backgroundColor: colors.primaryPressed,
    transform: [{ scale: 0.99 }]
  },
  ghostButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong
  },
  ghostPressed: {
    backgroundColor: colors.surfaceAlt,
    transform: [{ scale: 0.99 }]
  },
  disabledButton: {
    opacity: 0.55
  },
  text: {
    fontSize: 16,
    fontWeight: "800"
  },
  primaryText: {
    color: "#FFFFFF"
  },
  ghostText: {
    color: colors.primary
  }
});
