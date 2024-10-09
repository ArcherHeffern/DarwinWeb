
import { useEffect, useState } from "react";
import ScrapeCourseForm from "@/components/scrapecourseform";
import { Course } from "@/types/backend";
import { getCourses } from "@/services/course";

export default function Courses() {

    const [courses, setCourses] = useState<Course[]>([]);
    const [errMsg, setErrMsg] = useState<null | string>(null);

    useEffect(() => {
        getCourses()
        .then((res) => {setCourses(res);})
        .catch((e) => {setErrMsg(e)})
    }, [])

    return (
        <div>
            {errMsg && <p>{errMsg}</p>}
            <h3>Courses</h3>
            {courses.map((course) => {
                return <div key={course.id}>
                    <p> Course: {course.name}</p>
                    <p> id: {course.id}</p>
                    <button>View</button>
                </div>
            })}

            {/* Create new course */}
            <h3>Create new Course</h3>
            <ScrapeCourseForm />
        </div>
    );
}
