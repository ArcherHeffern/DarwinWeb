import axios from 'axios'
import { COURSE } from '@/constants/endpoints'
import { Course } from '@/types/backend';

export const getCourses = async (): Promise<Course[]> => {
    /**
     * [
     * {id, name},
     * {id, name}
     * ]
     */
    const res = await axios.get(COURSE);
    const json_courses: Array<object> =  JSON.parse( res.data );
    return json_courses as Course[];

}