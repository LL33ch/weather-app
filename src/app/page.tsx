import { getCurrentWeatherData } from '@/actions/getCurrentWeatherData';
import { getHourlyData } from '@/actions/getHourlyData';
import AirPollution from '@/components/widgets/AirPollution';
import CurrentWeather from '@/components/widgets/CurrentWeather';
import HourlyForecast from '@/components/widgets/HourlyForecast';
import { CurrentWeatherData, HourlyForecastData } from '@/lib/types';

export default async function Home() {
  const q = 'Краснодар'

  const CurrentWeatherDataRequest: CurrentWeatherData = await getCurrentWeatherData({ q })
  const HourlyForecastDataRequest: HourlyForecastData = await getHourlyData({ q });

  const [current_weather, hourly_data] = await Promise.all([CurrentWeatherDataRequest, HourlyForecastDataRequest])

  return (
    <div className="grid sm:grid-cols-[auto,1fr] grid-cols-1 gap-4 sm:min-h-screen container mt-3 ">
      <div>
        <CurrentWeather data={current_weather} city={current_weather.location.name} />
        {/* <HourlyForecast data={hourly_data.forecast} /> */}
      </div>
      <section className="grid h-full w-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        <AirPollution data={current_weather} />
      </section>
    </div>
  )
}
