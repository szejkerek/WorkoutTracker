<div class="flex flex-col p-5 ml-10">
	<div class="flex flex-col w-1/2">
		<h2 class="ml-5 mb-5 text-3xl text-blue-400">Posts</h2>
		<div class="w-full bg-gray-400">
			<pre class="text-white p-3">interface Post &#123;
	author: User,
	content: String,
	date: String,
	comments: PostComment[],
	likedByIds: String[]
&#125;
			</pre>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 font-bold">
				Route: /api/posts
			</p>
			<p class="text-xl text-gray-600 mb-2">
				GET: Returns all posts in the database as an array of Post
				objects.
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">GET /api/posts</pre>
			</div>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 mt-5 font-bold">
				Route: /api/posts/[postId]
			</p>
			<p class="text-xl text-gray-600 mb-2">
				GET: Returns the exercise object of an Post type, with the given
				uid, or empty object if such user doesn't exist.
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre
					class="text-white p-3">GET /api/posts/IeOTpAKEtkg8al5dDchQ</pre>
			</div>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 mt-5 font-bold">
				Route: /api/posts
			</p>
			<p class="text-xl text-gray-600 mb-2">
				DELETE: Deletes post with the given uid
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">DEL /api/posts
body: &#123;post id&#125;</pre>
			</div>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 mt-5 font-bold">
				Route: /api/posts
			</p>
			<p class="text-xl text-gray-600 mb-2">
				PATCH: Updates post with the given object data
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">PATCH /api/posts
body: &#123;post object&#125;</pre>
			</div>
		</div>
	</div>
</div>
