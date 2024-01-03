export default {
    pages: {
        auth: {
            signIn: {
                title: '👋 ជំរាបសួរ, ស្វាគមន៍ការត្រឡប់មកវិញ!',
                subTitle: 'ចូលដោយប្រើទិន្នន័យរបស់អ្នកដែលអ្នកបានបញ្ចូលអំឡុងពេលចុះឈ្មោះរបស់អ្នក។',
                form: {
                    username: 'ឈ្មោះ​អ្នកប្រើប្រាស់',
                    password: 'ពាក្យសម្ងាត់',
                    rememberMe: 'ចងចាំខ្ញុំ'
                },
                components: {
                    forgotPassword: 'ភ្លេចពាក្យសម្ងាត់',
                    noAccount: "មិនមានគណនីមែនទេ?",
                }
            },
            signUp: {
                title: 'ចូលរួមជាមួយពួកយើងថ្ងៃនេះ!',
                subTitle: 'ចុះឈ្មោះឥឡូវនេះ ដើម្បីក្លាយជាសមាជិក។',
                form: {
                    firstName: 'នាមខ្លួន',
                    lastName: 'នាមត្រកូល',
                    email: 'អ៊ីមែល',
                    username: 'ឈ្មោះ​អ្នកប្រើប្រាស់',
                    password: 'ពាក្យសម្ងាត់',
                    confirmPassword: 'បញ្ជាក់ពាក្យសម្ងាត់'
                },
                components: {
                    haveAccount: "មានគណនីរួចហើយ?",
                }
            }
        },
        admin: {
            dashboard: {
                title: 'ផ្ទាំងគ្រប់គ្រង',
            },
            profile: {
                title: 'ប្រវត្តិរូប',
                overview: {
                    title: 'ទិដ្ឋភាពទូទៅ',
                    about: 'អំពី​ខ្ញុំ',
                    profileDetails: {
                        title: 'ព័ត៌មានលំអិតអំពីប្រវត្តិរូប',
                        form: {
                            fullName: 'ឈ្មោះ​ពេញ',
                            company: 'ក្រុមហ៊ុន',
                            job: 'ការងារ',
                            country: 'ប្រទេស',
                            address: 'អាស័យដ្ឋាន',
                            phoneNumber: 'លេខទូរសព្ទ',
                            email: 'អ៊ីមែល'
                        }
                    }
                },
                editProfile: {
                    title: 'កែសម្រួលប្រវត្តិរូប',
                    form: {
                        profileImage: 'រូបភាពប្រវត្តិរូប',
                        firstName: 'នាមខ្លួន',
                        lastName: 'នាមត្រកូល',
                        username: 'ឈ្មោះ​អ្នកប្រើប្រាស់',
                        about: 'អំពី​ខ្ញុំ',
                        company: 'ក្រុមហ៊ុន',
                        job: 'ការងារ',
                        country: 'ប្រទេស',
                        address: 'អាស័យដ្ឋាន',
                        phoneNumber: 'លេខទូរសព្ទ',
                        email: 'អ៊ីមែល'
                    }
                },
                changePassword: {
                    title: 'ផ្លាស់ប្តូរពាក្យសម្ងាត់',
                    form: {
                        currentPassword: 'ពាក្យសម្ងាត់បច្ចុប្បន្ន',
                        newPassword: 'ពាក្យសម្ងាត់​ថ្មី',
                        confirmNewPassword: 'បញ្ជាក់ពាក្យសម្ងាត់ថ្មី',
                    }
                }
            },
            users: {
                title: 'អ្នកប្រើប្រាស់',
            },
            settings: {
                title: 'ការកំណត់',
            }
        },
        notFound: {
            title: '៤០៤',
            subTitle: 'រកមិនឃើញទំព័រ។',
            content: 'រកមិនឃើញទំព័រដែលអ្នកបានស្នើសុំទេ។'
        }
    },
    pageTypes: {
        index: 'បង្ហាញ',
        create: 'បង្កើត',
        edit: 'កែសម្រួល'
    },
    messages: {
        auth: {
            signedIn: "ហេ, ស្វាគមន៍ការត្រឡប់មកវិញ! តោះចាប់ផ្តើមថ្ងៃនេះ។",
            signedUp: 'អបអរសាទរ គណនីត្រូវបានបង្កើតឡើង',
        },
        transaction: {
            saved: 'ប្រតិបត្តិការត្រូវបានរក្សាទុក។',
            edited: 'ប្រតិបត្តិការត្រូវបានកែសម្រួល។',
            confirmRemove: 'តើ​អ្នក​ប្រាកដ​ឬ​អត់?',
            removed: 'ប្រតិបត្តិការត្រូវបានដកចេញ។',
        }
    },
    btns: {
        auth: {
            signIn: 'ចូល',
            signUp: 'ចុះ​ឈ្មោះ',
            signOut: 'ចាកចេញ',
        },
        profile: {
            saveChange: 'រក្សាទុកការផ្លាស់ប្តូរ',
            changePassword: 'ផ្លាស់ប្តូរពាក្យសម្ងាត់'
        },
        transaction: {
            create: 'បង្កើត',
            submit: 'ដាក់ស្នើ',
            edit: 'អាប់ដេត',
            remove: 'ដកចេញ',
            yes: 'បាទ',
            cancel: 'បោះបង់',
        },
        themeMode: {
            light: 'ពន្លឺ',
            dark: 'ងងឹត'
        },
        other: {
            goBack: 'ត្រឡប់​ក្រោយ'
        }
    },
}