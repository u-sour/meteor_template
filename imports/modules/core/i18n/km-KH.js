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
        notFound: {
            title: '៤០៤',
            subTitle: 'រកមិនឃើញទំព័រ។',
            content: 'រកមិនឃើញទំព័រដែលអ្នកបានស្នើសុំទេ។'
        }
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
        transaction: {
            create: 'បង្កើត',
            submit: 'ដាក់ស្នើ',
            edit: 'អាប់ដេត',
            remove: 'ដកចេញ',
            yes: 'បាទ',
            cancel: 'បោះបង់',
        },
        other: {
            goBack: 'ត្រឡប់​ក្រោយ'
        }
    },
}