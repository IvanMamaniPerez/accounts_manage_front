import { useAppConfig } from '#app';
import { defineNuxtRouteMiddleware, navigateTo } from '#app';
import type { RouteLocationRaw } from 'vue-router';
import type { UserInterface } from "~/src/shared/interfaces/UserInterface";
import { hasValidRole, areValidRoles, areValidStatusRegister, getNextStepByStatusRegister } from '~/src/modules/auth/register/utils/validations';
import { StatusRegisterEnum } from '~/src/shared/enums/StatusRegisterEnum';
import type { AuthorizationMeta, AuthorizationConfig } from '~/src/modules/auth/register/interfaces/AuthorizationInterfaces';

export default defineNuxtRouteMiddleware((to, from) => {
    console.log('in authroization 1')
    if (to.meta.authorization == false) {
        return;
    }

    const options = useSanctumConfig();
    const authorizationConfig = (useAppConfig().authorization ?? {}) as AuthorizationConfig;
    const { isAuthenticated } = useSanctumAuth();
    const user = useSanctumUser<UserInterface>();

    if (!options || !user.value || !isAuthenticated.value) {
        if (options.redirect.onAuthOnly == authorizationConfig.redirect.onLoginExpired) {
            return;
        }
        const redirect: RouteLocationRaw = { path: authorizationConfig.redirect.onLoginExpired };
        return navigateTo(redirect);
    }
    console.log('in authroization 2')
    const authorization = to.meta.authorization as AuthorizationMeta;

    // SECTION[epic=auth-registration] 
    // TODO[epic=auth-registration]: Implement the logic to redirect the user to the correct page based on the status_register
    // actually only have one step before go to the dashboard
    if (!areValidStatusRegister(user.value.status_register)) {
        console.log('in authroization 2.1')
        console.log('user', user.value)
        console.log('register status', user.value.status_register)
        return abortNavigation();
    }


    if (user.value.email_verified_at === null) {
        const pathValidateEmail = authorizationConfig.redirect.onValidateEmail;
        if (to.path === pathValidateEmail) {
            return;
        }
        console.log('in authroization 4')
        const redirect: RouteLocationRaw = { path: pathValidateEmail };
        console.log('redirect', redirect)
        console.log('to', to.path)
        console.log('from', from.path)

        return navigateTo(redirect);

    }
    console.log('in authroization 3')

    const nextStep = getNextStepByStatusRegister(user.value.status_register, authorizationConfig);

    if (nextStep !== StatusRegisterEnum.complete_register && nextStep in authorizationConfig.redirect.status_register) {

        const nextRoute = authorizationConfig.redirect.status_register[nextStep];

        if (to.path !== nextRoute) {
            const redirect: RouteLocationRaw = { path: nextRoute };
            return navigateTo(redirect);
        }
    }
    // !SECTION

    if (user.value.roles.length === 0) {
        const redirect : RouteLocationRaw = { path: authorizationConfig.redirect.status_register.select_activity };
        if (to.path === redirect.path) {
            return;
        }
        return navigateTo(redirect, { replace: true });
    }


    if (authorization.validateRoles === false) {
        return;
    }

    if (typeof authorization?.roles == 'undefined' || !Array.isArray(authorization.roles) || !areValidRoles(authorization.roles)) {

        throw new Error('Invalid roles configuration in route meta, if not need validate roles set authorization.validateRoles = false' + to.path);
    }


    console.log('en authorizacion', user.value)


    if (!hasValidRole(user.value.roles, authorization.roles)) {
        return navigateTo('/');
    }

});

