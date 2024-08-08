const tokenStorageKey = 'sanctum.storage.token';
const localTokenStorage = {
    get: async () => {
        if (import.meta.server) {
            return undefined;
        }

        return window.localStorage.getItem(tokenStorageKey) ?? undefined;
    },

    set: async (app: any, token?: string) => {
        if (import.meta.server) {
            return;
        }

        if (!token) {
            window.localStorage.removeItem(tokenStorageKey);
            return;
        }

        window.localStorage.setItem(tokenStorageKey, token);
    },
};

export default defineAppConfig({
    sanctum: {
        tokenStorage: localTokenStorage,
    },
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
})