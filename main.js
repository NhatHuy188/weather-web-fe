import vcheader from "./header.js";
import vccontent from "./content.js";
import { computed } from "vue";

export default {
    data() {
        return {
            forecast: [],
            current: {},
            notification: "",
            cityInputNotification: "",
        };
    },
    components: {
        vcheader,
        vccontent
    },
    provide() {
        return {
            forecast: computed(() => this.forecast),
            current: computed(() => this.current),
            notification: computed(() => this.notification),
            cityInputNotification: computed(()=>this.cityInputNotification),
            getForecast: computed(() => this.getForecast),
            getForecastCurrentLocation: computed(() => this.getForecastCurrentLocation),
            getStoredWeatherData: computed(() => this.getStoredWeatherData),
            register: computed(() => this.register),
            unsubscribe: computed(() => this.unsubscribe)
        }

    },
    mounted() {
        //this.getForecast();
        this.getStoredWeatherData();
    },
    methods: {
        async getForecast(cityname = null) {
            try {
                var url = "";
                if (cityname === null) {
                    url = `https://nhathuy188-001-site1.gtempurl.com/api/Weathers?`;
                } else {
                    url = `https://nhathuy188-001-site1.gtempurl.com/api/Weathers?location=${cityname}`;
                }
                console.log(url);
                const res = await fetch(url);
                const data = await res.json();
                console.log(data);
                if(res.status === 500){
                    this.cityInputNotification = data.errorMessage;
                }
                else{                    
                    this.cityInputNotification = "";
                    this.current = data[0];
                    this.forecast = data;
                }
                // Lưu vào localStorage
                localStorage.setItem(
                    `weatherData_${this.current.city}_${this.current.date}`,
                    JSON.stringify(this.forecast)
                );
            } catch (error) {
                console.log(error);
            }
        },
        async getForecastCurrentLocation() {
            try {
                const getLocationData = await fetch('https://geolocation-db.com/json/');
                const locationData = await getLocationData.json();
                var cityname = locationData.city;
                this.getStoredWeatherData(cityname);
            } catch (error) {
                console.log(error);
            }
        },
        async getStoredWeatherData(cityname = null) {
            const currentDate = new Date().toISOString().split('T')[0];            
            const storedWeather = localStorage.getItem(`weatherData_${cityname}_${currentDate}`);
            if(storedWeather){
                this.forecast = JSON.parse(storedWeather);
                this.current = this.forecast[0];
            }
            else{
                this.getForecast(cityname);
            }
        },
        async register(email){
            try {
                var data ={
                    Email: email
                };
                const res = await fetch('https://nhathuy188-001-site1.gtempurl.com/api/Weathers/register',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                if(res.status === 500){
                    const fetchData = await res.json();
                    this.notification = fetchData.errorMessage;
                }
                this.notification = await res.text();
            } catch (error) {
                console.log(error);
            }
        },
        async unsubscribe(email){
            try {
                var data ={
                    Email: email
                };
                const fetchData = await fetch('https://nhathuy188-001-site1.gtempurl.com/api/Weathers/unsubscribe',{
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                this.notification = await fetchData.text();
                console.log(notification);
            } catch (error) {
                console.log(error);
            }
        }
    },
    template: `
    <div class="container mt-2">
    <div class="row">
        <vcheader/>
    </div>
    <div class="row content">
        <vccontent/>
    </div>
    </div>
    `


}
