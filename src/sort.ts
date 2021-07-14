import { HistoryItem } from "./typings/niconico";

export default (items: Array<HistoryItem>) => {
    return items.sort((a, b) => {
        if (a.watch_date < b.watch_date) return -1;
        if (a.watch_date > b.watch_date) return 1;
        return 0;
    });
}