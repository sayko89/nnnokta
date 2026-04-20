import React from "react";
import { StyleSheet, View } from "react-native";
import { colors, spacing } from "../constants/theme";

export default function ProgressDots({ total, currentIndex }) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, index) => {
        const active = index === currentIndex;
        const completed = index < currentIndex;

        return (
          <View
            key={index}
            style={[styles.dot, completed && styles.completedDot, active && styles.activeDot]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.xs
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.border
  },
  completedDot: {
    backgroundColor: colors.primarySoft
  },
  activeDot: {
    width: 28,
    backgroundColor: colors.primary
  }
});
