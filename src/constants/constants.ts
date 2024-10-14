// URL Convention: Don't postfix with a path seperator (/)
export const API = 'http://127.0.0.1:8000'

export const COURSE_URL = `${API}/course`
export const ASSIGNMENT_URL = `${API}/assignment`
export const MOODLE_COURSE_URL = `${API}/course/moodle`
export const VERIFY_TOKEN_URL = `${API}/account/verify_token`
export const SIGNUP_URL = `${API}/account/signup`
export const LOGIN_URL = `${API}/account/login`
export const SIGNOUT_URL = `${API}/account/logout`
export const VERIFY_EMAIL_URL = `${API}/account/verify_email`

const MOCK_TEACHER_ID = '845hwg8dskld';
const ACTUAL_TEACHER_ID = '4fd95d4d-9486-4dfd-bc54-4def4b234b87';

export const LOCAL_STORAGE_ACCOUNT_ID = "accountid"
export const LOCAL_STORAGE_TOKEN = "token"
export const LOCAL_STORAGE_PERMISSION_LEVEL = "permission_level"

export const AUTH_HEADER = "Authorization"

export const TEACHER_ID = MOCK_TEACHER_ID;