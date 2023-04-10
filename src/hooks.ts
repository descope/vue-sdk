/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { computed, inject, watch } from 'vue';
import { DESCOPE_INJECTION_KEY } from './constants';

export const useOptions = () => inject(DESCOPE_INJECTION_KEY)!.options;

export const useDescope = () => inject(DESCOPE_INJECTION_KEY)!.sdk;

export const useSession = () => {
	const { session } = inject(DESCOPE_INJECTION_KEY)!;

	if (session.isFetchSessionWasNeverCalled.value) {
		session.fetchSession();
	}

	return {
		isLoading: computed(
			() =>
				session.isLoading.value || session.isFetchSessionWasNeverCalled.value
		),
		sessionToken: session.session,
		isAuthenticated: computed(() => !!session.session)
	};
};

export const useUser = () => {
	const { user, session } = inject(DESCOPE_INJECTION_KEY)!;

	watch(session.session, () => {
		if (user.isFetchUserWasNeverCalled.value && session.session.value) {
			user.fetchUser();
		}
	});

	return {
		isLoading: computed(
			() => user.isLoading.value || user.isFetchUserWasNeverCalled.value
		),
		user: user.user
	};
};
