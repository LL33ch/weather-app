import next from 'next'

export const getWeatherData = async ({ q }: { q: string }) => {

	const data = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/weather?q=${q}&key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
		{
			cache: 'no-store',
		}
	)
	if (!data.ok) {
		throw new Error("Failed to fetch data")
	}

	return data.json()
}