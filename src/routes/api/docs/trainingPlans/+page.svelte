<div class="flex flex-col p-5 ml-10">
	<div class="flex flex-col w-1/2">
		<h2 class="ml-5 mb-5 text-3xl text-blue-400">Training plans</h2>
		<div class="w-full bg-gray-400">
			<pre class="text-white p-3">interface TrainingPlan &#123;
	author: User,
	name: String,
	exercises: Exercise[]
&#125;
			</pre>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 font-bold">
				Route: /api/trainingPlans
			</p>
			<p class="text-xl text-gray-600 mb-2">
				GET: Returns all training plans in the database, as an array of
				objects of a TrainingPlan type.
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">GET /api/trainingPlans</pre>
			</div>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 mt-5 font-bold">
				Route: /api/trainingPlans/[planId]
			</p>
			<p class="text-xl text-gray-600 mb-2">
				GET: Returns a training plan object with the given id, or empty
				set if such plan doesn't exist.
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre
					class="text-white p-3">GET /api/trainingPlans/IeOTpAKEtkg8al5dDchQ</pre>
			</div>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 mt-5 font-bold">
				Route: /api/trainingPlans
			</p>
			<p class="text-xl text-gray-600 mb-2">
				DELETE: Deletes plan with the given id
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">DEL /api/trainingPlans
body: &#123;plan id&#125;</pre>
			</div>
		</div>
		<div>
			<p class="text-xl text-gray-700 mb-2 mt-5 font-bold">
				Route: /api/trainingPlans
			</p>
			<p class="text-xl text-gray-600 mb-2">
				PATCH: Updates plan with the given object data
			</p>
			<p class="text-xl text-gray-600 mb-3">Example usage:</p>
			<div class="w-full bg-gray-400">
				<pre class="text-white p-3">PATCH /api/trainingPlans
body: &#123;plan object&#125;</pre>
			</div>
		</div>
	</div>
</div>
