import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function formatDate(date: Date = new Date()): string {
  return format(date, "d MMM", { locale: es });
}
