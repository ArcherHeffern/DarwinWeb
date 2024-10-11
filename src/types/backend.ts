export type BasicCourse = {
    id: number;
    name: string;

}

export type Course = {
    id: number,
    name: string,
    teachers: Array<Teacher>,
    students: Array<Student>,
    tas: Array<Ta>,
    assignments: Array<BasicAssignment>,
}

export type Teacher = {
    id: number,
    name: string,
    email: string,
}

export type Ta = {
    id: number,
    name: string,
    email: string,
}

export type Student = {
    id: number,
    name: string,
    email: string,
}

export type BasicAssignment = {
    id: number,
    name: string,
    due_date: string

}