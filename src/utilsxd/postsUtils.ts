export function sortPostsByScuffedDate(posts: Post[]) {
    posts.sort((lhs: Post, rhs: Post): number => {
        const leftDates  = lhs.date.split('/').map(n => parseInt(n));
        const rightDates = rhs.date.split('/').map(n => parseInt(n));

        if(leftDates[2] !== rightDates[2]) {
            return rightDates[2] - leftDates[2];
        }

        if(leftDates[1] !== rightDates[1]) {
            return rightDates[1] - leftDates[1];
        }

        if(leftDates[0] !== rightDates[0]) {
            return rightDates[0] - leftDates[0];
        }

        return 0;
    });
}