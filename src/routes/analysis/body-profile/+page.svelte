<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { userSessionData } from '../../../stores/userSession.js';
	import { ResultCodes } from '$lib/enums/errorCodes.js';

	let ready = false;

	onMount(async () => {
		if ($userSessionData === null) {
			goto('/start');
		} else {
			const response = await fetch(
				`/api/users/${$userSessionData?.id}/bodyProfiles`
			);
			const data = await response.json();

			bodyProfiles = data.data;
			ready = true;
		}
	});

	let currentDateOfMeasurement: Date;
	let currentBodyFat: number;
	let currentMuscleWeight: number;
	let currentWeight: number;

	let bodyProfiles: BodyProfile[] = [];

	const saveProfile = async () => {
		if (
			currentDateOfMeasurement === undefined ||
			currentBodyFat === undefined ||
			currentMuscleWeight === undefined ||
			currentWeight === undefined
		) {
			// jais tam koasfmcsufsngtsk
			return;
		}

		const newProfile: BodyProfile = {
			dateOfMeasurement: currentDateOfMeasurement
				.toString()
				.split('-')
				.reverse()
				.join('/'),
			bodyFatInPercentage: currentBodyFat,
			muscleWeightInKG: currentMuscleWeight,
			weightInKG: currentWeight,
			owner: $userSessionData as User,
			id: ''
		};

		const response = await fetch('/api/bodyProfiles', {
			method: 'POST',
			body: JSON.stringify(newProfile)
		});
		const result = await response.json();

		if (result.code == ResultCodes.SUCCESS) {
			bodyProfiles = [result.data, ...bodyProfiles];
		}

		profileAdded = true;
	};

	let showHistory = false;
	let profileAdded = false;

	function toggleHistory() {
		showHistory = !showHistory;
		profileAdded = false;
	}
</script>

{#if ready}
	<div class="w-full flex flex-col justify-center items-center">
		<form
			class="w-full py-20 text-center bg-gray-300 flex flex-col justify-center items-center"
		>
			<div class="flex flex-col justify-center items-center">
				<h1 class="text-5xl text-black mb-12">Edit body profile</h1>

				<div class="mb-4 w-2/3">
					<label>
						<p class="text-black">Date of Measurement:</p>
						<input
							bind:value={currentDateOfMeasurement}
							type="date"
							class="input"
						/>
					</label>
				</div>
				<div class="mb-4 w-2/3">
					<label>
						<p class="text-black">Body Fat (%):</p>
						<input
							bind:value={currentBodyFat}
							type="number"
							placeholder="Body Fat (%)"
							class="input"
						/>
					</label>
				</div>
				<div class="mb-4 w-2/3">
					<label>
						<p class="text-black">Muscle Weight (kg):</p>
						<input
							bind:value={currentMuscleWeight}
							type="number"
							placeholder="Muscle Weight (kg)"
							class="input"
						/>
					</label>
				</div>
				<div class="mb-4 w-2/3">
					<label>
						<p class="text-black">Weight (kg):</p>
						<input
							bind:value={currentWeight}
							type="number"
							placeholder="Weight (kg)"
							class="input"
						/>
					</label>
				</div>
			</div>

			<div class="flex justify-center">
				<button
					on:click|preventDefault={(_) => saveProfile()}
					type="submit"
					class="text-white shadow-lg font-bold py-2 px-4 rounded bg-purple-500 hover:bg-purple-700"
					>Add</button
				>
			</div>
		</form>

		<div class="flex justify-center">
			{#if profileAdded}
				<p class="text-black font-semibold">Profile added.</p>
			{/if}
		</div>
		<div class="flex justify-center">
			<button
				on:click={toggleHistory}
				class="text-white shadow-lg font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700"
			>
				{showHistory ? 'Hide History' : 'Show History'}
			</button>
		</div>

		<div
			class="text-black flex flex-row justify-center items-center py-10"
			style="display: {showHistory ? 'block' : 'none'};"
		>
			<table
				class="tablee border border-wisteria bg-pink-lavender rounded-xl"
			>
				<thead>
					<tr>
						<th>Date of Measurement</th>
						<th>Body Fat (%)</th>
						<th>Muscle Weight (kg)</th>
						<th>Weight (kg)</th>
					</tr>
				</thead>
				<tbody class="text-center">
					{#each bodyProfiles as profile}
						<tr>
							<td>{profile.dateOfMeasurement}</td>
							<td>{profile.bodyFatInPercentage}</td>
							<td>{profile.muscleWeightInKG}</td>
							<td>{profile.weightInKG}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
{/if}

<style>
	.input {
		background-color: #391e46;
		width: 100%;
	}

	.tablee {
		border-collapse: separate;
	}

	.tablee th,
	.tablee td {
		padding: 10px;
	}
</style>
