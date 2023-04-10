import createSdk from '@descope/web-js-sdk';
import type { Ref } from 'vue';

export type Options = {
	projectId: string;
	baseUrl: string;
	sessionTokenViaCookie: boolean;
};

type Sdk = ReturnType<typeof createSdk>;

export type UserData = Exclude<
	Awaited<ReturnType<Sdk['me']>>['data'],
	undefined
>;

type Session = {
	fetchSession: () => Promise<void>;
	isLoading: Ref<boolean | null>;
	session: Ref<string>;
	isFetchSessionWasNeverCalled: Ref<boolean>;
};

type User = {
	fetchUser: () => Promise<void>;
	isLoading: Ref<boolean | null>;
	user: Ref<UserData>;
	isFetchUserWasNeverCalled: Ref<boolean>;
};

export type Context = {
	options: Options;
	sdk: Sdk;
	user: User;
	session: Session;
};
