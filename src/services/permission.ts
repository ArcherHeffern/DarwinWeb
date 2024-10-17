import { ACCESS_LEVEL_URL } from "@/constants/constants";
import { AccessLevel } from "@/types/backend";
import { AxiosResponse } from "axios";
import { SecureGetFunction } from "./auth";

export default async function getPermission(resourceid: string, secureGet: SecureGetFunction): Promise<AccessLevel> {
    return secureGet(ACCESS_LEVEL_URL + "/" + resourceid).then((res: AxiosResponse) => {
        return res.data;
    })
}