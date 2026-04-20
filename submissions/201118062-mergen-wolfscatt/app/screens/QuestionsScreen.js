import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import ProgressDots from "../components/ProgressDots";
import ScreenContainer from "../components/ScreenContainer";
import SecondaryButton from "../components/SecondaryButton";
import SectionCard from "../components/SectionCard";
import SectionTitle from "../components/SectionTitle";
import TextAreaField from "../components/TextAreaField";
import { colors, spacing, typography } from "../constants/theme";

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

  return (
    <ScreenContainer scroll contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <SectionTitle
          eyebrow={`Takip soruları • ${progressText}`}
          title={idea}
          description="Kısa cevaplar yeterli. Amaç fikri netleştirmek."
        />
      </View>

      <SectionCard style={styles.questionCard}>
        <View style={styles.topRow}>
          <ProgressDots total={questions.length} currentIndex={currentIndex} />
          <Text style={styles.progressText}>{progressText}</Text>
        </View>

        <SectionTitle title={currentQuestion.title} description={helperText} />

        <TextAreaField
          value={currentValue}
          onChangeText={handleAnswerChange}
          placeholder={currentQuestion.placeholder}
          error={error}
          minHeight={156}
        />

        <View style={styles.buttonRow}>
          <View style={styles.buttonItem}>
            <SecondaryButton title={currentIndex === 0 ? "Fikre Dön" : "Geri"} onPress={onBack} />
          </View>

          <View style={styles.buttonItem}>
            <PrimaryButton
              title={isLastQuestion ? "Özeti Oluştur" : "İleri"}
              onPress={handleNext}
            />
          </View>
        </View>
      </SectionCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl,
    justifyContent: "space-between"
  },
  header: {
    gap: spacing.sm
  },
  questionCard: {
    gap: spacing.lg
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  progressText: {
    ...typography.label,
    color: colors.textMuted
  },
  buttonRow: {
    marginTop: spacing.xs,
    flexDirection: "row",
    gap: spacing.sm
  },
  buttonItem: {
    flex: 1
  }
});
