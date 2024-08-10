import { useAppConfig } from '#app';
import { defineNuxtRouteMiddleware, navigateTo } from '#app';
import type { RouteLocationRaw } from 'vue-router';
import type { UserInterface } from "~/src/shared/interfaces/UserInterface";
import { hasValidRole, areValidRoles, areValidStatusRegister, getNextStepByStatusRegister } from '~/src/modules/auth/register/utils/validations';
import { StatusRegisterEnum } from '~/src/shared/enums/StatusRegisterEnum';
import type { AuthorizationMeta, AuthorizationConfig } from '~/src/modules/auth/register/interfaces/AuthorizationInterfaces';

export default defineNuxtRouteMiddleware((to, from) => {
    const options = useSanctumConfig();
    const authorizationConfig = (useAppConfig().authorization ?? {}) as AuthorizationConfig;
    const { isAuthenticated } = useSanctumAuth();
    const user = useSanctumUser<UserInterface>();

    if (to.meta.authorization == false) {
        return;
    }

    if (!options || !user.value || !isAuthenticated.value) {
        if (options.redirect.onAuthOnly == authorizationConfig.redirect.onLoginExpired) {
            false
        }
        const redirect: RouteLocationRaw = { path: authorizationConfig.redirect.onLoginExpired };
        return navigateTo(redirect);
    }

    const authorization = to.meta.authorization as AuthorizationMeta;

    // SECTION[epic=auth-registration] 
    // TODO[epic=auth-registration]: Implement the logic to redirect the user to the correct page based on the status_register
    // actually only have one step before go to the dashboard
    if (!areValidStatusRegister(user.value.status_register)) {
        return abortNavigation();
    }
 
    const nextStep = getNextStepByStatusRegister(user.value.status_register, authorizationConfig);

    if (nextStep !== StatusRegisterEnum.complete_register && nextStep in authorizationConfig.redirect.status_register) {

        const nextRoute = authorizationConfig.redirect.status_register[nextStep];

        if (to.path !== nextRoute) {
            const redirect: RouteLocationRaw = { path: nextRoute };
            return navigateTo(redirect);
        }
    }
    
    /* if (user.value.status_register === StatusRegisterEnum.select_activity) {
        
        const redirect: RouteLocationRaw = { path: authorizationConfig.redirect.status_register.select_activity };
        return navigateTo(redirect);
    } */
    // !SECTION
    
    if (authorization.validateRoles === false) {
        return;
    }

    if (typeof authorization?.roles == 'undefined' || !Array.isArray(authorization.roles) || !areValidRoles(authorization.roles)) {

        throw new Error('Invalid roles configuration in route meta, if not need validate roles set authorization.validateRoles = false');
    }

    if (!hasValidRole(user.value.roles, authorization.roles)) {
        return abortNavigation();
    }

});

