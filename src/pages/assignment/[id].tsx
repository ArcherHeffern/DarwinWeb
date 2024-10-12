import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Assignment as Assignment_T } from "@/types/backend";
import { getAssignment } from "@/services/assignment";
import ErrorScreen from "@/components/errorScreen";
import LoadingScreen from "@/components/loadingScreen";

export default function Assignment() {
    const {query, isReady} = useRouter();
    const assignmentId = query.id;

    const [assignment, setAssignment] = useState<Assignment_T | null>(null);
    const [errorMsg, setErrorMsg] = useState<null|string>(null);

    useEffect(() => {
        if (!isReady || typeof assignmentId !== 'string') {
            return;
        }
        getAssignment(assignmentId)
            .then((res) => { setAssignment(res); })
            .catch((e) => { setErrorMsg(e.message) })
    }, [assignmentId, isReady])

    if (errorMsg) {
        return (<ErrorScreen errorMsg={errorMsg}/>)
    }

    if (!assignment) {
        return (<LoadingScreen/>)
    }
    return (
        <div>
            {assignment.name}
        </div>
    )
}