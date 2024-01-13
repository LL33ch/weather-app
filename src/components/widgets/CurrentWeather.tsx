import { OpenWeatherData } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { convertToDate } from '@/lib/dateUtils';
import Image from 'next/image';

interface CurrentWeatherProps {
	data: OpenWeatherData
	city: string
}

export default function CurrentWeather({ data, city }: CurrentWeatherProps) {

	return (
		<Card className="relative flex h-fit w-auto shrink-0 flex-col justify-between overflow-hidden">
			<CardHeader>
				<CardTitle>{city}</CardTitle>
				<CardDescription className='capitalize'>
					{convertToDate(data.timezone, data.dt, "long")}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex justify-center py-7 text-8xl font-bold md:py-10 px-10">
					{Math.round(data.main.temp)}&deg;
				</div>
			</CardContent>
			<CardFooter>
				<div>
					<Image
						src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
						width={50}
						height={50}
						alt="Picture of the author"
					/>					<div className="font-semibold capitalize">{data.weather[0].description}</div>
					<div className="flex gap-2 dark:text-neutral-500">
						<span>Мин: {Math.round(data.main.temp_max)}&deg;</span>
						<span>Макс: {Math.round(data.main.temp_min)}&deg;</span>
					</div>
				</div>
			</CardFooter>
		</Card>
	)
}