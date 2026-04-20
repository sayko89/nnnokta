import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, radius, spacing, typography } from "../constants/theme";

export default function TextAreaField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  hint,
  minHeight = 120
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <TextInput
        multiline
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSoft}
        style={[
          styles.input,
          { minHeight },
          isFocused && styles.inputFocused,
          error ? styles.inputError : null
        ]}
        textAlignVertical="top"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : hint ? (
        <Text style={styles.hintText}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    ...typography.label,
    color: colors.text,
    marginBottom: spacing.xs
  },
  input: {
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    ...typography.bodyMd,
    color: colors.text
  },
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.surface
  },
  inputError: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerSoft
  },
  errorText: {
    marginTop: spacing.xs,
    ...typography.caption,
    color: colors.danger
  },
  hintText: {
    marginTop: spacing.xs,
    ...typography.caption,
    color: colors.textSoft,
    fontWeight: "600"
  }
});
