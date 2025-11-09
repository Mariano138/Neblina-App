import { formatDate } from 'date-fns';
//Helper para formatear la fecha que pone por default mi db.
export const FormatDate = (date: string | Date) => formatDate(date, 'dd MMM HH:mm');
