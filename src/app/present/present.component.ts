import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-present',
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.css']
})
export class PresentComponent implements OnInit {
  lat;
  lon;
  weather;
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getLocation();
  }
  getLocation(){
    if("geolocation" in navigator){
      navigator.geolocation.watchPosition((success)=>{
        this.lat=success.coords.latitude;
        this.lon=success.coords.longitude;

        this.weatherService.getWeatherDataByCoords(this.lat,this.lon).subscribe(data=>{
        this.weather=data;
        }) ;
      })
    }
  }
  getCity(city){
    this.weatherService.getWeatherDataByCityName(city).subscribe(data=>{
      this.weather=data;
    })
  }

}
