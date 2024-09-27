export default {
    inject: ["current", "forecast", "getForecast", "getForecastCurrentLocation", "getStoredWeatherData", "register", "unsubscribe", "notification"],
    data() {
        return {

        }
    },
    template:`
        <div class="col-4 ms-4 mt-4">
            <div class="mb-3">
            <form @submit.prevent= "getStoredWeatherData(search)"  role="search">
                <label for="cityName" class="form-label fw-bold fs-5">Enter a City name</label>
                <input type="search" class="form-control" placeholder="E.g.,New York, London, Tokyo" v-model = "search">
                <button type="submit" class="btn btn-primary mt-3">Search</button>               
            </form>
            </div>          
            <div class="hr-with-text">or</div>
            <form @submit.prevent= "getForecastCurrentLocation()">
                <button type="submit" class="btn btn-secondary">Use Current Location</button>
            </form>
            <div class="mt-5"> 
            <form>
                <label for="email" class="form-label fw-bold fs-5">Enter your email address</label>
                <input type="search" class="form-control" placeholder="Email..." v-model = "email">
                <p class="notification fs-7 mt-1">{{notification}}</p>
                <div class = "row">
                    <div class="col-5">
                        <button type="button" class="btn btn-primary mt-2" style="width: 130px" @click="register(email)">Register</button>
                    </div>
                    <div class="col-5">
                        <button type="button" class="btn btn-secondary mt-2" style="width: 130px" @click="unsubscribe(email)">Unsubscribe</button>
                    </div>
                </div>
                
            </form>
            </div>
        </div>
        <div class="information col-7 mt-4">
            <div class="currentDay">
                <div class="alert">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="infoCurrent">
                            <p class="fw-bold fs-5">{{current.city}}({{current.date}})</p>
                            <p>Temperature: {{current.temperature}} 'C</p>
                            <p>Wind: {{current.wind}} M/S</p>
                            <p>Humidity: {{current.humidity}}%</p>
                        </div>
                        <span class="material-symbols-outlined present-day">
                            rainy
                        </span>
                    </div>
                </div>
            </div>
            <p class="fw-bold fs-4">4-Day Forecast</p>
            <div class="4Day d-flex justify-content-between align-items-center">
                <template v-for="(f, index) in forecast.slice(1)" :key="index">
                <div class="infor4Day">
                    <p class="fw-bold fs-6">{{f.date}}</p>
                    <span class="material-symbols-outlined forecast">
                        thunderstorm
                    </span>
                    <p>Temp: {{f.temperature}}'C</p>
                    <p>Wind: {{f.wind}} M/S</p>
                    <p>Humidity: {{f.humidity}}%</p>
                </div>
                </template>
            </div>
        </div>
    `
}