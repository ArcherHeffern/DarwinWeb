import { useEffect, useState } from "react";
import { AccountId, BasicCourse, FastAPIError } from "@/types/backend";
import { getCourses } from "@/services/course";
import { AxiosError } from "axios";
import BasicCourseList from "./basicCourseList";
import { useSecureGet } from "@/services/auth";

export default function Courses({ accountId }: { accountId: AccountId }) {

    const [courses, setCourses] = useState<BasicCourse[]>([]);
    const [error, setError] = useState<null | string>(null);
    const secureGet = useSecureGet();

    useEffect(() => {
        console.log(accountId)
        getCourses(accountId, secureGet)
            .then((res) => { setCourses(res); })
            .catch((e: AxiosError) => { 
                const body = e.response?.data as FastAPIError;
                setError(`Cannot fetch courses: ${body.detail}`) 
            })
    }, []) // adding secureGet caused infinte requests

    if (error) {
        return (
            <div>
                <p>{error}</p>
            </div>
        )
    }
    return (
        <div>
            <BasicCourseList courses={courses}/>
        </div>
    );
}
