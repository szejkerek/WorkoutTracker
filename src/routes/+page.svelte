<script lang="ts">
	import TodoList from '$lib/todo-list/TodoList.svelte';
	import { prevent_default } from 'svelte/internal';

	export let data: App.PageData;
	let a: Number;
	let b: Number;
	let sum: Number = 0;

	const add = async (x: Number, y: Number) => {
		const response = await fetch('/api/add', {
			method: 'POST',
			body: JSON.stringify({ x, y }),
			headers: {
				'content-type': 'application/json'
			}
		});

		sum = await response.json();
	};

	const addUser = async (event: Event) => {
		const now = new Date();
		const dummyUser: User = {
			username: "debil1",
			password: "metin2pl123",
			email: "tomek.gaworek@o2.pl",
			staticInfo: {
				age: 11,
				avatarPath: "/avatars/debil1.png",
				gender: "Male",
				displayName: "xXtomek327pl",
				heightInCM: 1
			}
		};

		const response = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify(dummyUser)
		});
		const result = await response.json();

		if(result.code !== 1) {
			console.log("🥶🥶🥶🥶🥶🥶");
		}
		else {
			console.log("Added new user: ");
			console.log(result.data);
		}
	}

	const getUsers = async () => {
		const response = await fetch('/api/users', {
			method: 'GET'
		});
		const result = await response.json();

		if(result.code !== 1) {
			console.log("🤦‍♀️🤦‍♀️🤦‍♀️🤦‍♀️🤦‍♀️🤦‍♀️");
		}
		else {
			console.log("Users in database: ");
			console.log(result.data);
		}
	}

	const addCategory = async () => {
		const newCategory: UserCategory = {
			name: "Łapy",
			userId: "8tqZOCuyrVfhSROWATtM",
			note: "bicek"
		};
		const response = await fetch('/api/exerciseCategories', {
			method: 'POST',
			body: JSON.stringify(newCategory)
		});
		const result = await response.json();

		if(result.code !== 1) {
			console.log("🥶🥶🥶🥶🥶🥶");
		}
		else {
			console.log("Added new category: ");
			console.log(result.data);
		}
	}

	const addProfile = async () => {
		const now = new Date();
		const newProfile: BodyProfile = {
			weightInKG: 10,
			bodyFatInPercentage: 1,
			muscleWeightInKG: 11,
			dateOfMeasurement: `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
			userId: "8tqZOCuyrVfhSROWATtM"
		};

		const response = await fetch('/api/bodyProfiles', {
			method: 'POST',
			body: JSON.stringify(newProfile)
		});
		const result = await response.json();

		if(result.code !== 1) {
			console.log("🥶🥶🥶🥶🥶🥶");
		}
		else {
			console.log("Added new profile: ");
			console.log(result.data);
		}
	}
</script>

<div class="flex py-3 flex-grow flex-col align-middle bg-gray-300">
	<h1 class="text-blue-600 text-center text-5xl">
		Examplary todo app {data.value}
	</h1>

	<form on:submit|preventDefault={addUser}>
		<input name="username" placeholder="usmr" />
		<input name="pwd" placeholder="usmr" />
		<button class="btn btn-primary" type="submit">Na testa :3</button>
	</form>
	
	<button on:click={() => getUsers()} class="btn btn-primary">Na testa 2 :3</button>
	<button on:click={() => addCategory()} class="btn btn-primary">Na testa 3 :3</button>
	<button on:click={() => addProfile()} class="btn btn-primary">Na testa 4 :3</button>

	{#if data.cos !== null}
		<h2 class="text-blue-500 text-center text-4xl">
			Secret info: {data.cos}
		</h2>
	{/if}

	<div class="flex flex-row justify-around w-1/2 mx-auto my-5 text-red-400">
		<h3 class="text-lg text-red-500">
			To test requests, enter 2 numbers to add: &nbsp;
		</h3>
		<input
			type="number"
			class="input-secondary input-sm bg-gray-500 text-lg font-bold text-green-400"
			bind:value={a}
		/>
		&nbsp; + &nbsp;
		<input
			type="number"
			class="input-secondary input-sm bg-gray-500 text-lg font-bold text-green-400"
			bind:value={b}
		/>
		&nbsp; = &nbsp;
		<span class="text-lg font-bold text-red-400">{sum}</span>
	</div>

	<button class="btn btn-secondary w-20 mx-auto" on:click={() => add(a, b)}
		>Add</button
	>

	<TodoList />
</div>
