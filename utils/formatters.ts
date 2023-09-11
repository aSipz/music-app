import formatDuration from "format-duration";

export function formatTime(timeInSec: number = 0) {
    return formatDuration(timeInSec * 1000);
}

export function formatDate(date: Date) {
    return new Date(date).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}