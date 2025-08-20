import { useClient } from "@actimi/ovok-core";
import { Stack, useRouter } from "expo-router";
import * as React from "react";

const AuthenticatedLayout = () => {
  const client = useClient();
  const router = useRouter();

  React.useEffect(() => {
    const redirect = async () => {
      await client.refreshIfExpired();

      const accessToken = client.getActiveLogin()?.accessToken;
      const authData = await client.getProfileAsync();

      if (!accessToken || !authData) {
        router.replace("/(auth)/login");
      }
    };

    redirect().catch(() => {
      client.clearActiveLogin();
      router.replace("/(auth)/login");
    });
  }, [client, router]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
};

export default AuthenticatedLayout;
