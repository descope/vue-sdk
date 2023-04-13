/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { computed, inject, watch } from 'vue';
import { DESCOPE_INJECTION_KEY } from './constants';

const injectDescope = () => {
	const context = inject(DESCOPE_INJECTION_KEY);
	if (!context)
		throw Error(
			'Missing Descope context, make sure you are using the Descope plugin'
		);

	return context;
};

export const useOptions = () => injectDescope().options;

export const useDescope = () => injectDescope().sdk;

export const useSession = () => {
	const { session } = injectDescope();

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
	const { user, session } = injectDescope();

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
