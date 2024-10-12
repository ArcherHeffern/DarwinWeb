import axios from 'axios'
import { COURSE_URL } from '@/constants/constants'
import { BasicCourse, Course } from '@/types/backend';

export const getCourses = async (accountId: string): Promise<BasicCourse[]> => {
    /**
     * [
     * {id, name},
     * {id, name}
     * ]
     */
    const res = await axios.get(`${COURSE_URL}?account_id=${accountId}`);
    const contentType = res.headers['content-type'];
    if ( contentType !== 'application/json' ) {
        return Promise.reject(`Expected Content-Type==application/json but found ${contentType}`)
    }
    if ( res.status !== 200 ) {
        return Promise.reject(`Status code ${res.status}: Reason: ${res.statusText}`)
    }
    const JSONBasicCourses = res.data as BasicCourse[]
    return JSONBasicCourses
}


export const getCourse = async (courseId: string, accountId: string): Promise<Course> => {
    if (!courseId || !accountId) {
        return Promise.reject(`Expected courseId and accountId but found courseid: ${courseId} : accountid: ${accountId}`)
    }
    const res = await axios.get(`${COURSE_URL}/${courseId}/?account_id=${accountId}`);
    const contentType = res.headers['content-type'];
    if ( contentType !== 'application/json' ) {
        return Promise.reject(`Expected Content-Type==application/json but found ${contentType}`)
    }
    if ( res.status !== 200 ) {
        return Promise.reject(`Status code ${res.status}: Reason: ${res.statusText}`)
    }
    const JSONCourse = res.data as Course;
    JSONCourse.assignments.forEach(assignment => {
        assignment.due_date = new Date(assignment.due_date) // Parse from ISO 8601
    });
    JSONCourse.assignments.sort()
    return JSONCourse;
}