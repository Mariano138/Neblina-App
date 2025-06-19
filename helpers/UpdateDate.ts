import { formatDate } from 'date-fns';
//Helper para crear la fecha de modificacion de cada nota.
export const UpdateDate = () => formatDate(new Date(), 'dd-MM-yyyy');
