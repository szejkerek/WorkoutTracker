<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { userSessionData } from '../../../stores/userSession.js';
	import arrow_left from '$lib/static/icons/arrow-left.svg';
	import arrow_right from '$lib/static/icons/arrow-right.svg';
	import type { DoneExercise } from '../../types.js';
	import DoneExerciseComp from '$lib/workout/DoneExerciseComp.svelte';
	import { detsStore } from '../../../stores/de.js';
	import plusIcon from '$lib/static/icons/plus-icon.svg';

	let ready = false;

	onMount(async () => {
		if ($userSessionData === null) {
			goto('/start');
		} else {
			currentDate = new Date();
			parseDate();

			const response = await fetch('/api/doneExercises');
			const data: DoneExercise[] = (await response.json()).data;

			$detsStore = data;
			updateDayExercises();
			ready = true;
		}
	});
	const motivationalQuotes: { content: string; author: string }[] = [
		{
			content:
				'Sukces to suma małych wysiłków, powtarzanych dzień po dniu. 💪🌟',
			author: getRandomAuthor()
		},
		{
			content: 'Twoje ciało osiągnie to, na co umysł jest gotowy. 🏋️‍♀️💡',
			author: getRandomAuthor()
		},
		{
			content:
				'Każdy trening to krok w stronę lepszej wersji siebie. 🚀🔥',
			author: getRandomAuthor()
		},
		{
			content: 'Ból jest chwilowy, ale zwycięstwo jest wieczne. 🏆😤',
			author: getRandomAuthor()
		},
		{
			content:
				'Nie odmawiaj sobie tego, czego pragniesz najbardziej. 🌟💪',
			author: getRandomAuthor()
		},
		{
			content:
				'Najtrudniejszy trening jest ten, w którym nie masz ochoty iść. 💦😅',
			author: getRandomAuthor()
		},
		{
			content:
				"Głowa mówi 'nie chce mi się', ale serce woła 'muszę to zrobić'. ❤️🔥",
			author: getRandomAuthor()
		},
		{
			content: 'Zmień swoje myślenie, a zmienisz swoje ciało. 🧠💪',
			author: getRandomAuthor()
		},
		{
			content: 'Najlepszy trening to ten, który nie zrobiłbyś sam. 👥💪',
			author: getRandomAuthor()
		},
		{
			content:
				'Wybierz dyscyplinę nad regułami, a osiągniesz wyniki. 🏋️‍♀️📈',
			author: getRandomAuthor()
		}
	];

	function getRandomAuthor(): string {
		const animals: string[] = [
			'Lew',
			'Orzeł',
			'Tygrys',
			'Puma',
			'Pantera',
			'Fretka',
			'Wąż',
			'Sokół',
			'Kondor',
			'Owca'
		];
		const adjectives: string[] = [
			'Mocny',
			'Szybki',
			'Zwinny',
			'Nieustraszony',
			'Agresywny',
			'Dzielny',
			'Szarżujący',
			'Zuchwały',
			'Prężny',
			'Dumny'
		];

		const randomAnimal: string =
			animals[Math.floor(Math.random() * animals.length)];
		const randomAdjective: string =
			adjectives[Math.floor(Math.random() * adjectives.length)];

		return `${randomAdjective} ${randomAnimal}`;
	}

	let motivationalQuote = motivationalQuotes.at(
		Math.floor(Math.random() * motivationalQuotes.length)
	);

	const pirates: string[] = [
		'Wzmocnij swoje mięśnie jak stalowe liny na żaglu! 💪⚓️',
		'Nie bądź leniwym żółwem! Podejmij wyzwanie i trenuj jak prawdziwy pirat! 🐢💥',
		'Zamień swoje ciało w dobrze wytrenowany okręt, gotowy do podboju! ⛵️🔥',
		'Odpłyń od brzegów swojej wygody i zdobądź wyspę wytrzymałości! 🏝️💪',
		'Każdy trening to krok w stronę odkrywania swoich wewnętrznych skarbów! 💎🏋️‍♂️',
		'Wbij kotwicę w teren treningowy i pokonaj wszystkie przeszkody jak niezwyciężony pirat! ⚓️💥',
		'Podnieś żagle swojej determinacji i płyń ku zdrowiu i siłowej potędze! ⛵️🌊',
		'Niech twój trening płonie jak płomień w sercu pirata! 🔥⚔️',
		'Wygrywaj treningowe bitwy i zdobywaj swoje fitnessowe złoto każdego dnia! 💪💰',
		'Trenuj jak pirat i stwórz własną legendę siły i wytrzymałości! 🏴‍☠️💪'
	];

	let pirat = pirates.at(Math.floor(Math.random() * pirates.length));

	const updateDayExercises = () => {
		currentExercises = $detsStore.filter((ex) => ex.date == parsedDate);
	};

	function parseDate() {
		day = currentDate.getDate();
		month = currentDate.getMonth();
		let parsedDay = day < 10 ? '0' + day : day;
		let parsedMonth = month + 1 < 10 ? '0' + (month + 1) : month + 1;
		parsedDate =
			parsedDay + '/' + parsedMonth + '/' + currentDate.getFullYear();
	}

	function decrementDay() {
		currentDate.setDate(currentDate.getDate() - 1);
		parseDate();
		updateDayExercises();
	}

	function incrementDay() {
		currentDate.setDate(currentDate.getDate() + 1);
		parseDate();
		updateDayExercises();
	}
	let currentExercises: DoneExercise[] = [];
	let currentDate: Date = new Date();
	let day;
	let month;
	let parsedDate: String;
	parseDate();
