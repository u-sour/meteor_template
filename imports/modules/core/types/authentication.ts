export interface SignUpFrom {
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string
    status: string
    roles: string[]
}
export interface SignInForm {
    username: string,
    password: string,
    rememberMe?: boolean
}

export interface EditProfileForm {
    _id: string,
    profileImageFile?: [ProfileImageFile],
    profileImage?: ProfileImage,
    firstName: string,
    lastName: string,
    username: string,
    about?: string,
    company?: string,
    job?: string,
    address?: string,
    phoneNumber: string,
    email: string,
    status: string
}

interface ProfileImageFile {
    name: string,
    file: File
}

interface ProfileImage {
    publicId?: string,
    name: string,
    base64: string,
    url?: string,
}

export interface changePasswordForm {
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
}

export interface RememberMe {
    username?: string,
    rememberMe?: boolean
}

export interface User {
    _id: string,
    username: string,
    emails: Email[],
    profile: UserProfile
}

interface Email {
    address: string,
    verified: boolean
}

interface UserProfile {
    profileImage?: string,
    firstName: string,
    lastName: string,
    about?: string,
    company?: string,
    job?: string,
    address?: string,
    phoneNumber: string,
    status: string
}