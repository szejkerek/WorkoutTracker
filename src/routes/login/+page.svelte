<script lang="ts">
	let username: String;
	let password: String;

	let currUser: User;

	const login = async () => {
		const categoriesXD = await fetch(
			`/api/exercise_category?username=${username}`
		);
		const response = await categoriesXD.json();

		if (response.code !== 1) {
			console.log('xd');
			console.log(response);

			return;
		}

		console.table(response);
	};

	// export const login = async () => {
	// 	const userInfo = await fetch(`/api/user_info/?username=${username}`);

	// 	let response = await userInfo.json();

	// 	if (response.code !== 1) {
	// 		console.log('xd');

	// 		return;
	// 	}

	// 	currUser = response.data;
	// };

	// const login = async () => {
	// 	const response = await fetch('/api/add_user', {
	// 		method: 'POST',
	// 		body: JSON.stringify({ password, username }),
	// 		headers: {
	// 			'content-type': 'application/json'
	// 		}
	// 	});
	// };
</script>

<div class="text-red-500">
	{#if currUser !== undefined}
		<p>{currUser.username}</p>
		<p>{currUser.email}</p>
		<p>{currUser.password}</p>
		<p>{currUser.info.gender}</p>
		<p>{currUser.bodyProfile.dateOfMeasurement}</p>
	{/if}
</div>
<div
	class="w-full h-full py-40 text-center flex flex-col justify-around items-center bg-gray-300"
>
	<div class="w-80 h-80 bg-gray-700 rounded-full" />
	<form
		on:submit|preventDefault={() => login()}
		class="form-control w-1/4 items-center"
	>
		<input
			bind:value={username}
			type="text"
			placeholder="Username"
			class="w-full input input-bordered input-md"
		/>
		<input
			bind:value={password}
			type="password"
			placeholder="Password"
			class="w-full my-2 input input-bordered input-md"
		/>
		<button type="submit" class="btn btn-accent self-start">Login</button>
	</form>
</div>
