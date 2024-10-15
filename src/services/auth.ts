import { LOCAL_STORAGE_ACCOUNT_ID, LOCAL_STORAGE_PERMISSION_LEVEL, LOCAL_STORAGE_TOKEN, LOCAL_STORATE_USERNAME } from "@/constants/constants";
import { AuthContext } from "@/pages/_app";
import { TokenId } from "@/types/backend";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { NextRouter, useRouter } from "next/router";
import { useContext } from "react";

export function AuthHeaders(token: TokenId): object {
    return { headers: { 'Authorization': `Bearer ${token}` } }
}

export type SecureGetFunction = (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<any>>;
type AxiosMethod = (url: string, config?: AxiosRequestConfig<any> | undefined) => Promise<AxiosResponse<any, any>>

function useSecureMethod() {

    const router = useRouter();
    const { token, logout } = useContext(AuthContext);

    async function SecureMethod(url: string, config: AxiosRequestConfig = {}, method: AxiosMethod) {
        if (!token) {
            handleNotAuthenticated(router, logout);
            throw new Error("Not authenticated");
        }

        config.headers = { ...config.headers, Authorization: `Bearer ${token}` };

        try {
            return await method(url, config);
        } catch (e) {
            if (axios.isAxiosError(e) && e.response?.status === 401) {
                handleNotAuthenticated(router, logout);
            }
            throw e;
        }
    }
    return SecureMethod
}

function handleNotAuthenticated(router: NextRouter, logout: ()=>void) {
    if (router.pathname != "/") {
        router.replace("/");
    }
    logout();
}

export function useSecurePost() {

    const secureMethod = useSecureMethod();

    async function securePost(url: string, config: AxiosRequestConfig<any> = {}): Promise<AxiosResponse<any, any>> {
        return secureMethod(url, config, axios.post)
    }
    return securePost
}

export function useSecureGet() {

    const secureMethod = useSecureMethod();

    async function secureGet(url: string, config: AxiosRequestConfig<any> = {}): Promise<AxiosResponse<any, any>> {
        return secureMethod(url, config, axios.get)
    }
    return secureGet
}
