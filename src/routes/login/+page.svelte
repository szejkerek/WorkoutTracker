<script lang="ts">
	import { goto } from '$app/navigation';
	import Logo from '$lib/static/Logo.png';
	import { userSessionData } from '../../stores/userSession';

	let username: String;
	let password: String;

	let incorrectUsername = false;
	let incorrectPassword = false;

	const login = async () => {
		const resp = await fetch('/api/users');
		const users: User[] = (await resp.json()).data;

		const foundUser = users.find(
			(user) => user.username.toLowerCase() === username.toLowerCase()
		);

		if (foundUser === undefined) {
			incorrectUsername = true;

			return;
		}

		incorrectUsername = false;

		if (foundUser.password !== password) {
			incorrectPassword = true;

			return;
		}

		incorrectPassword = false;
		$userSessionData = foundUser;
		goto('/feed');
	};
</script>

<div class="flex flex-col items-center min-h-screen p-10 w-full mx-auto">
	<div class="pt-16">
		<img src={Logo} alt="cipa" width="350px" height="350px" />
	</div>
	<br />
	<form class="w-full max-w-sm flex flex-col justify-center">
		<div class="flex justify-center mb-6">
			<div>
				<input
					class="border-2 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white placeholder-gray-900"
					bind:value={username}
					id="inline-full-name"
					type="text"
					placeholder="Username"
					style="background-color:#D8B4E2; border-color:#55286F; color:black; width:300px; height:45px"
				/>
			</div>
		</div>
		<div class="flex justify-center mb-6">
			<div>
				<input
					class="border-2 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white placeholder-gray-900"
					bind:value={password}
					id="inline-password"
					type="password"
					placeholder="Password"
					style="background-color:#D8B4E2; border-color:#55286F; color:black; width:300px; height:45px"
				/>
			</div>
		</div>
		<div class="flex justify-center mb-6">
			<div>
				<button
					on:click={() => login()}
					class="btn w-40 btn-accent mt-4">Login</button
				>
			</div>
		</div>
		<div class="flex justify-center">
			{#if incorrectUsername}
				<p class="text-red-500 font-semibold">
					No such username exists.
				</p>
			{/if}

			{#if incorrectPassword}
				<p class="text-red-500 font-semibold">Incorrect password.</p>
			{/if}
		</div>
	</form>
</div>
