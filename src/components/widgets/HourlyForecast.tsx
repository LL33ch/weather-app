"use client"
import { WeatherData } from "@/lib/types"
import { Card } from "../ui/card"
import Image from 'next/image';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { convertUnixToDate } from '@/lib/dateUtils';
import { CloudHail } from 'lucide-react';

interface HourlyForecastProps {
	data: WeatherData
}

interface HourlyForecast {
	forecastday: Array<{
		date: string
		date_epoch: number
		day: {
			maxtemp_c: number
			maxtemp_f: number
			mintemp_c: number
			mintemp_f: number
			avgtemp_c: number
			avgtemp_f: number
			maxwind_mph: number
			maxwind_kph: number
			totalprecip_mm: number
			totalprecip_in: number
			totalsnow_cm: number
			avgvis_km: number
			avgvis_miles: number
			avghumidity: number
			daily_will_it_rain: number
			daily_chance_of_rain: number
			daily_will_it_snow: number
			daily_chance_of_snow: number
			condition: {
				text: string
				icon: string
				code: number
			}
			uv: number
			air_quality: {
				co: number
				no2: number
				o3: number
				so2: number
				pm2_5: number
				pm10: number
				"us-epa-index": number
				"gb-defra-index": number
			}
		}
		astro: {
			sunrise: string
			sunset: string
			moonrise: string
			moonset: string
			moon_phase: string
			moon_illumination: number
			is_moon_up: number
			is_sun_up: number
		}
		hour: Array<{
			time_epoch: number
			time: string
			temp_c: number
			temp_f: number
			is_day: number
			condition: {
				text: string
				icon: string
				code: number
			}
			wind_mph: number
			wind_kph: number
			wind_degree: number
			wind_dir: string
			pressure_mb: number
			pressure_in: number
			precip_mm: number
			precip_in: number
			snow_cm: number
			humidity: number
			cloud: number
			feelslike_c: number
			feelslike_f: number
			windchill_c: number
			windchill_f: number
			heatindex_c: number
			heatindex_f: number
			dewpoint_c: number
			dewpoint_f: number
			will_it_rain: number
			chance_of_rain: number
			will_it_snow: number
			chance_of_snow: number
			vis_km: number
			vis_miles: number
			gust_mph: number
			gust_kph: number
			uv: number
			air_quality: {
				co: number
				no2: number
				o3: number
				so2: number
				pm2_5: number
				pm10: number
				"us-epa-index": number
				"gb-defra-index": number
			}
			short_rad: number
			diff_rad: number
		}>
	}>
}

export default function HourlyForecast({ data }: HourlyForecastProps) {
	const currentDate = new Date();
	const currentHour = currentDate.getHours();
	const currentDay = currentDate.getDate();

	function extractHMFromDate(dt: number, tz: string): string {
		const date = new Date(dt * 1000);
		const options: Intl.DateTimeFormatOptions = {
			hour: '2-digit',
			minute: '2-digit',
			timeZone: tz,
		};
		const formattedTime = new Intl.DateTimeFormat('default', options).format(date);
		return formattedTime;
	}

	function extractDayFromDate(dt: number): number {
		const date = new Date(dt * 1000)
		const day = date.getDate();
		return day;
	}

	function compareCurrentHour(dateEpoch: number): boolean {
		const selectedDate = new Date(dateEpoch * 1000);
		const selectedHour = selectedDate.getHours();
		return currentHour === selectedHour;
	}

	const firstDayHoursArr = (data.forecast.forecastday[0].hour);
	const secondDayHoursArr = (data.forecast.forecastday[1].hour);

	const HoursArr = firstDayHoursArr.concat(secondDayHoursArr);
	const croppedHoursArr = HoursArr.filter((hour, index) => index >= currentHour);
	const getIndex = croppedHoursArr.findIndex((hours) => hours.time_epoch === data.forecast.forecastday[1].hour[0].time_epoch)

	const willItRainNow = data.forecast.forecastday[0].hour[currentHour]?.will_it_rain;
	const willItRainNextHour = data.forecast.forecastday[0].hour[currentHour + 1]?.will_it_rain;

	return (
		<div>
			<div className='block md:hidden text-center mb-3'>
				{(willItRainNow && willItRainNextHour) ? <Badge variant="secondary" className='text-base'><CloudHail className='h-5 w-5 me-1' /> В течении 2 часов дождь не прекратится</Badge> : null}
				{(!willItRainNow && willItRainNextHour) ? <Badge variant="secondary" className='text-base'><CloudHail className='h-5 w-5 me-1' /> В течении 2 часов начнётся дождь</Badge> : null}
				{(willItRainNow && !willItRainNextHour) ? <Badge variant="secondary" className='text-base'><CloudHail className='h-5 w-5 me-1' /> В течении 2 часов дождь прекратится</Badge> : null}
			</div>
			<div className='mb-1 font-medium flex justify-between'>
				<div>Почасовой прогноз <Badge variant="outline">{convertUnixToDate(data.forecast.forecastday[0].date_epoch)} и {convertUnixToDate(data.forecast.forecastday[1].date_epoch)}</Badge></div>
				<div className='hidden md:block'>
					{(willItRainNow && willItRainNextHour) ? <Badge variant="secondary"><CloudHail className='h-5 w-5 me-1' /> В течении 2 часов дождь не прекратится</Badge> : null}
					{(!willItRainNow && willItRainNextHour) ? <Badge variant="secondary"><CloudHail className='h-5 w-5 me-1' /> В течении 2 часов начнётся дождь</Badge> : null}
					{(willItRainNow && !willItRainNextHour) ? <Badge variant="secondary"><CloudHail className='h-5 w-5 me-1' /> В течении 2 часов дождь прекратится</Badge> : null}
				</div>
			</div>
			<Card className='order-2 h-fit bg-zinc-100 dark:bg-zinc-900/45 cursor-grab '>
				<Carousel opts={{ dragFree: true, containScroll: 'trimSnaps', }} className='w-full'>
					<CarouselContent className='-ml-1 grid grid-flow-col lg:auto-cols-[8%] md:auto-cols-[15%] auto-cols-[17%]'>
						{croppedHoursArr.map((hour, index) => (
							<CarouselItem
								key={hour.time_epoch}
								className={`basis-[6%] py-3 pl-1 outline outline-1 outline-offset-0 outline-zinc-200 
								${getIndex == index ? 'border-l-4 border-zinc-300' : ''}`}>
								<div className='p-1'>
									<div className={`flex justify-center text-sm text-neutral-600 dark:text-neutral-400 ${(compareCurrentHour(hour.time_epoch) && currentDay == extractDayFromDate(hour.time_epoch)) ? 'font-medium' : null}`}>
										{extractHMFromDate(hour.time_epoch, `${data.location.tz_id}`)}
									</div>
									<div className="flex items-center justify-center">
										<Image
											src={`https:${hour.condition.icon}`}
											width={75}
											height={75}
											alt="Picture of the author"
										/>
									</div>
									<div className={`flex justify-center ${(compareCurrentHour(hour.time_epoch) && currentDay == extractDayFromDate(hour.time_epoch)) ? 'font-medium' : null}`}>
										{Math.floor(hour.temp_c)}&deg;
									</div>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</Card>
		</div>
	)
}