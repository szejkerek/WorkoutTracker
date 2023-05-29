// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			value: Number,
			owner: String,
			cos: String
		}
		// interface Platform {}
	}
}

export {};
