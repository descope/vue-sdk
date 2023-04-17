// src/plugins/auth.js

import { App, Ref, computed, readonly, ref, unref, watch } from 'vue';
import createSdk from '@descope/web-js-sdk';
import { DESCOPE_INJECTION_KEY, baseHeaders } from './constants';
import { UserData, type Options } from './types';

const routeGuardInternal = ref<(() => Promise<boolean>) | null>(null);
export const routeGuard = () => unref(routeGuardInternal)?.();

export default {
	install: function (app: App, options: Options) {
		const sdk = createSdk({
			persistTokens: true,
			autoRefresh: true,
			baseHeaders,
			...options
		});

		const isSessionLoading = ref<boolean | null>(null);
		const sessionToken = ref('');

		const isUserLoading = ref<boolean | null>(null);
		const user = ref<UserData>(null);

		sdk.onSessionTokenChange((s) => {
			sessionToken.value = s;
		});

		sdk.onUserChange((u) => {
			user.value = u;
		});

		const fetchSession = async () => {
			isSessionLoading.value = true;
			await sdk.refresh();
			isSessionLoading.value = false;
		};

		const fetchUser = async () => {
			isUserLoading.value = true;
			await sdk.me();
			isUserLoading.value = false;
		};

		const isFetchSessionWasNeverCalled = computed(
			() => isSessionLoading.value === null
		);

		const isFetchUserWasNeverCalled = computed(
			() => isUserLoading.value === null
		);

		watch(sessionToken, () => {
			if (!sessionToken.value) {
				user.value = null;
			}
		});

		// we need to share some logic between the plugin and the routeGuard
		// maybe there is a better way to do it
		routeGuardInternal.value = async () => {
			if (!sessionToken.value && isFetchSessionWasNeverCalled.value) {
				await fetchSession();
			}
			return !!unref(sessionToken);
		};

		app.provide(DESCOPE_INJECTION_KEY, {
			session: {
				fetchSession,
				isLoading: readonly(isSessionLoading),
				session: readonly(sessionToken),
				isFetchSessionWasNeverCalled
			},
			user: {
				fetchUser,
				isLoading: readonly(isUserLoading),
				user: readonly(user) as Ref<UserData>,
				isFetchUserWasNeverCalled
			},
			sdk,
			options
		});
	}
};
