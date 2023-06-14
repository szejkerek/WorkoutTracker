export function sortScuffedDateAsc(lhs: String, rhs: String): number {
    const leftComps = lhs.split('/').map(n => parseInt(n)).reverse();
    const rightComps = rhs.split('/').map(n => parseInt(n)).reverse();

    if(leftComps[0] !== rightComps[0]) {
        return rightComps[0] - leftComps[0];
    }

    if(leftComps[1] !== rightComps[1]) {
        return rightComps[1] - leftComps[1];
    }

    if(leftComps[2] !== rightComps[2]) {
        return rightComps[2] - leftComps[2];
    }

    return 0;
}