# Descope Vue SDK

The Descope Vue SDK provides convenient access to the Descope for an application written on top of Vue.  
You can read more on the [Descope Website](https://descope.com).

## Requirements

- The SDK supports Vue version 3 and above.
- A Descope `Project ID` is required for using the SDK. Find it on the [project page in the Descope Console](https://app.descope.com/settings/project).

## Installing the SDK

Install the package with:

```bash
npm i --save @descope/vue-sdk
```

## Usage

### Add Descope plugin to your application

```js
import { createApp } from 'vue';
import App from './App.vue';
import descope from '@descope/vue-sdk';

const app = createApp(App);
app.use(descope, {
	projectId: 'my-project-id'
	// If the Descope project manages the token response in cookies, a custom domain
	// must be configured (e.g., https://auth.app.example.com)
	// and should be set as the baseUrl property.
	// baseUrl: https://auth.app.example.com'
});
app.mount('#app');
```

### Use Descope to render specific flow

```vue
<template>
	<Descope flowId="my-flow-id" @error="handleError" @success="handleSuccess" />
	<!-- additional props -->
	<!-- theme="dark" theme can be "light", "dark" or "os", which auto select a theme based on the OS theme. Default is "light" -->
	<!-- v-bind:debug="true" debug can be set to true to enable debug mode -->
	<!-- locale="en" locale can be any supported locale which the flow's screen translated to, if not provided, the locale is taken from the browser's locale. -->
	<!-- tenant="tenantId" tenant ID for SSO (SAML) login. If not provided, Descope will use the domain of available email to choose the tenant -->
	<!-- redirectUrl="redirectUrl" Redirect URL for OAuth and SSO (will be used when redirecting back from the OAuth provider / IdP), or for "Magic Link" and "Enchanted Link" (will be used as a link in the message sent to the the user) -->
	<!-- autoFocus="skipFirstScreen" autoFocus can be true, false or "skipFirstScreen". Default is true. - true: automatically focus on the first input of each screen - false: do not automatically focus on screen's inputs - "skipFirstScreen": automatically focus on the first input of each screen, except first screen -->
	<!-- errorTransformer="errorTransformer" errorTransformer is a function that receives an error object and returns a string. The returned string will be displayed to the user. NOTE: errorTransformer is not required. If not provided, the error object will be displayed as is. -->
	<!-- form="{ email: 'test@domain.com' }" form is an object the initial form context that is used in screens inputs in the flow execution. Used to inject predifined input values on flow start such as custom inputs, custom attrbiutes and other inputs. Keys passed can be accessed in flows actions, conditions and screens prefixed with "form.". NOTE: form is not required. If not provided, 'form' context key will be empty before user input. -->
	<!-- client="{ version: '1.2.3' }" client is an object the initial client context in the flow execution. Keys passed can be accessed in flows actions and conditions prefixed with "client.". NOTE: client is not required. If not provided, context key will be empty. -->
</template>

<script setup>
import { Descope } from '@descope/vue-sdk';

const handleError = (e) => {
	console.log('Could not log in', e);
};

const handleSuccess = (e) => {
	console.log('Logged in!', e);
};

// let tenantId = '<tenantId>'; // replace with your tenant ID
// let redirectUrl = '<redirectUrl>'; // replace with your redirect URL

// const errorTransformer = (error) => {
//   const translationMap = {
//     SAMLStartFailed: 'Failed to start SAML flow'
//   };
//   return translationMap[error.type] || error.text;
// };
</script>
```

### Use the `useDescope`, `useSession` and `useUser` functions in your components in order to get authentication state, user details and utilities

This can be helpful to implement application-specific logic. Examples:

- Render different components if current session is authenticated
- Render user's content
- Logout button

```js
<template>
	<div>
		<div v-if="isSessionLoading || isUserLoading">Loading ...</div>
		<div v-else-if="isAuthenticated">
			<div>Hello {{ user?.name }}</div>
			<button @click="logout">Logout</button>
		</div>
		<div v-else>You are not logged in</div>
	</div>
</template>

<script setup>
import { useDescope, useSession, useUser } from '../../src';

const { isAuthenticated, isSessionLoading } = useSession();
const { user, isUserLoading } = useUser();
const { logout } = useDescope();
</script>
```

Note: `useSession` triggers a single request to the Descope backend to attempt to refresh the session. If you **don't** `useSession` on your app, the session will not be refreshed automatically. If your app does not require `useSession`, you can trigger the refresh manually by calling `refresh` from `useDescope` hook.

**For more SDK usage examples refer to [docs](https://docs.descope.com/build/guides/client_sdks/)**

### Session token server validation (pass session token to server API)

When developing a full-stack application, it is common to have private server API which requires a valid session token:

![session-token-validation-diagram](https://docs.descope.com/static/SessionValidation-cf7b2d5d26594f96421d894273a713d8.png)

Note: Descope also provides server-side SDKs in various languages (NodeJS, Go, Python, etc). Descope's server SDKs have out-of-the-box session validation API that supports the options described bellow. To read more about session validation, Read [this section](https://docs.descope.com/build/guides/gettingstarted/#session-validation) in Descope documentation.

There are 2 ways to achieve that:

1. Using `getSessionToken` to get the token, and pass it on the `Authorization` Header (Recommended)
2. Passing `sessionTokenViaCookie` boolean option when initializing the plugin (Use cautiously, session token may grow, especially in cases of using authorization, or adding custom claim)

#### 1. Using `getSessionToken` to get the token

An example for api function, and passing the token on the `Authorization` header:

```js
import { getSessionToken } from '@descope/vue-sdk';

// fetch data using back
// Note: Descope backend SDKs support extracting session token from the Authorization header
export const fetchData = async () => {
	const sessionToken = getSessionToken();
	const res = await fetch('/path/to/server/api', {
		headers: {
			Authorization: `Bearer ${sessionToken}`
		}
	});
	// ... use res
};
```

#### 2. Passing `sessionTokenViaCookie` option when initializing the plugin

When doing so, Descope SDK will automatically store session token on the `DS` cookie.

Note: Use this option if session token will stay small (less than 1k). Session token can grow, especially in cases of using authorization, or adding custom claims

Example:

```js
import { createApp } from 'vue';
import App from './components/App.vue';
import descope from '@descope/vue-sdk';

const app = createApp(App);

app.use(descope, {
	projectId: 'project-id',
	sessionTokenViaCookie: true
});
```

Now, whenever you call `fetch`, the cookie will automatically be sent with the request.  
Descope backend SDKs also support extracting the token from the `DS` cookie.

### Get the Descope SDK instance

In case you need the SDK instance outside the Vue application, you can use the `getSdk` function

**Make sure to call it only after initializing the descope plugin, this is where the SDK instance is actually created, otherwise you will no instance.**

For example:

```js
import { createApp } from 'vue';
import App from './components/App.vue';
import descope, { getSdk } from '../src';

const app = createApp(App);

app.use(descope, {
	projectId: 'project-id'
});

const sdk = getSdk();

sdk?.onSessionTokenChange((newSession) => {
	// here you can implement custom logic when the session is changing
});
```

### Helper Functions

You can also use the following functions to assist with various actions managing your JWT.

`getSessionToken()` - Get current session token.
`getRefreshToken()` - Get current refresh token.
`refresh(token = getRefreshToken())` - Force a refresh on current session token using an existing valid refresh token.
`getJwtRoles(token = getSessionToken(), tenant = '')` - Get current roles from an existing session token. Provide tenant id for specific tenant roles.
`getJwtPermissions(token = getSessionToken(), tenant = '')` - Fet current permissions from an existing session token. Provide tenant id for specific tenant permissions.

### Refresh token lifecycle

Descope SDK is automatically refreshes the session token when it is about to expire. This is done in the background using the refresh token, without any additional configuration.

If the Descope project settings are configured to manage tokens in cookies.
you must also configure a custom domain, and set it as the `baseUrl` to the `descope` plugin. See the above [`plugin` usage](#add-descope-plugin-to-your-application) for usage example.

## Code Example

You can find an example Vue app in the [example folder](./example).

### Setup

To run the examples, set your `Project ID` by setting the `DESCOPE_PROJECT_ID` env var or directly
in the sample code.
Find your Project ID in the [Descope console](https://app.descope.com/settings/project).

```bash
export VUE_APP_DESCOPE_PROJECT_ID=<Project-ID>
```

Alternatively, put the environment variable in `.env.local` file in the project root directory.
See bellow for an `.env.local` file template with more information.

### Run Example

Run the following command in the root of the project to build and run the example:

```bash
npm i && npm start
```

### Example Optional Env Variables

See the following table for customization environment variables for the example app:

| Env Variable             | Description                            | Default value     |
| ------------------------ | -------------------------------------- | ----------------- |
| VUE_APP_DESCOPE_FLOW_ID  | Which flow ID to use in the login page | **sign-up-or-in** |
| VUE_APP_DESCOPE_BASE_URL | Custom Descope base URL                | None              |

Example for `.env.local` file template:

```
# Your project ID
VUE_APP_DESCOPE_PROJECT_ID="<Project-ID>"
# Login flow ID
VUE_APP_DESCOPE_FLOW_ID=""
# Descope base URL
VUE_APP_DESCOPE_BASE_URL=""
```

## Learn More

To learn more please see the [Descope Documentation and API reference page](https://docs.descope.com/).

## Contact Us

If you need help you can email [Descope Support](mailto:support@descope.com)

## License

The Descope SDK for React is licensed for use under the terms and conditions of the [MIT license Agreement](./LICENSE).
