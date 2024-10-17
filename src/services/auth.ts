import { AuthContext } from "@/pages/_app";
import { TokenId } from "@/types/backend";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { NextRouter, useRouter } from "next/router";
import { useContext } from "react";

export function AuthHeaders(token: TokenId): object {
    return { headers: { 'Authorization': `Bearer ${token}` } }
}

export type SecureGetFunction = (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<any>>;

function useSecureMethod() {

    const router = useRouter();
    const { token, logout } = useContext(AuthContext);

    async function SecureMethod(url: string, body = {}, config: AxiosRequestConfig = {}, method: string = "get") {
        if (!token) {
            handleNotAuthenticated(router, logout);
            throw new Error("Not authenticated");
        }
        method = method.toLowerCase()

        config.headers = { ...config.headers, Authorization: `Bearer ${token}` };

        try {
            if (method == "delete")
                return await axios.delete(url, config);
            else if (method == "post")
                return await axios.post(url, body, config);
            else {
                return await axios.get(url, config);
            }
        
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

    async function securePost(url: string, body = {}, config: AxiosRequestConfig<any> = {}): Promise<AxiosResponse<any, any>> {
        return secureMethod(url, body, config, "post")
    }
    return securePost
}

export function useSecureGet() {

    const secureMethod = useSecureMethod();

    async function secureGet(url: string, config: AxiosRequestConfig<any> = {}): Promise<AxiosResponse<any, any>> {
        return secureMethod(url, {}, config, "get")
    }
    return secureGet
}
