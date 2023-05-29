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

	import Logo from '$lib/static/Logo.png'
</script>

<div class="text-red-500">
	{#if currUser !== undefined}
		<!-- <p>{currUser.username}</p>
		<p>{currUser.email}</p>
		<p>{currUser.password}</p>
		<p>{currUser.info.gender}</p>
		<p>{currUser.bodyProfile.dateOfMeasurement}</p> -->
	{/if}
</div>
<div
	class="w-full h-full py-40 text-center flex flex-col justify-around items-center bg-gray-300">
	<div>
		<img src={Logo} alt="cipa" width=350px height=350px>
	</div>
	<br>
	<form class="w-full max-w-sm flex flex-col justify-center">
		<div class="flex justify-center mb-6">
		<div>
			<input class="border-2 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white placeholder-gray-900" 
			id="inline-full-name" 
			type="text" 
			placeholder="Username" 
			style="background-color:#D8B4E2; border-color:#55286F; color:black; width:300px; height:45px">
		</div>
		</div>
		<div class="flex justify-center mb-6">
		<div>
			<input class="border-2 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white placeholder-gray-900" 
			id="inline-password" 
			type="password" 
			placeholder="Password"
			style="background-color:#D8B4E2; border-color:#55286F; color:black; width:300px; height:45px">
		</div>
		</div>
		<div class="flex justify-center mb-6">
		<div>
			<button class='btn w-40 btn-accent mt-4'>Login</button>
		</div>
	</form>
</div>
