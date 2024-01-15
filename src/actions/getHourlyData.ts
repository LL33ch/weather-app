export const getHourlyData = async ({ q }: { q: string }) => {

	const data = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_DOMAIN}/api/weather/hourly?q=${q}&key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
	if (!data.ok) {
		throw new Error("Failed to fetch data")
	}

	return data.json()
}