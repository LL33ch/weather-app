import { WeatherData } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { weatherConditions } from '@/lib/weatherConditions';

interface CurrentWeatherProps {
	data: WeatherData
	city: string
}

function setBgMap(code: number): string {
	const condition = weatherConditions.find((item) => item.code === code);
	return condition ? condition.img! : '';
}

export default function CurrentWeather({ data, city }: CurrentWeatherProps) {
	const bgImage = setBgMap(data.current.condition.code);


	return (
		<Card
			className="relative sm:min-w-[19rem] w-full h-full overflow-hidden bg-blue-500 text-white dark:bg-zinc-900/45 bg-cover backdrop-opacity-35">
			<div className='absolute inset-0 -z-10 opacity-70 dark:opacity-35 bg-cover' style={{ backgroundImage: `url("../${bgImage}")` }} />
			<CardHeader>
				<div className='flex justify-between'>
					<div>
						<CardTitle>{city}</CardTitle>
						<CardDescription className='text-gray-200'>
							{data.location.country}
						</CardDescription>
					</div>
				</div>
			</CardHeader>
			<CardContent>
				<div className="flex justify-center py-7 text-8xl font-medium px-10">
					{data.current.temp_c > 0 ? `+${Math.round(data.current.temp_c)}` : Math.round(data.current.temp_c)}&deg;
				</div>
			</CardContent>
			<CardFooter>
				<div className='flex items-center gap-3'>
					<Image
						src={`https:${data.current.condition.icon}`}
						width={50}
						height={50}
						alt="Picture of the author"
						priority
					/>
					<div>
						<span className='font-semibold'>{data.current.condition.text}</span>
						<div className="flex gap-2 text-gray-200 dark:text-neutral-500">
							<span>Мин: {Math.round(data.forecast.forecastday[0].day.mintemp_c)}&deg;</span>
							<span>Макс: {Math.round(data.forecast.forecastday[0].day.maxtemp_c)}&deg;</span>
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	)
}