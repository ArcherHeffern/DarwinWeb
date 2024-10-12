
export type CourseId = string
export type TeacherId = string
export type TaId = string
export type StudentId = string
export type AssignmentId = string
export type BlobId = string


export type BasicCourse = {
    id: CourseId;
    name: string;
}

export type Course = {
    id: CourseId,
    name: string,
    teachers: Array<Teacher>,
    students: Array<Student>,
    tas: Array<Ta>,
    assignments: Array<BasicAssignment>,
}

export type Teacher = {
    id: TeacherId,
    name: string,
    email: string,
}

export type Ta = {
    id: TaId,
    name: string,
    email: string,
}

export type Student = {
    id: StudentId,
    name: string,
    email: string,
}

export type BasicAssignment = {
    id: AssignmentId,
    name: string,
    due_date: Date,
}

enum ProjectType {
    MAVEN = 0,
}

enum SourceType {
    MOODLE = 0,
    DISK = 1,
}

export type Assignment = {
    id: AssignmentId
    course_f: CourseId
    name: string
    due_date: Date
    project_type: ProjectType // API returns index into PROJECT_TYPE
    source_type: SourceType // API returns index into SOURCE_TYPE
    source_reference: string|null
    skeleton_f: BlobId | null
    testfiles_f: BlobId
    last_downloaded: Date|null
}
