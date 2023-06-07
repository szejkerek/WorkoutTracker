<script lang="ts">
	import { goto } from '$app/navigation';
	import Logo from '$lib/static/Logo.png';
	import { userSessionData } from '../../stores/userSession';
	import { ResultCodes } from '$lib/enums/errorCodes';

	let username: String;
	let password: String;

	let userNotMatched = false;

	const login = async () => {
		const loginResponse = await fetch(
			`/api/login?username=${username}&password=${password}`,
			{
				method: 'GET'
			}
		);
		const responseData = await loginResponse.json();

		if (responseData.code & ResultCodes.ERROR) {
			userNotMatched = true;

			return;
		}

		userNotMatched = false;
		$userSessionData = responseData.data;
		goto('/feed');
	};
</script>

<div class="flex flex-col items-center min-h-screen p-10 w-full mx-auto">
	<div class="pt-16">
		<img src={Logo} alt="logo" width="350px" height="350px" />
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
			{#if userNotMatched}
				<p class="text-red-500 font-semibold">
					Wrong username or password.
				</p>
			{/if}
		</div>
	</form>
</div>
