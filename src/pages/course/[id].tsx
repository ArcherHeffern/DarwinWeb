import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { getCourse } from '@/services/course';
import { MOCK_TEACHER_ID as TEACHER_ID } from '@/constants/constants';
import { Course as Course_T } from '@/types/backend';


export default function Course() {

    const {query, isReady} = useRouter();
    const courseId = query.id;

    const [course, setCourse] = useState<Course_T | null>(null);
    const [error, setError] = useState<null|string>(null);

    useEffect(() => {
        if (!isReady || typeof courseId !== 'string') {
            return;
        }
        getCourse(courseId, TEACHER_ID)
            .then((res) => { setCourse(res); })
            .catch((e) => { console.log("ERROR" + e); setError(e) })
    }, [courseId, isReady])

    if (error) {
        return (<div>
            {error &&
                <p>
                    {error}
                </p>}
            </div>)
    }

    if (!course) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div>
            <h1>{course.name}</h1>
            <p>Teacher(s): {course.teachers.map((t)=>t.name).join(", ")}</p>
            <p>Tas: {course.tas.map(ta=>ta.name).join(", ")}</p> 
            <p>Num Students: {course.students.length}</p>
        </div>
    )
}