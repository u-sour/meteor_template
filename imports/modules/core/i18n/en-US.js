export default {
  pages: {
    auth: {
      signIn: {
        title: '👋 Hello, Welcome Back!',
        subTitle:
          'Sign in with your data that you entered during your registration.',
        form: {
          username: 'Username',
          password: 'Password',
          rememberMe: 'Remember Me',
        },
        components: {
          forgotPassword: 'Forgot Password',
          noAccount: "Don't have an account?",
        },
      },
      signUp: {
        title: 'Join us today!',
        subTitle: 'Sign up now to become a member.',
        form: {
          firstName: 'First Name',
          lastName: 'Last Name',
          username: 'Username',
          email: 'Email',
          phoneNumber: 'Phone Number',
          password: 'Password',
          confirmPassword: 'Confirm Password',
        },
        components: {
          haveAccount: 'Already have an account?',
        },
      },
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
              email: 'Email',
            },
          },
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
            email: 'Email',
          },
        },
        changePassword: {
          title: 'Change Password',
          form: {
            currentPassword: 'Current Password',
            newPassword: 'New Password',
            confirmNewPassword: 'Confirm New Password',
          },
        },
      },
      // note: comment EDT meaning for easy data table header labels
      users: {
        title: 'Users',
        form: {
          profileImage: 'Profile Image',
          firstName: 'First Name',
          lastName: 'Last Name',
          fullName: 'Full Name', // EDT
          username: 'Username',
          about: 'About',
          company: 'Company',
          job: 'Job',
          country: 'Country',
          address: 'Address',
          phoneNumber: 'Phone Number',
          password: 'Password',
          edit: {
            changePassword: 'Do you want to change a new password?',
            newPassword: 'New Password',
          },
          email: 'Email',
          roles: {
            label: 'Roles',
            help: 'Select user roles',
          },
          status: 'Status', // EDT
          operation: 'Operation', // EDT
        },
      },
      settings: {
        title: 'Settings',
      },
    },
    notFound: {
      title: '404',
      subTitle: 'Page Not Found.',
      content: 'The page you requested could not be found.',
    },
  },
  pageTypes: {
    index: 'Index',
    create: 'Create',
    edit: 'Edit',
  },
  pageFilter: {
    search: 'Search...',
    rowsPerPage: 'Records Per Page:',
  },
  messages: {
    auth: {
      signedIn: "Hey, welcome back! let's start today.",
      signedUp: 'Congratulation, this account is created.',
      edited: 'Congratulation, this account is edited.',
      removed: 'Congratulation, this account is removed.',
      401: 'Sorry, you are not authorized to access.',
      403: 'Sorry, you are not allowed to proceed.',
    },
    user: {
      updateProfile: 'Congratulation, Profile have been changed.',
      changePassword: {
        success: 'Congratulation, this account password is changed.',
        error: 'Sorry, the current password is incorrect.',
      },
    },
    transaction: {
      saved: 'Congratulation, this transaction is saved.',
      edited: 'Congratulation, this transaction is edited.',
      confirm: 'Are you sure want to remove this record?',
      removed: 'Congratulation, this transaction is removed.',
    },
    other: {
      loading: 'Loading Data ...',
      processing: 'Processing ...',
      emptyData: 'No Available Data',
    },
  },
  btns: {
    auth: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
    },
    profile: {
      saveChange: 'Save Changes',
      changePassword: 'Change Password',
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
      dark: 'Dark',
    },
    other: {
      goBack: 'Go Back',
    },
  },
}
