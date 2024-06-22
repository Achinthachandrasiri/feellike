import WeatherStyle from "./CurrentWeather.css";
const CurrentWeather = ({ data }) => {
    const iconUrl = require(`../../../public/icons/${data.weather[0].icon}.png`);
    console.log('Icon URL:', iconUrl);
    return (
        <div>
            <div className="weather">
                <div className="Heading">
                </div>
                <div className="wrap">
                    <div className="top">
                        <p className="city">{data.city}</p>
                        <p className="description">{data.weather[0].description}</p>
                    </div>
                    <div className="image">
                        <img className="wether-icon" src={iconUrl} alt="icon" />
                    </div>
                </div>
                <div className="DetailDiv">
                    <div className="detailSec">
                        <p className="temp">{Math.round(data.main.temp)} °C</p>
                        <p className="detail">feels like{" "}{Math.round(data.main.feels_like)}°C</p>
                    </div>
                    <div className="detailSec">
                        <p className="detail">Wind</p>
                        <p className="detail">{data.wind.speed} m/s</p>
                    </div>
                    <div className="detailSec">
                        <p className="detail">Pressure</p>
                        <p className="detail">{data.main.pressure} hPa</p>
                    </div>
                    <div className="detailSec">
                        <p className="detail">Humidity</p>
                        <p className="detail">{data.main.humidity}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CurrentWeather;