import "@/styles/globals.css";
import Layout from "@/components/layout";
import type { AppProps } from "next/app";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { AccountId as AccountId_T, AccountPermission as AccountPermission_T, TokenId as TokenId_T } from "@/types/backend";
import { LOCAL_STORAGE_ACCOUNT_ID, LOCAL_STORAGE_PERMISSION_LEVEL, LOCAL_STORAGE_TOKEN } from "@/constants/constants";

interface AuthContextType {
  accountId: string | null;
  setAccountId: Dispatch<SetStateAction<string | null>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  permission: AccountPermission_T | null;
  setPermission: Dispatch<SetStateAction<AccountPermission_T | null>>;
}

export const AuthContext = createContext<AuthContextType>(null); // Ignore: This is declared at the top level

export default function App({ Component, pageProps }: AppProps) {
  const [accountId, setAccountId] = useState<AccountId_T | null>(null);
  const [token, setToken] = useState<TokenId_T | null>(null);
  const [permission, setPermission] = useState<AccountPermission_T | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const accountId = localStorage.getItem(LOCAL_STORAGE_ACCOUNT_ID)
    if (accountId) {
      setAccountId(accountId);
    }

    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
    if (token) {
      setToken(token);
    }

    const permissionLevelString = localStorage.getItem(LOCAL_STORAGE_PERMISSION_LEVEL);
    if (permissionLevelString) {
      setPermission(Number.parseInt(permissionLevelString));
    }
    
  }, [])

  useEffect(() => {
    if (accountId) {
      localStorage.setItem(LOCAL_STORAGE_ACCOUNT_ID, accountId);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_ACCOUNT_ID);
    }
  }, [accountId]);

  useEffect(() => {
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    }
  }, [token]);

  useEffect(() => {
    if (permission) {
      localStorage.setItem(LOCAL_STORAGE_PERMISSION_LEVEL, permission.toString());
    } else {
      localStorage.removeItem(LOCAL_STORAGE_PERMISSION_LEVEL);
    }
  }, [permission]);

  return (
    <AuthContext.Provider value={{accountId, setAccountId, token, setToken, permission, setPermission}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContext.Provider>
  )
}
