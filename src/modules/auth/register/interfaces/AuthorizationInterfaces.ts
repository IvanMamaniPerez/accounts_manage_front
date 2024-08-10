import type { StatusRegisterEnum } from "~/src/shared/enums/StatusRegisterEnum";

interface AuthorizationMeta {
    roles: string[];
    validateRoles: boolean;
}

interface AuthorizationConfig {
    redirect: {
        onForbiden: string;
        onLoginExpired: string;
        status_register: {
            [key : string]: string;
        };
        role: {
            [key: string]: string;
        }
    },
    status_register: {
        order: StatusRegisterEnum[];
    }
}

export type { AuthorizationMeta, AuthorizationConfig };