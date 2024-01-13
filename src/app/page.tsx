'use client'
import { useEffect, useState } from 'react';
import { getCurrentWeatherData } from '@/actions/getCurrentWeatherData';
import CurrentWeather from '@/components/widgets/CurrentWeather';
import { OpenWeatherData } from '@/lib/types';

export default function Home() {
  const [currentWeather, setCurrentWeather] = useState<OpenWeatherData | null>(null);

  const fetchData = async (latitude: number, longitude: number) => {
    try {
      const currentWeatherDataRequest: OpenWeatherData = await getCurrentWeatherData({
        lat: String(latitude),
        lon: String(longitude),
      });
      setCurrentWeather(currentWeatherDataRequest);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
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

  return (
    <main className="grid place-items-center min-h-screen">
      {currentWeather && (
        <CurrentWeather data={currentWeather} city={currentWeather.name} />
      )}
    </main>
  );
}

