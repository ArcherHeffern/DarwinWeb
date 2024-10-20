
export type AccountId = string
export type CourseId = string
export type TeacherId = string
export type TaId = string
export type TokenId = string
export type StudentId = string
export type AssignmentId = string
export type BlobId = string

export type Account = {
    id: AccountId
    email: string
    name: string
    status: AccountStatus
    permission: AccountPermission
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

export type BasicAssignment = {
    id: AssignmentId,
    name: string,
    due_date: Date,
}

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

export type FastAPIError = {
    detail: string
}
export type LoginResponse = {
    access_token: string
    account_id: AccountId
    expiration: Date
    name: string
    permission: AccountPermission
    token_type: string // For Auth0
}

export type SignUpResponse = {
    ttl: string
}

export type Student = {
    id: StudentId,
    name: string,
    email: string,
}

export type Ta = {
    id: TaId,
    name: string,
    email: string,
}

export type Teacher = {
    id: TeacherId,
    name: string,
    email: string,
}


// ============
// Enums
// ============

export enum AccessLevel {
    NONE = 0,
    RD = 1,
    RD_WR = 3,
    RD_WR_DEL = 4,
}

export enum AccountPermission {
    NONE = 0,
    MEMBER = 1,
    TA = 2, 
    TEACHER = 3, 
    ADMIN = 4, 
}

export enum AccountStatus {
    UNREGISTERED = 1,
    REGISTERED = 2,
    DELETED = 3,
}

export enum ProjectType {
    MAVEN = 0,
}

export enum SourceType {
    MOODLE = 0,
    DISK = 1,
}
