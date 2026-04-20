import React, { useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import ProgressDots from "../components/ProgressDots";
import SectionCard from "../components/SectionCard";
import TextAreaField from "../components/TextAreaField";
import { colors, spacing } from "../constants/theme";

export default function QuestionsScreen({
  idea,
  questions,
  answers,
  currentIndex,
  onAnswerChange,
  onBack,
  onNext
}) {
  const [error, setError] = useState("");
  const currentQuestion = questions[currentIndex];
  const currentValue = answers[currentQuestion.id] || "";
  const isLastQuestion = currentIndex === questions.length - 1;
  const progressText = `${currentIndex + 1}/${questions.length}`;

  const helperText = useMemo(() => {
    if (currentQuestion.id === "problem") {
      return "Kullanıcının bugün yaşadığı net sorunu tarif etmeye çalış.";
    }

    if (currentQuestion.id === "user") {
      return "Tek bir ana kullanıcı grubuna odaklanmak sonucu daha güçlü yapar.";
    }

    if (currentQuestion.id === "scope") {
      return "Tüm ürünü değil, ilk sürümde vazgeçilmez olan parçayı yaz.";
    }

    return "Seni en çok zorlayacak şeyi yazman yeterli.";
  }, [currentQuestion.id]);

  const handleAnswerChange = (value) => {
    onAnswerChange(currentQuestion.id, value);

    if (error) {
      setError("");
    }
  };

  const handleNext = () => {
    if (!currentValue.trim()) {
      setError("Devam etmek için bu soruya bir cevap yaz.");
      return;
    }

    setError("");
    onNext();
  };

  const handlePrevious = () => {
    setError("");
    onBack();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.caption}>Takip soruları</Text>
          <Text style={styles.ideaText}>{idea}</Text>
          <Text style={styles.headerText}>Kısa cevaplar yeterli. Amaç fikri netleştirmek.</Text>
        </View>

        <SectionCard>
          <View style={styles.topRow}>
            <ProgressDots total={questions.length} currentIndex={currentIndex} />
            <Text style={styles.progressText}>{progressText}</Text>
          </View>

          <Text style={styles.questionTitle}>{currentQuestion.title}</Text>

          <TextAreaField
            value={currentValue}
            onChangeText={handleAnswerChange}
            placeholder={currentQuestion.placeholder}
            error={error}
            hint={helperText}
            minHeight={150}
          />

          <View style={styles.buttonRow}>
            <View style={styles.buttonItem}>
              <PrimaryButton
                title={currentIndex === 0 ? "Fikre Dön" : "Geri"}
                variant="ghost"
                onPress={handlePrevious}
              />
            </View>

            <View style={styles.buttonItem}>
              <PrimaryButton
                title={isLastQuestion ? "Özeti Oluştur" : "İleri"}
                onPress={handleNext}
              />
            </View>
          </View>
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
  header: {
    gap: spacing.xs
  },
  caption: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.primary
  },
  ideaText: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "800",
    color: colors.text
  },
  headerText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textMuted
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg
  },
  progressText: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.textMuted
  },
  questionTitle: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "800",
    color: colors.text,
    marginBottom: spacing.md
  },
  buttonRow: {
    marginTop: spacing.lg,
    flexDirection: "row",
    gap: spacing.sm
  },
  buttonItem: {
    flex: 1
  }
});
