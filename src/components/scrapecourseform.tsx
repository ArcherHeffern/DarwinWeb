import { BUTTON_S, TEXT_INPUT_S } from "@/styles/styles";
import axios from "axios";
import { FormEvent, useState } from "react";
import { MOODLE_COURSE_URL } from "@/constants/constants";
import { Course } from "@/types/backend";
import { useRouter } from "next/router";

export default function ScrapeCourseForm() {

    const router = useRouter();

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget);
        const courseId = formData.get('courseId');
        const moodleSession = formData.get('moodleSession');
        if (!courseId) {
            setErrMsg("Must fill out courseId");
            return;
        }

        if (!moodleSession) {
            setErrMsg("Must fill out moodleSession");
            return;
        }
        const requestBody = {
            "id": courseId,
            "moodle_session": moodleSession,
        }

        const response = await axios.post(MOODLE_COURSE_URL, requestBody)
        if (response.status !== 201) {
            setErrMsg(`Failed to scrape course: ${response.data}`)
            return;
        }
        const course = response.data as Course;
        console.log(`Created course ${course.name}`)
        router.push(("/course/" + course.id))
    }

    const [errMsg, setErrMsg] = useState<string>('');
    return (
        <>
            {errMsg && <p>{errMsg}</p>}
            <form onSubmit={submit}>
                <label htmlFor="courseId">Course Id: </label>
                <input type="text" name="courseId" id="courseId" style={TEXT_INPUT_S}/>
                <label htmlFor="moodleSession">Moodle Session</label>
                <input type="text" name="moodleSession" id="moodleSession" style={TEXT_INPUT_S}/>
                <input type="submit" value="submit" style={BUTTON_S} />
            </form>
        </>
    );
}