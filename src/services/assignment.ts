import axios from "axios";
import { ASSIGNMENT_URL } from "@/constants/constants";
import { Assignment, AssignmentId } from "@/types/backend";

export const getAssignment = async (assignmentId: AssignmentId): Promise<Assignment> => {
    if (!assignmentId) {
        return Promise.reject(`Expected assignmentId`)
    }
    const res = await axios.get(`${ASSIGNMENT_URL}/${assignmentId}`);
    const contentType = res.headers['content-type'];
    if ( contentType !== 'application/json' ) {
        return Promise.reject(`Expected Content-Type==application/json but found ${contentType}`)
    }
    if ( res.status !== 200 ) {
        return Promise.reject(`Status code ${res.status}: Reason: ${res.statusText}`)
    }
    const JSONAssignment = res.data as Assignment;
    JSONAssignment.due_date = new Date(JSONAssignment.due_date)
    return JSONAssignment
}