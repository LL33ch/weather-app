export function convertUnixToDate(dateEpoch: number, type?: string): string {
	const months = [
		'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
		'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
	];
	const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

	const dateInMillis = dateEpoch * 1000;
	const dateObject = new Date(dateInMillis);

	const day = dateObject.getDate();
	const month = months[dateObject.getMonth()];
	const dayOfWeekText = daysOfWeek[dateObject.getDay()]

	if (type === 'dayOfWeek') {
		return `${dayOfWeekText}`
	}
	return `${day} ${month}`
}