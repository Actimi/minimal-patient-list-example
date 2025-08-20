import { SignIn } from "@actimi/ovok-native";
import { useRouter } from "expo-router";
import React from "react";
import { Alert } from "react-native";

const LoginScreen = () => {
  const router = useRouter();

  const onSuccess = () => {
    router.replace("/");
  };

  const onRegister = () => {
    router.navigate("/register");
  };

  const onError = React.useCallback((error: Error) => {
    Alert.alert("Failed to login", error.message);
  }, []);

  return (
    <SignIn>
      <SignIn.Header>
        <SignIn.Header.Title />
      </SignIn.Header>
      <SignIn.EmailForm
        loginType={"Patient"}
        onSuccess={onSuccess}
        onError={onError}
      >
        <SignIn.EmailForm.Inputs />
        <SignIn.EmailForm.Spacing percentage={0.3} />
        <SignIn.EmailForm.SigninButton textColor="white" />
        <SignIn.RegisterLink onPress={onRegister} />
        <SignIn.EmailForm.Spacing percentage={0.7} />
      </SignIn.EmailForm>
    </SignIn>
  );
};

export default LoginScreen;
