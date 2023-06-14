export function parseDate(): string {
    const today = new Date();
    const day   = today.getDate();
    const month = today.getMonth() + 1;
    
    let parsedDay   = day < 10 ? "0" + day : day;
    let parsedMonth = month < 10 ? "0" + month : month;

    return parsedDay + "/" + parsedMonth + "/" + today.getFullYear();
}