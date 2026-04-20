import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, radius, spacing } from "../constants/theme";

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
        <View style={styles.feedbackRow}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : hint ? (
        <Text style={styles.hintText}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xs
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 16,
    lineHeight: 23,
    color: colors.text
  },
  inputFocused: {
    borderColor: colors.primary,
    backgroundColor: "#FBFDFF"
  },
  inputError: {
    borderColor: colors.danger,
    backgroundColor: colors.dangerSoft
  },
  feedbackRow: {
    marginTop: spacing.xs
  },
  errorText: {
    color: colors.danger,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600"
  },
  hintText: {
    marginTop: spacing.xs,
    color: colors.textSoft,
    fontSize: 13,
    lineHeight: 18
  }
});
