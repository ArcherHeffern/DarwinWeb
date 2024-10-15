import { BUTTON_S } from "@/styles/styles";
import { BasicCourse } from "@/types/backend";
import Link from "next/link";

export default function BasicCourseList({ courses }: { courses: BasicCourse[] }) {
    return (
        <div>
            {
                courses.map((course) => {
                    return <div key={course.id} style={{ 'marginBottom': '50px' }}>
                        <p> Course: {course.name}</p>
                        <p> id: {course.id}</p>
                        <Link style={BUTTON_S} href={{
                            pathname: '/course/' + course.id,
                        }}>View</Link>
                    </div>
                })
            }

        </div>
    )
}