import { formatDate } from 'date-fns';

export const FormatDate = (date: string) => formatDate(new Date(date), 'dd-MM-yyyy');
