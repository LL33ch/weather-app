import { getWeatherData } from '@/actions/getWeatherData';
import AirPollution from '@/components/widgets/AirPollution';
import CurrentWeather from '@/components/widgets/CurrentWeather';
import HourlyForecast from '@/components/widgets/HourlyForecast';
import { WeatherData } from '@/lib/types';

export default async function Home() {
  const q = 'Краснодар'

  const WeatherDataRequest: WeatherData = await getWeatherData({ q })

  const [weather] = await Promise.all([WeatherDataRequest])

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
  )
}
