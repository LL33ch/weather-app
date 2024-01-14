'use client'
import { useEffect, useState } from 'react';
import { getCurrentWeatherData } from '@/actions/getCurrentWeatherData';
import CurrentWeather from '@/components/widgets/CurrentWeather';
import { OpenWeatherData } from '@/lib/types';
import { Loader2, NavigationOff } from 'lucide-react';
import { Badge } from "@/components/ui/badge"

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState<OpenWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [Geolocation, setGeolocation] = useState<boolean>(false);
  const savedCoordsString = localStorage.getItem('coords');

  const fetchData = async (latitude: number, longitude: number) => {
    try {
      const currentWeatherDataRequest: OpenWeatherData = await getCurrentWeatherData({
        lat: String(latitude),
        lon: String(longitude),
      });
      setIsLoading(false);
      setCurrentWeather(currentWeatherDataRequest);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeolocation(true);
          const { latitude, longitude } = position.coords;
          const coordsString = `${latitude},${longitude}`;

          localStorage.setItem('coords', coordsString);
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          fetchData(latitude, longitude);
        },
        (error) => {
          console.error('Error getting geolocation:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  if (savedCoordsString) {
    const [savedLatitude, savedLongitude] = savedCoordsString.split(',');
    const latitude = parseFloat(savedLatitude);
    const longitude = parseFloat(savedLongitude);

    // Если координаты уже есть в localStorage, используем их для запроса данных
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    fetchData(latitude, longitude);
  }


  return (
    <main className="grid place-items-center min-h-screen">
      {isLoading && (
        <Loader2 className='animate-spin w-[2.5rem] text-zinc-400' />
      )}
      {(!Geolocation && !savedCoordsString) && (
        <Badge>Нет доступа к местоположению</Badge>
      )}
      {currentWeather && (
        <CurrentWeather data={currentWeather} city={currentWeather.name} />
      )}
    </main>
  );
}

