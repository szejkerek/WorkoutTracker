<script lang="ts">
	export const load = async () => {
		const userInfo = await fetch(
			`/api/user_info/?uid=zl6IkcON3os40ExAp2BE`
		);

		return await userInfo.json();
	};
</script>

<h1>halo xd</h1>
