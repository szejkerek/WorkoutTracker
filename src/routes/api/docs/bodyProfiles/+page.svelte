<div class="flex flex-col p-5 ml-10">
	<div class="flex flex-col w-1/2">
		<h2 class="ml-5 mb-5 text-3xl text-blue-400">Body profiles</h2>
		<div class="w-full bg-gray-400">
			<pre class="text-white p-3">interface BodyProfile &#123;
	weightInKG: Number,
	bodyFatInPercentage: Number,
	muscleWeightInKG: Number,
	dateOfMeasurement: String,
	owner: User
&#125;
			</pre>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 font-bold">
				Route: /api/bodyProfiles
			</p>
			<p class="text-xl text-gray-600 mb-2">
				GET: Returns all body profiles in the database, as an array of
				objects of a BodyProfile type.
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">GET /api/bodyProfiles</pre>
			</div>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 mt-5 font-bold">
				Route: /api/bodyProfiles/[bpId]
			</p>
			<p class="text-xl text-gray-600 mb-2">
				GET: Returns the bodyprofile object with the given id, or empty
				set if such profile doesn't exist.
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre
					class="text-white p-3">GET /api/bodyProfiles/IeOTpAKEtkg8al5dDchQ</pre>
			</div>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 mt-5 font-bold">
				Route: /api/bodyProfiles
			</p>
			<p class="text-xl text-gray-600 mb-2">
				DELETE: Deletes body profile with the given id
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">DEL /api/bodyProfiles
body: &#123;profile object&#125;</pre>
			</div>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 mt-5 font-bold">
				Route: /api/bodyProfiles
			</p>
			<p class="text-xl text-gray-600 mb-2">
				PATCH: Updates bodyProfile with the given object data
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">PATCH /api/bodyProfiles
body: &#123;profile object&#125;</pre>
			</div>
		</div>
	</div>
</div>
