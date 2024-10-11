import { BUTTON_S } from "@/styles/styles";
import Link from "next/link";
import { useEffect, useState } from "react";
import ScrapeCourseForm from "@/components/scrapecourseform";
import { BasicCourse } from "@/types/backend";
import { getCourses } from "@/services/course";
import { ACTUAL_TEACHER_ID as TEACHER_ID } from "@/constants/constants";

export default function Courses() {

    const [courses, setCourses] = useState<BasicCourse[]>([]);
    const [error, setError] = useState<null | string>(null);

    useEffect(() => {
        getCourses(TEACHER_ID)
            .then((res) => { setCourses(res); })
            .catch((e) => { setError(e) })
    }, [])

    if (error) {
        return (
            <div>
                <p>{error}</p>
            </div>
        )
    }
    return (
        <div>
            <h1>Courses</h1>
            {courses.map((course) => {
                return <div key={course.id} style={{'marginBottom': '50px'}}>
                    <p> Course: {course.name}</p>
                    <p> id: {course.id}</p>
                    <Link style={BUTTON_S} href={{
                        pathname: '/course/'+course.id,
                    }}>View</Link>
                </div>
            })}

            {/* Create new course */}
            <h1>Create new Course</h1>
            <ScrapeCourseForm />
        </div>
    );
}
