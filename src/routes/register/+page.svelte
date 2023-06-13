<script lang="ts">
	import { goto } from '$app/navigation';
	import { ResultCodes } from '$lib/enums/errorCodes';
	import Logo from '$lib/static/Logo.png';
	import { userSessionData } from '../../stores/userSession';
	import { validateEmail } from '../../utilsxd/validation';

	let username: String = '';
	let password: String = '';
	let repeatedPassword: String = '';
	let email: String = '';
	let gender: 'Male' | 'Female' | 'Other' | 'Murcin' = 'Other';

	let invalidFormData = false;
	let invalidEmail = false;
	let passwordsDoNotMatch = false;
	let usernameExists = false;
	let emailExists = false;

	const registerNewUser = async () => {
		invalidFormData =
			username === '' ||
			password === '' ||
			email === '' ||
			!['Male', 'Female', 'Other', 'Murcin'].includes(gender);
		passwordsDoNotMatch = password !== repeatedPassword;
		invalidEmail = !validateEmail(email);

		if (invalidEmail || invalidFormData || passwordsDoNotMatch) {
			return;
		}

		const newUser: NewUser = {
			email,
			username,
			password,
			gender
		};

		const newUserResponse = await fetch('/api/register', {
			method: 'POST',
			body: JSON.stringify(newUser)
		});
		const newUserResult = await newUserResponse.json();

		usernameExists = newUserResult.code === ResultCodes.USERNAME_EXISTS;
		emailExists = newUserResult.code === ResultCodes.EMAIL_EXISTS;

		if (usernameExists || emailExists) {
			return;
		}

		$userSessionData = newUserResult.data;
		goto('/feed');
	};
</script>

<div class="flex flex-col items-center min-h-screen p-10 w-full mx-auto">
	<div class="pt-16">
		<img src={Logo} alt="cipa" width="350px" height="350px" />
	</div>
	<br />
	<form
		on:submit|preventDefault={(_) => registerNewUser()}
		class="w-full max-w-sm flex flex-col justify-center"
	>
		<div class="flex flex-col items-center justify-center mb-6">
			<div>
				<input
					class="border-2 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white placeholder-gray-900"
					bind:value={username}
					id="inline-username"
					type="text"
					placeholder="Username"
					style="background-color:#D8B4E2; border-color:#55286F; color:black; width:300px; height:45px"
				/>
			</div>
			{#if usernameExists}
				<p class="text-red-500 font-semibold">
					Username is already in use.
				</p>
			{/if}
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
		<div class="flex flex-col items-center justify-center mb-6">
			<div>
				<input
					class="border-2 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white placeholder-gray-900"
					bind:value={repeatedPassword}
					id="inline-repeatPassword"
					type="password"
					placeholder="Repeat password"
					style="background-color:#D8B4E2; border-color:#55286F; color:black; width:300px; height:45px"
				/>
			</div>
			{#if passwordsDoNotMatch}
				<p class="text-red-500 font-semibold">
					Passwords do not match.
				</p>
			{/if}
		</div>
		<div class="flex flex-col justify-center items-center mb-6">
			<div>
				<input
					class="border-2 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white placeholder-gray-900"
					bind:value={email}
					id="inline-email"
					type="text"
					placeholder="Email"
					style="background-color:#D8B4E2; border-color:#55286F; color:black; width:300px; height:45px"
				/>
			</div>
			{#if invalidEmail}
				<p class="text-red-500 font-semibold">Invalid email address.</p>
			{/if}
			{#if emailExists}
				<p class="text-red-500 font-semibold">
					Email is already in use.
				</p>
			{/if}
		</div>
		<div class="flex justify-center mb-6">
			<select
				bind:value={gender}
				id="countries"
				class="border-2 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white placeholder-gray-900"
				style="background-color:#D8B4E2; border-color:#55286F; color:black; width:300px; height:45px"
			>
				<option selected>Gender</option>
				<option value="Male">Male</option>
				<option value="Female">Female</option>
				<option value="Other">Other</option>
				<option value="Murcin">Murcin</option>
			</select>
		</div>
		<div class="flex justify-center mb-6">
			{#if invalidFormData}
				<p class="text-red-500 font-semibold">
					Please fill the form correctly.
				</p>
			{/if}
		</div>
		<div class="flex justify-center mb-6">
			<div>
				<button class="btn w-40 btn-secondary mt-6">Register</button>
			</div>
		</div>
	</form>
</div>
