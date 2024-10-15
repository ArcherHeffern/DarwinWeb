import { useRouter } from 'next/router'
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import { getCourse } from '@/services/course';
import { AccessLevel, Course as Course_T } from '@/types/backend';
import { NEW_ASSIGNMENT_S, ASSIGNMENT_S } from '@/styles/styles';
import ErrorScreen from '@/components/errorScreen';
import LoadingScreen from '@/components/loadingScreen';
import { AuthContext } from '../_app';
import { useSecureGet } from '@/services/auth';


export default function Course() {

    const { token, permission } = useContext(AuthContext);
    const { query, replace, isReady } = useRouter();
    const courseId = query.id;
    const secureGet = useSecureGet();

    const [course, setCourse] = useState<Course_T | null>(null);
    const [errorMsg, setErrorMsg] = useState<null | string>(null);
    const coursePermission = useRef<AccessLevel>(AccessLevel.NONE);

    useEffect(() => {
        if (!isReady || typeof courseId !== 'string') {
            return;
        }
        getCourse(courseId, secureGet)
            .then((res) => { setCourse(res); })
            .catch((e) => { setErrorMsg(e.message) })
    }, [courseId, isReady, permission, token, replace])

    if (errorMsg) {
        return (<ErrorScreen errorMsg={errorMsg} />)
    }

    if (!course) {
        return (<LoadingScreen />)
    }

    return (
        <div>
            <h1>{course.name}</h1>
            <p>Teacher(s): {course.teachers.map((t) => t.name).join(", ")}</p>
            <p>Tas: {course.tas.map(ta => ta.name).join(", ")}</p>
            <p>Num Students: {course.students.length}</p>

            <h1>Assignments</h1>
            {coursePermission.current >= AccessLevel.RD_WR &&
                <div>
                    <Link style={NEW_ASSIGNMENT_S}
                        href={"/assignment/new"}>
                        +
                    </Link>
                </div>}
            {course.assignments.map((a) => {
                return (
                    <div key={a.id}>
                        <Link href={"/assignment/" + a.id} style={ASSIGNMENT_S}>
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