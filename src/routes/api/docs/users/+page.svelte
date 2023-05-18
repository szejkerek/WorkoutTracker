<div class="flex flex-col p-5 ml-10">
	<div class="flex flex-col w-1/2">
		<h2 class="ml-5 mb-5 text-3xl text-blue-400">Users</h2>
		<div class="w-full bg-gray-400">
			<pre class="text-white p-3">interface User &#123;
	username: String,
	password: String,
	email: String,
	staticInfo: StaticInfo,
	followingIds: String[]
&#125;
			</pre>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 font-bold">
				Route: /api/users
			</p>
			<p class="text-xl text-gray-600 mb-2">
				GET: Returns all users in the database as an array of User
				objects.
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">GET /api/users</pre>
			</div>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 mt-5 font-bold">
				Route: /api/users/[uid]
			</p>
			<p class="text-xl text-gray-600 mb-2">
				GET: Returns the user object of an User type, with the given
				uid, or empty object if such user doesn't exist.
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre
					class="text-white p-3">GET /api/users/IeOTpAKEtkg8al5dDchQ</pre>
			</div>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 mt-5 font-bold">
				Route: /api/users
			</p>
			<p class="text-xl text-gray-600 mb-2">
				DELETE: Deletes user with the given uid
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">DEL /api/users
body: &#123;user id&#125;</pre>
			</div>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 mt-5 font-bold">
				Route: /api/users
			</p>
			<p class="text-xl text-gray-600 mb-2">
				PATCH: Updates user with the given object data
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">PATCH /api/users
body: &#123;user object&#125;</pre>
			</div>
		</div>
	</div>
</div>
