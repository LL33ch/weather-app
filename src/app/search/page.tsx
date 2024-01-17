import { getWeatherData } from '@/actions/getWeatherData'
import AirPollution from '@/components/widgets/AirPollution'
import CurrentWeather from '@/components/widgets/CurrentWeather'
import HourlyForecast from '@/components/widgets/HourlyForecast'
import { WeatherData } from '@/lib/types'
import { Metadata } from 'next'

interface searchParamsProps {
	q: string
}

export async function generateMetadata({
	searchParams,
}: {
	searchParams: searchParamsProps
}): Promise<Metadata> {
	const { q } = searchParams;
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

export default async function SearchPage({
	searchParams,
}: {
	searchParams: searchParamsProps
}) {
	const { q } = searchParams;
	try {
		const WeatherDataRequest: WeatherData = await getWeatherData({ q });

		const [weather] = await Promise.all([WeatherDataRequest]);

		return (
			<div className="grid sm:grid-cols-[auto,auto] grid-cols-1 gap-4">
				<div>
					<CurrentWeather data={weather} city={weather.location.name} />
				</div>
				<section className="grid gap-4">
					<AirPollution data={weather} />
					<HourlyForecast data={weather} />
				</section>
			</div>
		);
	} catch (error) {
		console.error('Error fetching data:', error);
		return (
			<main className="flex min-h-screen container mt-3">
				<div>{error instanceof Error ? error.message : 'Ошибка получения данных.'}</div>
			</main>
		);
	}
}