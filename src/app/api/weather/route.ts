export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const q = searchParams.get("q")
	const key = searchParams.get("key")

	if (!key) {
		return Response.json(
			{ message: "API key not found in environment variables" },
			{ status: 401 }
		)
	}
	if (!q) {
		return Response.json({ message: "Missing parameters" }, { status: 400 })
	}

	const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${q}&lang=ru&aqi=yes&day=2&key=${key}`,
		{
			next: { revalidate: 900 },
		}
	)

	if (!res.ok) {
		throw new Error("Failed to fetch data")
	}

	const data = await res.json()

	return Response.json(data)
}