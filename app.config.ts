export default defineAppConfig({
    ui: {
        strategy: 'override',
        button: {
            color: {
                primary: {
                    //solid: 'bg-slate-600 hover:bg-slate-700 dark:bg-white text-white dark:text-indigo-500 dark:hover:bg-gray-600 dark:hover:text-white'
                    solid: 'rounded-md bg-blue-500 dark:bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 dark:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
                },
                secondary: {
                    solid: 'bg-gray-100 ring-1 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/5 text-gray-700 dark:text-white dark:hover:text-white'
                }
            },
            variant:{
                link: 'text-{color}-500 hover:text-{color}-600 disabled:text-{color}-500 dark:text-{color}-500 dark:hover:text-{color}-500 dark:disabled:text-{color}-400 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400',
            }
        },
        card: {
            background: 'bg-white dark:bg-gray-300/5 text-black dark:text-white'
        },
        formGroup: {
            base: 'block font-medium text-gray-700 dark:text-white-200'
        },
        input: {
            color: {
                white: {
                    outline: 'shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-500'
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