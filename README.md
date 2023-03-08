# Descope SDK for Vue.js

The Descope SDK for Vue.js provides convenient access to the Descope for an application written on top of Vue.js. You can read more on the [Descope Website](https://descope.com).

## Requirements

## Installing the SDK

Install the package with:

```bash
npm i --save @descope/vue-sdk
```

## Code Example

You can find an example react app in the [examples folder](./examples).

### Setup

To run the examples, set your `Project ID` by setting the `DESCOPE_PROJECT_ID` env var or directly
in the sample code.
Find your Project ID in the [Descope console](https://app.descope.com/settings/project).

```bash
export DESCOPE_PROJECT_ID=<Project-ID>
```

Alternatively, put the environment variable in `.env` file in the project root directory.
See bellow for an `.env` file template with more information.

### Run Example

Run the following command in the root of the project to build and run the example:

```bash
npm i && npm start
```

### Example Optional Env Variables

See the following table for customization environment variables for the example app:

| Env Variable            | Description                                                                                                   | Default value     |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------- |
| DESCOPE_FLOW_ID         | Which flow ID to use in the login page                                                                        | **sign-up-or-in** |
| DESCOPE_BASE_URL        | Custom Descope base URL                                                                                       | None              |
| DESCOPE_THEME           | Flow theme                                                                                                    | None              |
| DESCOPE_REDIRECT_URL    | Flow redirect URL for OAuth/SSO/Magic Link/Enchanted Link                                                     | None              |
| DESCOPE_TENANT_ID       | Flow tenant ID for SSO/SAML                                                                                   | None              |
| DESCOPE_DEBUG_MODE      | **"true"** - Enable debugger</br>**"false"** - Disable flow debugger                                          | None              |
| DESCOPE_STEP_UP_FLOW_ID | Step up flow ID to show to logged in user (via button). e.g. "step-up". Button will be hidden if not provided | None              |
| DESCOPE_TELEMETRY_KEY   | **String** - Telemetry public key provided by Descope Inc                                                     | None              |
|                         |                                                                                                               |                   |

Example for `.env` file template:

```
# Your project ID
DESCOPE_PROJECT_ID="<Project-ID>"
# Login flow ID
DESCOPE_FLOW_ID=""
# Descope base URL
DESCOPE_BASE_URL=""
# Set flow theme to dark
DESCOPE_THEME=dark
# Flow Redirect URL
DESCOPE_REDIRECT_URL=""
# Tenant ID
DESCOPE_TENANT_ID=""
# Enable debugger
DESCOPE_DEBUG_MODE=true
# Show step-up flow for logged in user
DESCOPE_STEP_UP_FLOW_ID=step-up
# Telemetry key
DESCOPE_TELEMETRY_KEY=""
```

## Learn More

To learn more please see the [Descope Documentation and API reference page](https://docs.descope.com/).

## Contact Us

If you need help you can email [Descope Support](mailto:support@descope.com)

## License

The Descope SDK for Vue.js is licensed for use under the terms and conditions of the [MIT license Agreement](./LICENSE).
