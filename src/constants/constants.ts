// URL Convention: Don't postfix with a path seperator (/)
const DEBUG = process.env.DEBUG;


const LOCAL_API = 'http://127.0.0.1:8000'
const DEPLOY_API = 'http://172.20.129.207:8000'

let _API = LOCAL_API
if (!DEBUG) {
    _API = DEPLOY_API
}

export const API = _API


export const ACCESS_LEVEL_URL = `${API}/accesslevel`
export const ASSIGNMENT_URL = `${API}/assignment`
export const COURSE_URL = `${API}/course`
export const LOGIN_URL = `${API}/account/login`
export const MOODLE_COURSE_URL = `${API}/course/moodle`
export const SIGNOUT_URL = `${API}/account/logout`
export const SIGNUP_URL = `${API}/account/signup`
export const USER_COURSES_URL = `${API}/course/user`
export const ALL_COURSES_URL = `${API}/course`
export const VERIFY_EMAIL_URL = `${API}/account/verify_email`
export const VERIFY_TOKEN_URL = `${API}/account/verify_token`

export const LOCAL_STORAGE_ACCOUNT_ID = "accountid"
export const LOCAL_STORAGE_PERMISSION_LEVEL = "permission_level"
export const LOCAL_STORAGE_TOKEN = "token"
export const LOCAL_STORATE_USERNAME = "username"

export const AUTH_HEADER = "Authorization"
