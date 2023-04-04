<template>
	<div>
		<ContextProvider
			projectId="P2Nb7W8vCwFZ878Iy9r8bjEXYr8K"
			baseUrl="http://localhost:8000"
		>
			<DescopeComponent flowId="sign-in" />
		</ContextProvider>
	</div>
</template>

<script>
import ContextProvider from './ContextProvider';
import DescopeComponent from './DescopeComponent';
// import { ContextProvider, DescopeComponent } from '../../dist';

export default {
	components: {
		ContextProvider,
		DescopeComponent
	}
};
</script>
