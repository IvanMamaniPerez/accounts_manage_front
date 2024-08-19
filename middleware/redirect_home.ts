import type { AuthorizationConfig } from "~/src/modules/auth/register/interfaces/AuthorizationInterfaces";
import { getRoutePrincipalByRole } from "~/src/modules/auth/register/utils/validations";
import type { UserInterface } from "~/src/shared/interfaces/UserInterface";
import type { RouteLocationRaw } from 'vue-router';
export default defineNuxtRouteMiddleware((to, from) => {

    const user = useSanctumUser<UserInterface>();
    const authorizationConfig = (useAppConfig().authorization ?? {}) as AuthorizationConfig;
    if (!user.value || !user.value.roles || user.value.roles.length === 0) {
        throw new Error('User without roles');
    }

    const homePath = getRoutePrincipalByRole(user.value.roles[0], authorizationConfig);
    if(homePath === undefined) {
        throw new Error('Role without home path');
    }
    console.log('homePath', homePath, authorizationConfig.redirect.role, user.value.roles[0]);    
    const redirect: RouteLocationRaw = { path: homePath };
    return navigateTo(redirect, { replace: true });

})
