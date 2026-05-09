# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Code Highlights

### Bitwise Exercise Type Flags

```typescript
// src/lib/enums/exerTypes.ts
export enum ExerciseEnum {
    None = 0,
    Weight = 1,
    Reps = 1 << 1,
    Distance = 1 << 2,
    Time = 1 << 3,
    WeightReps = Weight + Reps,
    WeightDistance = Weight + Distance,
    WeightTime = Time + Weight,
    TimeReps = Time + Reps,
    DistanceTime = Distance + Time,
    RepsDistance = Reps + Distance
}
```

Exercise types are encoded as bitwise flags, allowing any combination of metrics (weight, reps, distance, time) to be represented as a single integer. Composite types like `WeightReps` are defined by summing their component flags. Template code then uses bitwise AND to conditionally render only the relevant metric fields, keeping UI logic tightly coupled to the type system without a branching lookup table.

### LocalStorage-Backed Svelte Store

```typescript
// src/stores/userSession.ts
import { derived, writable } from "svelte/store";

const getUserSession = (): User | null => {
    try {
        const storedSession = localStorage.getItem('sessionData');
        return storedSession ? JSON.parse(storedSession) : null;
    } catch (err) {
        console.error('Error while accessing localStorage: ', err);
    }
    return null;
}

const setUserSession = (user: User | null) => {
    try {
        localStorage.setItem('sessionData', JSON.stringify(user));
    } catch(err) {
        console.error('Error while accessing localStorage:', err);
    }
}

const userSessionStore = writable<User | null>(getUserSession());
userSessionStore.subscribe(user => setUserSession(user));

export const userSessionData = {
    subscribe: userSessionStore.subscribe,
    set: userSessionStore.set
}
```

Authentication state is managed through a custom Svelte store that initializes from `localStorage` on load and automatically syncs every state change back to `localStorage` via a subscription. The exported object exposes only `subscribe` and `set`, hiding the internal writable store and preventing arbitrary mutations — a minimal, encapsulated public interface over a reactive persistence layer.

### Nested Promise.all for Denormalized Data Enrichment

```typescript
// src/routes/api/posts/+server.ts (lines 14-54)
const mappedPosts = posts.map(async (post): Promise<Post> => {
    const authorRef = await event.fetch(`/api/users/${post.data.authorId}`, {
        method: 'GET'
    });
    const author = await authorRef.json();
    const comments = post.data.comments;

    const mappedComments = comments.map(async (comment: any): Promise<PostComment> => {
        const commentAuthorRef = firestore.collection("Users").doc(comment.authorId);
        const commentAuthor: any = (await commentAuthorRef.get()).data();
        commentAuthor.id = commentAuthorRef.id;

        return {
            author: commentAuthor,
            content: comment.content,
            date: comment.date
        };
    });
    
    let comets: PostComment[] = [];
    await Promise.all(mappedComments).then(res => {
        comets = res;
    });
    
    return {
        id: post.id,
        author: author.data,
        content: post.data.content,
        date: post.data.date,
        likedByIds: post.data.likedByIds,
        comments: comets
    };
});

let pots: Post[] = [];
await Promise.all(mappedPosts).then(res => {
    pots = res;
});
```

Because Firestore stores references (IDs) rather than embedded documents, the GET `/api/posts` endpoint reconstructs fully hydrated `Post` objects through two levels of concurrent async resolution: all posts are fetched in parallel via an outer `Promise.all`, and within each post, all comment authors are resolved in parallel via an inner `Promise.all`. This avoids sequential waterfall fetches while correctly handling the denormalized NoSQL data model.