</script>

{#if ready}
	<div
		class="w-full max-h-screen pt-10 text-center bg-gray-300 flex flex-col justify-center items-center"
	>
		<div
			class="w-full h-1/3 flex flex-col justify-center items-center shadow-xl border-b border-wisteria"
		>
			<div class="text-black font-bold text-3xl mb-10">
				<h1>Hello, {$userSessionData?.staticInfo.displayName}!</h1>
			</div>

			<div class="bg-eminence rounded-md p-4 w-1/2 text-white">
				<p class="font-normal text-xl italic mb-2">
					"{motivationalQuote?.content}"
				</p>
				<p class="font-bold text-2xl">~{motivationalQuote?.author}</p>
			</div>

			<div
				class="flex justify-around items-center flex-row w-96 bg-wisteria my-10 rounded-md text-black font-semibold py-2"
			>
				<button on:click={decrementDay}>
					<img
						src={arrow_left}
						alt="Previous day icon"
						class="w-5 h-5"
					/>
				</button>
				<p class="text-xl">{parsedDate}</p>
				<button on:click={incrementDay}>
					<img
						src={arrow_right}
						alt="Next day icon"
						class="w-5 h-5"
					/>
				</button>
			</div>
			<h2 class="mb-6 font-bold text-3xl text-black">Current workout</h2>

			<div class="flex flex-row justify-between mb-5 items-center">
				<img
					src={plusIcon}
					alt="Start new workout icon"
					class="w-10 h-10 mr-5"
				/>
				<button
					on:click={() => goto('/workout/categories')}
					class="font-semibold py-2 px-4 rounded bg-gray-300 text-black text-xl hover:bg-gray-400"
				>
					Add new exercise
				</button>
			</div>
		</div>

		<div
			class="flex flex-row w-full justify-center flex-wrap overflow-y-scroll scrollbar-hide"
		>
			{#if currentExercises.length !== 0}
				{#each currentExercises as ex}
					<div class="xl:w-1/3 lg:w-1/2 w-full px-10 py-5">
						<DoneExerciseComp xd={ex} />
					</div>
				{/each}
			{:else}
				<div class="w-full px-10 py-5 mt-24">
					<p class="text-2xl text-primary tracking-wider">
						{pirat}
					</p>
				</div>
			{/if}
		</div>
	</div>
{/if}
