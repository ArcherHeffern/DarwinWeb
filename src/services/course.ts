import axios from 'axios'
import { COURSE, TEACHER_ID } from '@/constants/endpoints'
import { Course } from '@/types/backend';

export const getCourses = async (): Promise<Course[]> => {
    /**
     * [
     * {id, name},
     * {id, name}
     * ]
     */
    const res = await axios.get(`${COURSE}?account_id=${TEACHER_ID}`);
    const contentType = res.headers['content-type'];
    if ( contentType !== 'application/json' ) {
        return Promise.reject(`Expected Content-Type==application/json but found ${contentType}`)
    }
    if ( res.status != 200 ) {
        return Promise.reject(`Status code ${res.status}: Reason: ${res.statusText}`)
    }
    const JSONCourses = res.data 
    return JSONCourses;

}