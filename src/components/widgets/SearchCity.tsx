'use client'
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command"
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { SearchData } from '@/lib/types';


export default function SearchCity() {
	const [open, setOpen] = useState<boolean>(false);
	const [value, setValue] = useState<string>();
	const [searchResults, setSearchResults] = useState<SearchData>([]);

	useEffect(() => {
		if (value && value.length > 2) {
			const handleSearch = async () => {
				try {
					const res = await fetch(`https://api.weatherapi.com/v1/search.json?key=fa16da9491fa4fd68c4115006241401&lang=ru&q=${value}`);

					if (!res.ok) {
						throw new Error(`Ошибка при получении данных. Статус: ${res.status}`);
					}

					const data = await res.json();
					console.log(data);
					setSearchResults(data);
				} catch (error) {
					console.error(error);
				}
			};

			handleSearch();
		}

	}, [value]);

	return (
		<>
			<Button onClick={() => setOpen(true)} variant='secondary'>
				<Search className='w-4 h-4 me-1' />
				Поиск
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput
					placeholder="Введите название города"
					value={value}
					onInput={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
				/>
				<CommandList>
					<CommandGroup>
						{searchResults.map((result) => (
							<Link href={`/search/${result.lat},${result.lon}`} key={result.id}>
								<CommandItem>
									{result.name} - {result.country}
								</CommandItem>
							</Link>
						))}
					</CommandGroup>
					<CommandEmpty>Ничего не найдено.</CommandEmpty>
					<CommandGroup heading="Популярные запросы">
						<Link href="/search/Москва"><CommandItem>Москва</CommandItem></Link>
						<Link href="/search/Санкт-Петербург"><CommandItem>Санкт-Петербург</CommandItem></Link>
						<Link href="/search/Новосибирск"><CommandItem>Новосибирск</CommandItem></Link>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</>
	);
};