import { FormEvent } from "react"

const ACCEPTED_FILE_EXTENSIONS = [".class"]

export default function NewAssignment() {

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    <label htmlFor="moodleAssignmentId">ID:</label>
                    <input type="text" name="moodleAssignmentId" id="moodleAssignmentId" />
                </div>
                <div>
                    <label htmlFor="moodleSession">Moodle Session:</label>
                    <input type="text" name="moodleSession" id="moodleSession" />
                </div>
                <div>
                    <label htmlFor="projectType">projectType: </label>
                    <select name="projectType" id="projectType">
                        <option value="maven">Maven</option>
                        <option value="other">Other...</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="testfiles">Compiled Testfiles:</label>
                    <input type="file" name="testfiles" id="testfiles" multiple accept={ACCEPTED_FILE_EXTENSIONS.join(",")}/>
                </div>
            </form>
        </div>
    )
}