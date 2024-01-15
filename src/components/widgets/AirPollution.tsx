import React from "react"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card"
import { Progress } from "../ui/progress"
import { CurrentWeatherData } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ClassNameValue } from "tailwind-merge"
import { Fan } from 'lucide-react'

interface AirPollutionProps {
	data: CurrentWeatherData
	className?: ClassNameValue
}

export default function AirPollution({
	data,
	className,
}: AirPollutionProps) {
	console.log(data)
	return (
		<Card className='order-2 col-span-2 flex h-48 flex-col justify-between bg-zinc-900/45'>
			<CardHeader>
				<CardTitle className='flex flex-row items-center gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-400 md:text-base md:font-medium'>
					<Fan className="mr-2 h-4 w-4 flex self-center" />
					Загрязнение воздуха
				</CardTitle>
			</CardHeader>
			<CardContent className="my-auto">
				<Progress aria-label="Air pollution" value={data.current.air_quality['us-epa-index'] * 10} />
			</CardContent>
			<CardFooter>
				<p>
					{data.current.air_quality['us-epa-index'] === 1
						? "Качество воздуха хорошее."
						: data.current.air_quality['us-epa-index'] === 2
							? "Качество воздуха умеренное."
							: data.current.air_quality['us-epa-index'] === 3
								? "Качество воздуха неблагоприятное для чувствительных групп."
								: data.current.air_quality['us-epa-index'] === 4
									? "Качество воздуха вредное."
									: data.current.air_quality['us-epa-index'] >= 5
										? "Качество воздуха очень вредное."
										: "Качество воздуха опасное."}
				</p>

			</CardFooter>
		</Card>
	)
}