<script lang="ts">
	import ApiListElement from './ApiListElement.svelte';

	let elements: {
		route: string;
		routeName: string;
	}[] = [
		{
			route: '/api/docs/users',
			routeName: 'Users'
		},
		{
			route: '/api/docs/exerciseCategories',
			routeName: 'Exercise Categories'
		},
		{
			route: '/api/docs/bodyProfiles',
			routeName: 'Body Profiles'
		},
		{
			route: '/api/docs/doneExercises',
			routeName: 'Done Exercises'
		},
		{
			route: '/api/docs/exercises',
			routeName: 'Exercises'
		},
		{
			route: '/api/docs/posts',
			routeName: 'Posts'
		},
		{
			route: '/api/docs/trainingPlans',
			routeName: 'Training Plans'
		}
	];
</script>

<div class="p-5 fixed">
	<h1 class="text-2xl text-purple-600">Contents:</h1>
	<ul class="list-disc m-4">
		{#each elements as element}
			<li class="text-purple-500">
				<ApiListElement {...element} />
			</li>
		{/each}
	</ul>
</div>
