import { useClient } from "@actimi/ovok-core";
import { Stack, useRouter } from "expo-router";
import * as React from "react";

const AuthLayout = () => {
  const client = useClient();
  const router = useRouter();

  React.useEffect(() => {
    const redirect = async () => {
      await client.refreshIfExpired();

      const accessToken = client.getActiveLogin()?.accessToken;

      if (accessToken) {
        router.replace("/(authenticated)");
      }
    };

    redirect().catch(() => {
      client.clearActiveLogin();
    });
  }, [client, router]);

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
