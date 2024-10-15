import { FORM_ITEM_CONTAINER, FORM_S, SUBMIT_BUTTON_S, TEXT_INPUT_S } from "@/styles/styles";
import axios, { AxiosError } from "axios";
import { FormEvent, useContext, useState } from "react";
import { MOODLE_COURSE_URL } from "@/constants/constants";
import { Course, FastAPIError } from "@/types/backend";
import { useRouter } from "next/router";
import { AuthHeaders } from "@/services/auth";
import { AuthContext } from "@/pages/_app";
import Loading from "./loading";

export default function ScrapeCourseForm() {

    const router = useRouter();
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>('');

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!token) {
            console.log("User attempted to scrape a moodle course when not authenticated")
            return;
        }

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

        setLoading(true);
        axios.post(MOODLE_COURSE_URL, requestBody, AuthHeaders(token)).then((response) => {
            const course = response.data as Course;
            router.push(("/course/" + course.id))
        }).catch((err: AxiosError) => {
            const body = err.response?.data as FastAPIError;
            setErrMsg(`Failed to scrape course: ${body.detail}`)
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <>
            {errMsg && <p style={{'textAlign': 'center'}}>{errMsg}</p>}
            <form onSubmit={submit} style={FORM_S}>
                <div style={FORM_ITEM_CONTAINER}>
                    <label htmlFor="courseId">Course Id: </label>
                    <input type="text" name="courseId" id="courseId" style={TEXT_INPUT_S} />
                </div>
                <div style={FORM_ITEM_CONTAINER}>
                    <label htmlFor="moodleSession">Moodle Session</label>
                    <input type="text" name="moodleSession" id="moodleSession" style={TEXT_INPUT_S} />
                </div>
                <input type="submit" value="submit" style={SUBMIT_BUTTON_S} />
            </form>
            { loading && <Loading/>}
        </>
    );
}