import { getAllCourses } from "@/services/course"
import { BasicCourse } from "@/types/backend"
import { useEffect, useState } from "react"
import BasicCourseList from "@/components/basicCourseList";
import Loading from "@/components/loading";
import { useSecureGet } from "@/services/auth";

export default function AllCourses() {

    const [courses, setCourses] = useState<BasicCourse[]|null>(null);
    const secureGet = useSecureGet();

    useEffect(() => {
        getAllCourses(secureGet).then((courses) => {
            setCourses(courses)
        });
    })

    if (courses === null) {
        return (
            <Loading/>
        )
    }
    return (
        <BasicCourseList courses={courses}/>
    )
}