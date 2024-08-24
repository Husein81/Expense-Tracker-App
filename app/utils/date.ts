
export function getFormatedDate (date: Date): string{
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export const getDateMinusDays = (date: Date, days: number): Date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}