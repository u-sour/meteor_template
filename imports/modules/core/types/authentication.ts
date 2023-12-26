export interface SignUpFrom {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    comfirmPassword: string
    status: string
    roles: string[]
}
export interface SignInForm {
    username: string,
    password: string,
    rememberMe?: boolean
}

export interface RememberMe {
    username?: string,
    rememberMe?: boolean
}

export interface User {
    username: string,
    emails: [],
    profile: UserProfile
}
interface UserProfile {
    firstName: string,
    lastName: string,
    profilePic: string,
    status: string
}