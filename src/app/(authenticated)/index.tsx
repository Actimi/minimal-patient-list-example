import { PatientListEmpty } from "@/src/features/patient/components/patient-list-empty";
import { usePatientList } from "@/src/features/patient/hooks/use-patient-list";
import {
  Conditional,
  PatientCard,
  PatientList,
  useAppTheme,
} from "@actimi/ovok-native";
import { Patient } from "@medplum/fhirtypes";
import { CloseCircle, SearchNormal } from "iconsax-react-nativejs";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const {
    patients,
    isLoading,
    debouncedSearchQuery,
    searchQuery,
    handleSearchQueryChange,
  } = usePatientList();
  const { bottom } = useSafeAreaInsets();
  const theme = useAppTheme();

  const renderEmptyComponent = React.useCallback(
    () => (
      <PatientListEmpty
        debouncedSearchQuery={debouncedSearchQuery}
        isLoading={isLoading}
      />
    ),
    [debouncedSearchQuery, isLoading]
  );

  const renderItem = React.useCallback(
    ({ item }: { item: Patient; index: number }) => {
      return (
        <PatientCard testID="patient-card-demo">
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: theme.spacing(2),
            }}
          >
            <View style={{ flex: 1 }}>
              <PatientCard.Name name={item.name} testID="patient-name-demo" />
            </View>
          </View>
          <PatientCard.Meta>
            <PatientCard.Gender
              gender={item.gender as "male" | "female" | "other"}
              variant="chip"
              showIcon={true}
              testID="patient-gender-demo"
            />
            <Conditional condition={!!item.birthDate}>
              <PatientCard.BirthDate testID="patient-birth-date-demo">
                <PatientCard.BirthDate.Icon />
                <PatientCard.BirthDate.Text
                  birthDate={item.birthDate ?? ""}
                  variant="age"
                />
              </PatientCard.BirthDate>
            </Conditional>
          </PatientCard.Meta>
        </PatientCard>
      );
    },
    [theme]
  );

  return (
    <PatientList
      data={patients}
      renderItem={renderItem}
      testID="patient-list-home"
      ListEmptyComponent={renderEmptyComponent}
      ListHeaderComponent={
        <View
          style={[
            styles.container,
            {
              marginHorizontal: theme.spacing(-4),
              marginTop: theme.spacing(-4),
              padding: theme.spacing(4),
              marginBottom: theme.spacing(4),
              backgroundColor: theme.colors.surface,
            },
          ]}
        >
          <View style={[styles.searchContainer, { gap: theme.spacing(2) }]}>
            <TextInput
              mode="outlined"
              placeholder={"Search by patient name..."}
              value={searchQuery}
              onChangeText={handleSearchQueryChange}
              returnKeyType="search"
              left={
                <TextInput.Icon
                  icon={() => (
                    <SearchNormal
                      size={20}
                      color={theme.colors.onSurfaceVariant}
                    />
                  )}
                />
              }
              right={
                <TextInput.Icon
                  onPress={() => handleSearchQueryChange("")}
                  icon={() => (
                    <CloseCircle
                      size={20}
                      color={theme.colors.onSurfaceVariant}
                    />
                  )}
                />
              }
              style={[styles.textInput]}
              contentStyle={styles.textInputContent}
              theme={{
                roundness: theme.borderRadius(3),
              }}
            />
          </View>
        </View>
      }
      contentContainerStyle={{
        paddingBottom: bottom + theme.spacing(4),
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    height: 48,
  },
  textInputContent: {
    textAlign: undefined,
  },
});
