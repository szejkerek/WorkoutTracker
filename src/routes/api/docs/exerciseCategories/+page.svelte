<div class="flex flex-col p-5 ml-10">
	<div class="flex flex-col w-1/2">
		<h2 class="ml-5 mb-5 text-3xl text-blue-400">Exercise categories</h2>
		<div class="w-full bg-gray-400">
			<pre class="text-white p-3">interface UserCategory &#123;
	name: String,
	owner: User,
	note: String
&#125;
			</pre>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 font-bold">
				Route: /api/exerciseCategories
			</p>
			<p class="text-xl text-gray-600 mb-2">
				GET: Returns all user defined exercise categories in the
				database, as an array of objects of a UserCategory type.
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">GET /api/exerciseCategories</pre>
			</div>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 mt-5 font-bold">
				Route: /api/exerciseCategories/[ecId]
			</p>
			<p class="text-xl text-gray-600 mb-2">
				GET: Returns the exercise category object with the given id, or
				empty set if such category doesn't exist.
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre
					class="text-white p-3">GET /api/exerciseCategories/IeOTpAKEtkg8al5dDchQ</pre>
			</div>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 mt-5 font-bold">
				Route: /api/exerciseCategories
			</p>
			<p class="text-xl text-gray-600 mb-2">
				DELETE: Deletes category with the given id
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">DEL /api/exerciseCategories
body: &#123;category id&#125;</pre>
			</div>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 mt-5 font-bold">
				Route: /api/exerciseCategories
			</p>
			<p class="text-xl text-gray-600 mb-2">
				PATCH: Updates category with the given object data
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">PATCH /api/exerciseCategories
body: &#123;category object&#125;</pre>
			</div>
		</div>
	</div>
</div>
