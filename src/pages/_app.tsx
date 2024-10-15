import "@/styles/globals.css";
import Layout from "@/components/layout";
import type { AppProps } from "next/app";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { AccountId, AccountId as AccountId_T, AccountPermission as AccountPermission_T, TokenId, TokenId as TokenId_T } from "@/types/backend";
import { LOCAL_STORAGE_ACCOUNT_ID, LOCAL_STORAGE_PERMISSION_LEVEL, LOCAL_STORAGE_TOKEN, LOCAL_STORATE_USERNAME } from "@/constants/constants";

interface AuthContextType {
  logout: ()=>void;
  accountId: AccountId | null;
  setAccountId: Dispatch<SetStateAction<AccountId | null>>;
  username: string | null,
  setUsername: Dispatch<SetStateAction<string | null>>
  token: TokenId | null;
  setToken: Dispatch<SetStateAction<TokenId | null>>;
  permission: AccountPermission_T;
  setPermission: Dispatch<SetStateAction<AccountPermission_T>>;
}

export const AuthContext = createContext<AuthContextType>(null); // Ignore: This is declared at the top level

export default function App({ Component, pageProps }: AppProps) {
  const [accountId, setAccountId] = useState<AccountId_T | null>(null);
  const [permission, setPermission] = useState<AccountPermission_T>(AccountPermission_T.NONE);
  const [token, setToken] = useState<TokenId_T | null>(null);
  const [username, setUsername] = useState<string|null>(null);

  function logout() {
    setAccountId(null);
    setPermission(AccountPermission_T.NONE)
    setToken(null);
    setUsername(null);
  }

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const accountId = localStorage.getItem(LOCAL_STORAGE_ACCOUNT_ID)
    if (accountId) {
      setAccountId(accountId);
    }

    const permissionLevelString = localStorage.getItem(LOCAL_STORAGE_PERMISSION_LEVEL);
    if (permissionLevelString) {
      setPermission(Number.parseInt(permissionLevelString));
    }

    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
    if (token) {
      setToken(token);
    }

    const username = localStorage.getItem(LOCAL_STORATE_USERNAME);
    if (username) {
      setUsername(username);
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
    if (permission) {
      localStorage.setItem(LOCAL_STORAGE_PERMISSION_LEVEL, permission.toString());
    } else {
      localStorage.removeItem(LOCAL_STORAGE_PERMISSION_LEVEL);
    }
  }, [permission]);

  useEffect(() => {
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN, token);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    }
  }, [token]);

  useEffect(() => {
    if (username) {
      localStorage.setItem(LOCAL_STORATE_USERNAME, username);
    } else {
      localStorage.removeItem(LOCAL_STORATE_USERNAME);
    }
  }, [username]);

  return (
    <AuthContext.Provider value={{logout, accountId, setAccountId, permission, setPermission, token, setToken, username, setUsername }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContext.Provider>
  )
}
