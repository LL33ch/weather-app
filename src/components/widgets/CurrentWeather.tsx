import { CurrentWeatherData } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { weatherConditions } from '@/lib/weatherConditions';

interface CurrentWeatherProps {
	data: CurrentWeatherData
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
			className="relative sm:w-[17rem] md:w-[25rem] w-full overflow-hidden bg-zinc-900/45 bg-cover backdrop-opacity-35">
			<div className='absolute inset-0 -z-10 opacity-0 dark:opacity-35 bg-cover' style={{ backgroundImage: `url("${bgImage}")` }} />
			<CardHeader>
				<CardTitle>{city}</CardTitle>
				<CardDescription>
					{data.location.country}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex justify-center py-7 text-8xl font-bold px-10">
					{data.current.temp_c > 0 ? `+${Math.round(data.current.temp_c)}` : Math.round(data.current.temp_c)}&deg;
				</div>
			</CardContent>
			<CardFooter>
				<div className='flex items-center gap-3'>
					<Image
						src={`https://${data.current.condition.icon}`}
						width={50}
						height={50}
						alt="Picture of the author"
					/>
					<div className="font-semibold">{data.current.condition.text}</div>
				</div>
			</CardFooter>
		</Card>
	)
}