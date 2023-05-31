<script lang="ts">
	import PostComp from '$lib/posts/PostComp.svelte';
	import Dumbbell from '$lib/static/Dumbbell.svg';

	export let data;

	let posts: Post[] = data.postsData;
	let postsNumber: number = 5;

	const showMorePosts = () => {
		postsNumber += 5;
	};

	const newPost = async () => {
		/*
            jax: Ycrw3kdZjIurdfWsJUqy
            annie: qZYtumqWkkTGMT9z8ROE
            mikogaj: nUWJXPdns9bqmzTB1hY4
        */
		const newPost = {
			authorId: 'qZYtumqWkkTGMT9z8ROE',
			content:
				'Hej, chciałem podzielić się swoimi przemyśleniami na temat doładowywania żeliwa na sztangę. 💪🏋️‍♂️🏋️‍♀️ Wiem, że niektórzy uważają, że najważniejsze to podnieść jak najwięcej, bez względu na technikę. ⚠️🏋️‍♂️🚫 Ale czy naprawdę warto rezygnować z poprawnej techniki? 🤔🤷‍♀️ Czy chwytanie ciężaru na "oko" to dobra strategia? 🤷‍♂️💭 Co sądzicie o tym podejściu? 🤔🏋️‍♀️💪',
			date: '08/06/2023',
			comments: [
				{
					authorId: 'nUWJXPdns9bqmzTB1hY4',
					content:
						'Myślę, że im więcej żeliwa, tym lepiej! 💪💯 Nie przejmuj się zbytnio techniką. 🏋️‍♂️💪 Najważniejsze, żeby pokazać, że jesteś silny! 💪🔥 Doładowanie to klucz do sukcesu! 🏋️‍♀️🔝',
					date: '08/06/2023'
				},
				{
					authorId: 'Ycrw3kdZjIurdfWsJUqy',
					content:
						'Oczywiście, że tak! 💪💪 Im większe obciążenie, tym większe wyzwanie! 🏋️‍♂️🔥 Technika jest przereklamowana. Ważne, żeby pokazać, że jesteś mocny! 💪💪🔝',
					date: '08/06/2023'
				},
				{
					authorId: 'nUWJXPdns9bqmzTB1hY4',
					content:
						'Nie ma co się zastanawiać! 💪💪 Wal żelazem, a technikę zostaw na bok. 🏋️‍♂️🔥 To właśnie załadunek żeliwa daje prawdziwe rezultaty! 💪💪🔥',
					date: '08/06/2023'
				},
				{
					authorId: 'qZYtumqWkkTGMT9z8ROE',
					content:
						'Jasne! 💪💪 Poprawna technika to strata czasu. 🚫⏱️ Liczy się tylko to, ile żeliwa jest na sztandze! 🏋️‍♂️🔥 Im więcej, tym lepiej! 💪💪🔝',
					date: '08/06/2023'
				},
				{
					authorId: 'nUWJXPdns9bqmzTB1hY4',
					content:
						'Dokładnie! 💪💪 Poprawna technika to dla tchórzy! 🏋️‍♂️🚫 Ważne, żeby przekroczyć swoje limity i załadować więcej żeliwa! 💪🔥 Tylko wtedy można osiągnąć prawdziwy sukces! 💪💯',
					date: '08/06/2023'
				}
			],
			likedByIds: [
				'Ycrw3kdZjIurdfWsJUqy',
				'Ycrw3kdZjIurdfWsJUqy',
				'Ycrw3kdZjIurdfWsJUqy'
			]
		};

		await fetch('/api/posts', {
			method: 'POST',
			body: JSON.stringify(newPost)
		});
	};
</script>

<div class="flex flex-col items-center min-h-screen p-10 w-full mx-auto">
	<div class="flex flex-row justify-between w-1/2 mb-10">
		<h1 class="text-5xl text-black flex flex-col justify-center">
			Hello, Rafał!
		</h1>
		<img src={Dumbbell} alt="dumbbell-icon" width="100" height="100" />
	</div>
	<div class="w-1/2">
		<form
			on:submit|preventDefault={() => newPost()}
			class="flex flex-col w-full mt-5 items-end"
		>
			<textarea
				name="newPost"
				rows="4"
				class="p-3 mb-5 rounded-md w-full bg-gray-200 border border-gray-600 shadow-md text-gray-700"
				placeholder="How did your training go?"
			/>
			<button type="submit" class="btn btn-secondary px-10">Post</button>
		</form>
	</div>
	<div class="w-full px-48">
		{#each posts.slice(0, postsNumber) as post}
			<PostComp postData={post} />
		{/each}
	</div>
	<div class="flex flex-row justify-center w-1/2">
		{#if postsNumber < posts.length}
			<button
				on:click={() => showMorePosts()}
				class="btn btn-primary w-1/2">Load more</button
			>
		{:else}
			<p class="text-xl text-primary">No more posts to show...</p>
		{/if}
	</div>
</div>
