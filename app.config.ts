export default defineAppConfig({
    ui: {
        strategy: 'override',
        button: {
            color: {
                primary: {
                    solid: 'bg-slate-600 hover:bg-slate-700 dark:bg-white text-white dark:text-blue-900 dark:hover:bg-gray-600 dark:hover:text-white'
                },
                secondary: {
                    solid: 'bg-white dark:bg-white-800'
                }
            }
        },
        card: {
            background: 'bg-white dark:bg-neutral-800 text-black dark:text-white'
        },
        formGroup: {
            base: 'block font-medium text-gray-700 dark:text-white-200'
        },
        input: {
            color: {
                white: {
                    outline: 'shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-700'
                }
            }
        },
    },
    authorization: {
        redirect: {
            onForbiden: '/auth/forbiden',
            onLoginExpired: '/auth/login',
            status_register: {
                select_activity: '/auth/select-activity',
                validate_email: '/auth/validate-email',
            },
            role: {
                admin: '/admin',
                user: '/client',
                seller: '/seller',
            }
        },
        status_register: {
            order: [
                'basic_register',
                'select_activity',
                'validate_email',
                'complete_register',
            ],
        }
    }
})