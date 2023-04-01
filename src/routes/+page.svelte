<script lang="ts">
	let rzeczys: number[] = Array<number>(100)
		.fill(1)
		.map<number>((value: number, index: number, array: number[]) => {
		return index + 1;
	});

	import firebase from 'firebase/app';
	import auth from 'firebase/auth';

	async function loginWithGoogle() {
		// try {
		// 	const provider = new auth.GoogleAuthProvider();

		// 	await auth.signInWithPopup(provider);
		// }
		// catch (e) {
      	// 	console.log(e);
    	// }
	};
</script>

<div class="flex flex-grow flex-col justify-center align-middle bg-gray-200">
	<h1 class="text-6xl text-purple-700 text-center">Helo :D</h1>

	<div class="flex flex-row justify-center align-middle w-1/4 mx-auto my-5">
		<button class="btn btn-secondary">LOGIN WITH GOGEL</button>
	</div>

	{#each rzeczys as rzecz}
		<div class="flex w-1/4 flex-row justify-center self-center border-2 border-sky-400 p-5 my-3 text-red-700">{rzecz}</div>
	{/each}
</div>