export const environment = {
  production: false,
  base_url: 'http://localhost:3000',
  icons: '/weather-icons',
  weatherAPI: 'https://api.openweathermap.org/data/2.5/weather?q=',
  appId:`&appid=${process.env["OPEN_WEATHER_API_KEY"]}&units=metric`,
};
