import { RolesEnum } from '~/src/shared/enums/RolesEnum';
import { StatusRegisterEnum } from '~/src/shared/enums/StatusRegisterEnum';
import type { AuthorizationConfig } from '../interfaces/AuthorizationInterfaces';

function hasValidRole(userRoles: string[], requiredRoles: string[]): boolean {
  return userRoles.some(role => requiredRoles.includes(role));
}

function areValidRoles(roles: string[]): boolean {
  return roles.every(role => Object.values(RolesEnum).includes(role as RolesEnum));
}

function areValidStatusRegister(user_status_register: string): boolean {
  return Object.values(StatusRegisterEnum).some(status => status === user_status_register);
}

function getNextStepByStatusRegister(
  user_status_register: string,
  configurationAuthorization: AuthorizationConfig
): string {
  const status = configurationAuthorization.status_register.order;
  const index = status.findIndex(status => status === user_status_register);
  if (index === -1) {
    return status[0];
  }

  if (index === status.length - 1) {
    return status[status.length - 1];
  }

  return status[index + 1];
}

function getRoutePrincipalByRole(role: string, configurationAuthorization: AuthorizationConfig): string {
  return configurationAuthorization.redirect.role[role];
}

export { areValidRoles, areValidStatusRegister, hasValidRole, getNextStepByStatusRegister,getRoutePrincipalByRole };