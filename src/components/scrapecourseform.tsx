
export default function ScrapeCourseForm() {
    return (
        <div>
            <form action="/assignment/scrape" method="POST">
                <label htmlFor="assignmentid">assignment id: </label>
                <input type="text" name="assignmentid" id="assignmentid" />

                <label htmlFor="moodlesession">Moodle Session</label>
                <input type="text" name="moodlesession" id="moodlesession" />

                <input type="submit" value="submit"/>
            </form>
        </div>
     );
}