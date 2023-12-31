export default {
    pages: {
        auth: {
            signIn: {
                title: '👋 Hello, Welcome Back!',
                subTitle: 'Sign in with your data that you entered during your registration.',
                form: {
                    username: 'Username',
                    password: 'Password',
                    rememberMe: 'Remember Me'
                },
                components: {
                    forgotPassword: 'Forgot Password',
                    noAccount: "Don't have an account?",
                }
            },
            signUp: {
                title: 'Join us today!',
                subTitle: 'Sign up now to become a member.',
                form: {
                    firstName: 'First Name',
                    lastName: 'Last Name',
                    email: 'Email',
                    username: 'Username',
                    password: 'Password',
                    confirmPassword: 'Confirm Password'
                },
                components: {
                    haveAccount: "Already have an account?",
                }
            }
        },
        admin: {
            dashboard: {
                title: 'Dashboard',
            },
            profile: {
                title: 'Profile',
                overview: {
                    title: 'Overview',
                    about: 'About',
                    profileDetails: {
                        title: 'Profile Details',
                        form: {
                            fullName: 'Full Name',
                            company: 'Company',
                            job: 'Job',
                            country: 'Country',
                            address: 'Address',
                            phoneNumber: 'Phone Number',
                            email: 'Email'
                        }
                    }
                },
                editProfile: {
                    title: 'Edit Profile',
                    form: {
                        profileImage: 'Profile Image',
                        firstName: 'First Name',
                        lastName: 'Last Name',
                        username: 'Username',
                        about: 'About',
                        company: 'Company',
                        job: 'Job',
                        country: 'Country',
                        address: 'Address',
                        phoneNumber: 'Phone Number',
                        email: 'Email'
                    }
                },
                changePassword: {
                    title: 'Change Password',
                    form: {
                        currentPassword: 'Current Password',
                        newPassword: 'New Password',
                        confirmNewPassword: 'Confirm New Password',
                    }
                }
            },
            users: {
                title: 'Users',
            },
            settings: {
                title: 'Settings',
            }
        },
        notFound: {
            title: '404',
            subTitle: 'Page Not Found.',
            content: 'The page you requested could not be found.'
        }
    },
    pageTypes: {
        index: 'Index',
        create: 'Create',
        edit: 'Edit'
    },
    messages: {
        auth: {
            signedIn: "Hey, welcome back! let's start today.",
            signedUp: 'Congratulation, account is created.',
        },
        transaction: {
            saved: 'Transaction is saved.',
            edited: 'Transaction is edited.',
            confirmRemove: 'Are you sure?',
            removed: 'Transaction is removed.',
        }
    },
    btns: {
        auth: {
            signIn: 'Sign In',
            signUp: 'Sign Up',
            signOut: 'Sign Out',
        },
        profile: {
            saveChange: 'Save Changes',
            changePassword: 'Change Password'
        },
        transaction: {
            create: 'Create',
            submit: 'Submit',
            edit: 'Edit',
            remove: 'Remove',
            yes: 'Yes',
            cancel: 'Cancel',
        },
        themeMode: {
            light: 'Light',
            dark: 'Dark'
        },
        other: {
            goBack: 'Go Back'
        }
    },
}