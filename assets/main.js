const API_KEY = `b3c0141d17a36cf69b9e831d6813c519`
const $ = document.querySelector.bind(document);
const searchInput = $("#search-input")
const cityName = $('.city-name')
const weatherState = $('.weather-state')
const weatherIcon = $('.weather-icon')
const temperature = $('.temperature')
const info = $('.main-info')
const sunrise = $('.sunrise')
const sunset = $('.sunset')
const humidity = $('.humidity')
const windSpeed = $('.wind-speed')
const defaultValue = '__'
let searchValue = 'Ha Noi'


searchInput.addEventListener('change', async (e)=>{
    searchValue = e.target.value
    renderData(searchValue)
})

async function renderData(searchValue) {
    try {
        const responese = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${API_KEY}&lang=vi&units=metric`)
        const datas = await responese.json()

        cityName.innerHTML = datas.name || defaultValue
        weatherState.innerHTML = datas.weather[0].description || defaultValue
        weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${datas.weather[0].icon}@2x.png`)
        temperature.innerHTML = Math.round(datas.main.temp) || defaultValue
        sunrise.innerHTML = moment.unix(datas.sys.sunrise).format('H:mm') || defaultValue
        sunset.innerHTML = moment.unix(datas.sys.sunset).format('H:mm') || defaultValue
        humidity.innerHTML = datas.main.humidity || defaultValue
        windSpeed.innerHTML = (datas.wind.speed*3.6).toFixed(2) || defaultValue
        searchInput.value = ''
    } catch (error) {
        cityName.innerHTML = defaultValue
        weatherState.innerHTML = defaultValue
        weatherIcon.setAttribute('src', `./assets/img/error-img.avif`)
        temperature.innerHTML = defaultValue
        sunrise.innerHTML = defaultValue
        sunset.innerHTML = defaultValue
        humidity.innerHTML = defaultValue
        windSpeed.innerHTML = defaultValue
        searchInput.value = ''
    }
}
renderData(searchValue)