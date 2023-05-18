<div class="flex flex-col p-5 ml-10">
	<div class="flex flex-col w-1/2">
		<h2 class="ml-5 mb-5 text-3xl text-blue-400">Exercises</h2>
		<div class="w-full bg-gray-400">
			<pre class="text-white p-3">interface Exercise &#123;
	category: UserCategory,
	displayName: String,
	exerciseType: Number,
	note: String
&#125;
			</pre>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 font-bold">
				Route: /api/exercises
			</p>
			<p class="text-xl text-gray-600 mb-2">
				GET: Returns all exercises in the database as an array of
				Exercise objects.
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">GET /api/exercises</pre>
			</div>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 mt-5 font-bold">
				Route: /api/exercises/[exerId]
			</p>
			<p class="text-xl text-gray-600 mb-2">
				GET: Returns the exercise object of an Exercise type, with the
				given uid, or empty object if such user doesn't exist.
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre
					class="text-white p-3">GET /api/exercises/IeOTpAKEtkg8al5dDchQ</pre>
			</div>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 mt-5 font-bold">
				Route: /api/exercises
			</p>
			<p class="text-xl text-gray-600 mb-2">
				DELETE: Deletes exercise with the given uid
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">DEL /api/exercises
body: &#123;exercise id&#125;</pre>
			</div>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 mt-5 font-bold">
				Route: /api/exercises
			</p>
			<p class="text-xl text-gray-600 mb-2">
				PATCH: Updates exercise with the given object data
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">PATCH /api/exercises
body: &#123;exercise object&#125;</pre>
			</div>
		</div>
	</div>
</div>
