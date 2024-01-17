import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertUnixToDate(dateEpoch: number): string {
  const months = [
    'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
  ];

  const dateInMillis = dateEpoch * 1000;
  const dateObject = new Date(dateInMillis);

  const day = dateObject.getDate();
  const month = months[dateObject.getMonth()];

  return `${day} ${month}`;
}