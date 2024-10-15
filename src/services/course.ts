import { AxiosError } from 'axios'
import { ALL_COURSES_URL, COURSE_URL, USER_COURSES_URL } from '@/constants/constants'
import { AccountId, BasicCourse, Course } from '@/types/backend';
import { SecureGetFunction } from './auth';

export const getCourses = async (accountid: AccountId, secureGet: SecureGetFunction): Promise<BasicCourse[]> => {
    try {
        const response = await secureGet(`${USER_COURSES_URL}`)
        return response.data as BasicCourse[];
    } catch (error) {
        throw error as AxiosError;
    }
}

export const getAllCourses = async (secureGet: SecureGetFunction): Promise<BasicCourse[]> => {
    try {
        const response = await secureGet(`${ALL_COURSES_URL}`);
        return response.data as BasicCourse[];
    } catch (error) {
        throw error as AxiosError;
    }
}


export const getCourse = async (courseId: string, secureGet: SecureGetFunction): Promise<Course> => {
    try {
        const response = await secureGet(`${COURSE_URL}/${courseId}`);
        const JSONCourse = response.data as Course;
        JSONCourse.assignments.forEach(assignment => {
            assignment.due_date = new Date(assignment.due_date) // Parse from ISO 8601
        });
        JSONCourse.assignments.sort();
        return JSONCourse;
    } catch (error) {
        throw error as AxiosError;
    }
}