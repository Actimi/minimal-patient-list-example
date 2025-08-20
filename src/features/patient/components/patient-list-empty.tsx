import * as React from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

type PatientListEmptyProps = {
  debouncedSearchQuery: string;
  isLoading: boolean;
};

export const PatientListEmpty = ({
  debouncedSearchQuery,
  isLoading,
}: PatientListEmptyProps) => {
  const emptyText = React.useMemo(() => {
    const trimmedQuery = debouncedSearchQuery.trim();
    let suggestions: string[] = [];

    if (!trimmedQuery) {
      suggestions = [
        'Try: "Amanda" as full first name',
        'Try: "Clark" as full last name',
        'Try: "Amanda Clark" as full name',
        'Try: "Cl" as partial',
      ];
    }

    const randomSuggestion =
      suggestions[Math.floor(Math.random() * suggestions.length)];

    return randomSuggestion ?? `No patients matching '${trimmedQuery}'`;
  }, [debouncedSearchQuery]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.centered}>
      <Text style={{ textAlign: "center" }}>{emptyText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
