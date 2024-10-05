
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
        .catch(() => {setErrMsg("Failed to fetch courses")})
    }, [])

    return (
        <div
            className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
        >
            {errMsg && <p>{errMsg}</p>}
            {/* View all Courses */}
            {courses.map((course) => {
                return <div key={course.id}>
                    <p> Course: {course.name}</p>
                    <p> id: {course.id}</p>
                    <button>View</button>
                </div>
            })}

            {/* Create new course */}
            <ScrapeCourseForm />
        </div>
    );
}
