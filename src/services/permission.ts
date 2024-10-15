import { ACCESS_LEVEL_URL } from "@/constants/constants";
import { AccessLevel } from "@/types/backend";
import axios, { AxiosResponse } from "axios";

export default async function getPermission(resourceid: string): Promise<AccessLevel> {
    return axios.get(ACCESS_LEVEL_URL + "/" + resourceid).then((res: AxiosResponse) => {
        console.log(res.data)
        return res.data;
    })
}