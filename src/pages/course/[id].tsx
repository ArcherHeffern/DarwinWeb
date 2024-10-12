import { useRouter } from 'next/router'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCourse } from '@/services/course';
import { TEACHER_ID } from '@/constants/constants';
import { Course as Course_T } from '@/types/backend';
import { NEW_ASSIGNMENT_S, ASSIGNMENT_S } from '@/styles/styles';
import ErrorScreen from '@/components/errorScreen';
import LoadingScreen from '@/components/loadingScreen';


export default function Course() {

    const {query, isReady} = useRouter();
    const courseId = query.id;

    const [course, setCourse] = useState<Course_T | null>(null);
    const [errorMsg, setErrorMsg] = useState<null|string>(null);

    useEffect(() => {
        if (!isReady || typeof courseId !== 'string') {
            return;
        }
        getCourse(courseId, TEACHER_ID)
            .then((res) => { setCourse(res); })
            .catch((e) => { setErrorMsg(e.message) })
    }, [courseId, isReady])

    if (errorMsg) {
        return (<ErrorScreen errorMsg={errorMsg}/>)
    }

    if (!course) {
        return (<LoadingScreen/>)
    }

    return (
        <div>
            <h1>{course.name}</h1>
            <p>Teacher(s): {course.teachers.map((t)=>t.name).join(", ")}</p>
            <p>Tas: {course.tas.map(ta=>ta.name).join(", ")}</p> 
            <p>Num Students: {course.students.length}</p>

            <h1>Assignments</h1>
            <Link style={NEW_ASSIGNMENT_S}
            href={"/assignment/new"}>
                +
            </Link>
            {course.assignments.map((a) => {
                return (
                    <div key={a.id}>
                    <Link href={"/assignment/"+a.id} style={ASSIGNMENT_S}>
                        <p>{a.name}</p>
                        <p>Due: {a.due_date.toLocaleString()}</p>
                    </Link>
                    </div>
                )
            })}
            <h1>Settings</h1>
        </div>
    )
}