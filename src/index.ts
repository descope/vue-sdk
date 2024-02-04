export { default as Descope } from './Descope.vue';
export { default as UserManagement } from './UserManagement.vue';
export { useDescope, useSession, useUser } from './hooks';
export { default, routeGuard, getSdk } from './plugin';
export {
	getJwtPermissions,
	getJwtRoles,
	getRefreshToken,
	getSessionToken
} from './sdk';
