<script lang="ts">
	import { page } from '$app/stores';
	import Docs from '$lib/layouts/Docs.svelte';
	import Sidebar, { type NavParent, type NavTree } from '$lib/layouts/Sidebar.svelte';
	import { preferredPlatform, preferredVersion } from '$lib/utils/references';

	$: expandable = $page.url.pathname.startsWith('/docs/references/');
	$: prefix = `/docs/references/${$preferredVersion ?? $page.params?.version ?? 'cloud'}/${
		$preferredPlatform ?? $page.params?.platform ?? 'client-web'
	}`;
	$: navigation = [
		{
			label: 'Getting started',
			items: [
				{
					label: 'Overview',
					href: '/docs/references',
					icon: 'icon-view-grid'
				}
			]
		},
		{
			label: 'Services',
			items: [
				{
					label: 'Account',
					icon: 'icon-user',
					href: `${prefix}/account`
				},
				{
					label: 'Users',
					icon: 'icon-user-group',
					href: `${prefix}/users`
				},
				{
					label: 'Teams',
					icon: 'icon-users',
					href: `${prefix}/teams`
				},
				{
					label: 'Databases',
					icon: 'icon-database',
					href: `${prefix}/databases`
				},
				{
					label: 'Storage',
					icon: 'icon-cloud',
					href: `${prefix}/storage`
				},
				{
					label: 'Functions',
					icon: 'icon-code',
					href: `${prefix}/functions`
				},
				{
					label: 'Localization',
					icon: 'icon-globe',
					href: `${prefix}/locale`
				},
				{
					label: 'Avatars',
					icon: 'icon-user',
					href: `${prefix}/avatars`
				}
			]
		}
	] as NavTree;

	const parent: NavParent = {
		href: '/docs',
		label: 'References'
	};
</script>

<Docs variant={expandable ? 'expanded' : 'two-side-navs'}>
	<Sidebar {navigation} {expandable} {parent} />
	<slot />
</Docs>