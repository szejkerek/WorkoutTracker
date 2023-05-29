<script lang="ts">
	export const load = async () => {
		const userInfo = await fetch(
			`/api/user_info/?uid=zl6IkcON3os40ExAp2BE`
		);

		return await userInfo.json();
	};
	import Logo from '$lib/static/Logo.png'
</script>

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
				placeholder="Full name" 
				style="background-color:#D8B4E2; border-color:#55286F; color:black; width:300px; height:45px">
			</div>
		</div>
		<div class="flex justify-center mb-6">
			<div>
				<input class="border-2 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white placeholder-gray-900" 
				id="inline-username" 
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
				<input class="border-2 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white placeholder-gray-900" 
				id="inline-repeatPassword" 
				type="password" 
				placeholder="Repeat password"
				style="background-color:#D8B4E2; border-color:#55286F; color:black; width:300px; height:45px">
			</div>
		</div>
		<div class="flex justify-center mb-6">
			<div>
				<button class='btn w-40 btn-secondary mt-6' >Register</button>
			</div>
	</form>
</div>
