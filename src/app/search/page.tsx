import { getCurrentWeatherData } from '@/actions/getCurrentWeatherData'
import AirPollution from '@/components/widgets/AirPollution'
import CurrentWeather from '@/components/widgets/CurrentWeather'
import { CurrentWeatherData } from '@/lib/types'
import { Metadata } from 'next'


interface searchParamsProps {
	q: string
}

export async function generateMetadata({ searchParams }: { searchParams: searchParamsProps }): Promise<Metadata> {
	const { q } = searchParams
	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/weather?q=${q}&key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`);

		if (!res.ok) {
			throw new Error(`Failed to fetch data. Status: ${res.status}`);
		}

		const data = await res.json();

		return {
			title: `${data.location.name} - Прогноз погоды`,
			description: `${data.location.name} прогноз погоды с указанием текущих условий, ветра, качества воздуха и чего ожидать на ближайшие 5 дней.`,
		};
	} catch (error: unknown) {
		return {
			title: `Error`,
		};
	}
}


export default async function SearchPage({ searchParams }: { searchParams: searchParamsProps }) {
	try {
		const CurrentWeatherDataRequest: CurrentWeatherData = await getCurrentWeatherData(searchParams)

		const [current_weather] = await Promise.all([CurrentWeatherDataRequest])

		return (
			<div className="grid sm:grid-cols-[auto,1fr] grid-cols-1 gap-4 sm:min-h-screen container mt-3 ">
				<div>
					<CurrentWeather data={current_weather} city={current_weather.location.name} />
				</div>
				<section className="grid h-full w-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
					<AirPollution data={current_weather} />
				</section>
			</div>
		)
	} catch (error) {
		console.error('Error fetching data:', error);
		// Обработка ошибки, например, отображение сообщения пользователю
		return (
			<main className="flex min-h-screen container mt-3">
				<div>Ошибка получения данных.</div>
			</main>
		);
	}
}