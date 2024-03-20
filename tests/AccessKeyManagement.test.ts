import { shallowMount, mount } from '@vue/test-utils';
import AccessKeyManagement from '../src/AccessKeyManagement.vue';

jest.mock('../src/hooks', () => ({
	useOptions: () => ({ projectId: 'project1', baseUrl: 'baseUrl' }),
	useDescope: () => ({ httpClient: { hooks: { afterRequest: jest.fn() } } }),
	useUser: () => ({}),
	useSession: () => ({})
}));

globalThis.Response = <any>class {};

describe('AccessKeyManagement.vue', () => {
	it('renders the widget', () => {
		const wrapper = shallowMount(AccessKeyManagement, {
			props: { tenant: 'flow1' }
		});
		expect(wrapper.find('descope-access-key-management-widget').exists()).toBe(
			true
		);
	});

	it('renders a widget with the correct props', () => {
		const wrapper = mount(AccessKeyManagement, {
			props: {
				tenant: 'test-tenant',
				theme: 'test-theme',
				locale: 'test-locale',
				debug: true
			}
		});

		const descopeWc = wrapper.find('descope-access-key-management-widget');
		expect(descopeWc.exists()).toBe(true);
		expect(descopeWc.attributes('project-id')).toBe('project1');
		expect(descopeWc.attributes('base-url')).toBe('baseUrl');
		expect(descopeWc.attributes('theme')).toBe('test-theme');
		expect(descopeWc.attributes('tenant')).toBe('test-tenant');
		expect(descopeWc.attributes('debug')).toBe('true');
	});
});
