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
			},
			followingIds: []
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

	const removeUser = async () => {
		const response = await fetch('/api/users', {
			method: 'DELETE',
			body: JSON.stringify("7rNrPGN3Waae9x5dgPv1"),
		});
		const result = await response.json();

		if(result.code !== 1) {
			console.log("🥶🥶🥶🥶🥶🥶");
		}
		else {
			console.log("Removed user: ");
		}
	}

	const updateUser = async () => {
		const response = await fetch('/api/users', {
			method: 'PATCH',
			body: JSON.stringify({
				uid: "N7RjX9tcs5v2N0Ync070"
			}),
		});
		const result = await response.json();

		if(result.code !== 1) {
			console.log("🥶🥶🥶🥶🥶🥶");
		}
		else {
			console.log("Updated user: ");
			console.log(result.data);
		}
	}

	const updateUserCategory = async () => {
		const response = await fetch('/api/exerciseCategories', {
			method: 'PATCH',
			body: JSON.stringify({
				uid: "tEynduCnDHcmuope4ilG"
			}),
		});
		const result = await response.json();

		if(result.code !== 1) {
			console.log("🥶🥶🥶🥶🥶🥶");
		}
		else {
			console.log("Updated category: ");
			console.log(result.data);
		}
	}

	const removeUserCategory = async () => {
		const response = await fetch('/api/exerciseCategories', {
			method: 'DELETE',
			body: JSON.stringify("tEynduCnDHcmuope4ilG"),
		});
		const result = await response.json();

		if(result.code !== 1) {
			console.log("🥶🥶🥶🥶🥶🥶");
		}
		else {
			console.log("Removed category: ");
		}
	}

	const removeBodyProfile = async () => {
		const response = await fetch('/api/bodyProfiles', {
			method: 'DELETE',
			body: JSON.stringify("Y6i3mVOv1rOSVzNQ6yN3"),
		});
		const result = await response.json();

		if(result.code !== 1) {
			console.log("🥶🥶🥶🥶🥶🥶");
		}
		else {
			console.log("Removed body profile: ");
		}

		
	}

	const addExercise = async () => {
		const newExercise: Exercise = {
			displayName: "barbell bench press",
			categoryId: "14JYkBMcU7djAh0SNKd7",
			exerciseType: 4,
			note: "pompa"
		};

		const response = await fetch('/api/exercises', {
			method: 'POST',
			body: JSON.stringify(newExercise)
		});
		const result = await response.json();

		if(result.code !== 1) {
			console.log("🥶🥶🥶🥶🥶🥶");
		}
		else {
			console.log("Added new exercise: ");
			console.log(result.data);
		}
	}

	const updateExercise = async () => {
		const response = await fetch('/api/exercises', {
			method: 'PATCH',
			body: JSON.stringify({
				uid: "IIp42msMbJddFWdc3ksm"
			}),
		});
		const result = await response.json();

		if(result.code !== 1) {
			console.log("🥶🥶🥶🥶🥶🥶");
		}
		else {
			console.log("Updated exercise: ");
			console.log(result.data);
		}
	}

	const removeExercise = async () => {
		const response = await fetch('/api/exercises', {
			method: 'DELETE',
			body: JSON.stringify("IIp42msMbJddFWdc3ksm"),
		});
		const result = await response.json();

		if(result.code !== 1) {
			console.log("🥶🥶🥶🥶🥶🥶");
		}
		else {
			console.log("Removed exercise: ");
		}
	}

	const addTrainingPlan = async () => {
		const newTrainingPlan: TrainingPlan = {
			userId: "IeOTpAKEtkg8al5dDchQ",
   			name: "sample training plan name",
   			exerciseIds: ["sample exercise id",
						  "sample exercise id2",
						  "sample exercise id3"]
		};

		const response = await fetch('/api/trainingPlans', {
			method: 'POST',
			body: JSON.stringify(newTrainingPlan)
		});
		const result = await response.json();

		if(result.code !== 1) {
			console.log("🥶🥶🥶🥶🥶🥶");
		}
		else {
			console.log("Added new training plan: ");
			console.log(result.data);
		}
	}

	const updateTrainingPlan = async () => {
		const response = await fetch('/api/trainingPlans', {
			method: 'PATCH',
			body: JSON.stringify({
				uid: "MTQ5gbk22QeDJ3YVaccz"
			}),
		});
		const result = await response.json();

		if(result.code !== 1) {
			console.log("🥶🥶🥶🥶🥶🥶");
		}
		else {
			console.log("Updated training plan: ");
			console.log(result.data);
		}
	}

	const removeTrainingPlan = async () => {
		const response = await fetch('/api/trainingPlans', {
			method: 'DELETE',
			body: JSON.stringify("MTQ5gbk22QeDJ3YVaccz"),
		});
		const result = await response.json();

		if(result.code !== 1) {
			console.log("🥶🥶🥶🥶🥶🥶");
		}
		else {
			console.log("Removed training plan: ");
		}
	}

	const addDoneExercise = async () => {
		const newDoneExercise: DoneExercise = {
			userId: "IeOTpAKEtkg8al5dDchQ",
			exerciseId: "sample exercise id",
			date: "sample date",
			distanceInMeters: 1,
			timeInSeconds: 2,
			weightInKG: 3,
			repetitions: 4
		};

		const response = await fetch('/api/doneExercises', {
			method: 'POST',
			body: JSON.stringify(newDoneExercise)
		});
		const result = await response.json();

		if(result.code !== 1) {
			console.log("🥶🥶🥶🥶🥶🥶");
		}
		else {
			console.log("Added new done exercise");
			console.log(result.data);
		}
	}

	const updateDoneExercise = async () => {
		const response = await fetch('/api/doneExercises', {
			method: 'PATCH',
			body: JSON.stringify({
				uid: "O0irPuED4Nobd60TfMmt"
			}),
		});
		const result = await response.json();

		if(result.code !== 1) {
			console.log("🥶🥶🥶🥶🥶🥶");
		}
		else {
			console.log("Updated done exercise: ");
			console.log(result.data);
		}
	}

	const removeDoneExercise = async () => {
		const response = await fetch('/api/doneExercises', {
			method: 'DELETE',
			body: JSON.stringify("O0irPuED4Nobd60TfMmt"),
		});
		const result = await response.json();

		if(result.code !== 1) {
			console.log("🥶🥶🥶🥶🥶🥶");
		}
		else {
			console.log("Removed done exercise: ");
		}
	}

	const addPost = async () => {
		const newPost: Post = {
			authorId: "sample user id",
			content: "sample content",
			date: "sample date",
			comments: [
				{
					authorId: "sample comment author id",
					content: "sample comment content", 
					date: "sample date"
				}
			],
			likedByIds: ["sample user id", "sample user id2", "sample user id3"]
		};

		const response = await fetch('/api/posts', {
			method: 'POST',
			body: JSON.stringify(newPost)
		});
		const result = await response.json();

		if(result.code !== 1) {
			console.log("🥶🥶🥶🥶🥶🥶");
		}
		else {
			console.log("Added new post");
			console.log(result.data);
		}
	}

	const removePost = async () => {
		const response = await fetch('/api/posts', {
			method: 'DELETE',
			body: JSON.stringify("8bQPHzZK2rn249Ribajn"),
		});
		const result = await response.json();

		if(result.code !== 1) {
			console.log("🥶🥶🥶🥶🥶🥶");
		}
		else {
			console.log("Removed post");
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
	
	<button on:click={() => getUsers()} class="btn btn-primary">get users</button>
	<button on:click={() => addCategory()} class="btn btn-primary">add category</button>
	<button on:click={() => addProfile()} class="btn btn-primary">add profile</button>
	<button on:click={() => removeUser()} class="btn btn-primary">remove user:3</button>
	<button on:click={() => updateUser()} class="btn btn-primary">update user:3c</button>
	<button on:click={() => removeUserCategory()} class="btn btn-primary">remove category :3c</button>
	<button on:click={() => updateUserCategory()} class="btn btn-primary">update category :3c</button>
	<button on:click={() => removeBodyProfile()} class="btn btn-primary">remove body profile</button>
	<button on:click={() => addExercise()} class="btn btn-primary">add exercise</button>
	<button on:click={() => updateExercise()} class="btn btn-primary">update exercise</button>
	<button on:click={() => removeExercise()} class="btn btn-primary">remove exercise</button>
	<button on:click={() => addTrainingPlan()} class="btn btn-primary">add training plan</button>
	<button on:click={() => updateTrainingPlan()} class="btn btn-primary">update training plan</button>
	<button on:click={() => removeTrainingPlan()} class="btn btn-primary">remove training plan</button>
	<button on:click={() => addDoneExercise()} class="btn btn-primary">add Done Exercise</button>
	<button on:click={() => updateDoneExercise()} class="btn btn-primary">update Done Exercise</button>
	<button on:click={() => removeDoneExercise()} class="btn btn-primary">remove Done Exercise</button>
	<button on:click={() => addPost()} class="btn btn-primary">add post</button>
	<button on:click={() => removePost()} class="btn btn-primary">remove post</button>


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
