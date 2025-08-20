import { Register } from "@actimi/ovok-native";
import { useRouter } from "expo-router";
import React from "react";
import { Alert } from "react-native";

const RegisterScreen = () => {
  const router = useRouter();

  const onSuccess = React.useCallback(() => {
    router.replace("/");
  }, [router]);

  const onRegister = React.useCallback(() => {
    router.navigate("/login");
  }, [router]);

  const onError = React.useCallback((error: Error) => {
    Alert.alert("Failed to register", error.message);
  }, []);

  return (
    <Register>
      <Register.Header>
        <Register.Header.Title />
      </Register.Header>
      <Register.EmailForm onSuccess={onSuccess} onError={onError}>
        <Register.EmailForm.Inputs />
        <Register.EmailForm.Spacing percentage={0.3} />
        <Register.EmailForm.RegisterButton />
        <Register.LoginLink onPress={onRegister} />
        <Register.EmailForm.Spacing percentage={0.7} />
      </Register.EmailForm>
    </Register>
  );
};

export default RegisterScreen;
