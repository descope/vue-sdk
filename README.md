# Descope SDK for Vue

The Descope SDK for Vue provides convenient access to the Descope for an application written on top of Vue. You can read more on the [Descope Website](https://descope.com).

## Requirements

- The SDK supports Vue version 3 and above.
- A Descope `Project ID` is required for using the SDK. Find it on the [project page in the Descope Console](https://app.descope.com/settings/project).

## Installing the SDK

Install the package with:

```bash
npm i --save @descope/vue-sdk
```

## Usage

### Render it in your application

#### Add Descope plugin to your application

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

#### Use Descope to render specific flow

```js
<template>
	<Descope
		flowId="sign-up-or-in"
		@error="handleError"
		@success="handleSuccess"
	/>
</template>

<script setup>
import { Descope } from '@descope/vue-sdk';

const handleError = (e) => {
	console.log('Got error', e);
};

const handleSuccess = (e) => {
	console.log('Logged in', e);
};
</script>
```

#### Use the `useDescope`, `useSession` and `useUser` functions in your components in order to get authentication state, user details and utilities

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


#### Refresh token lifecycle

Descope SDK is automatically refreshes the session token when it is about to expire. This is done in the background using the refresh token, without any additional configuration.

If the Descope project settings are configured to manage tokens in cookies.
you must also configure a custom domain, and set it as the `baseUrl` to the `descope` plugin. See the above [`plugin` usage](#add-descope-plugin-to-your-application) for usage example.

## Code Example

You can find an example Vue app in the [examples folder](./example).

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

| Env Variable            | Description                                                                                                   | Default value     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------- |

| VUE_APP_DESCOPE_FLOW_ID         | Which flow ID to use in the login page                                                                        | **sign-up-or-in** |
| VUE_APP_DESCOPE_BASE_URL        | Custom Descope base URL                                                                                       | None              |



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
