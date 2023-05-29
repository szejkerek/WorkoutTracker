<div class="flex flex-col p-5 ml-10">
	<div class="flex flex-col w-1/2">
		<h2 class="ml-5 mb-5 text-3xl text-blue-400">Done exercises</h2>
		<div class="w-full bg-gray-400">
			<pre class="text-white p-3">interface DoneExercise &#123;
	owner: User,
	exercise: Exercise,
	date: String,
	distanceInMeters: Number,
	timeInSeconds: Number,
	weightInKG: Number,
	repetitions: Number
&#125;
			</pre>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 font-bold">
				Route: /api/doneExercises
			</p>
			<p class="text-xl text-gray-600 mb-2">
				GET: Returns all completed exercises in the database, as an
				array of objects of a DoneExercise type.
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">GET /api/doneExercises</pre>
			</div>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 mt-5 font-bold">
				Route: /api/doneExercises
			</p>
			<p class="text-xl text-gray-600 mb-2">
				DELETE: Deletes completed exercise with the given id
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">DEL /api/doneExercises
body: &#123;completed exercise id&#125;</pre>
			</div>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 mt-5 font-bold">
				Route: /api/doneExercises
			</p>
			<p class="text-xl text-gray-600 mb-2">
				PATCH: Updates done exercise with the given object data
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">PATCH /api/doneExercises
body: &#123;completed exercise object&#125;</pre>
			</div>
		</div>
	</div>
</div>
