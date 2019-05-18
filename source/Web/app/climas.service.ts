import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { InterfazClima } from './interfaz';
import {map} from 'rxjs/operators';

interface IInformacionClima{
  weather:[{
    description:string,
    icon: string}]

  main:{temp:number}

  sys:{country:string}

  dt:number
  name:string
}

@Injectable({
  providedIn: 'root'
})
export class ClimasService {
  urlBase: string
  appId: string
  constructor(private httpService:HttpClient) {
    this.urlBase = 'https://api.openweathermap.org/data/2.5/weather?'
    this.appId = '01ff1417eeb4a81b09ac68b15958d453'
   }

   getWeatherActual(city:string, country: string): Observable<InterfazClima>{
     return this.httpService.get<IInformacionClima>(`${this.urlBase}q=${city},${country}&appid=${this.appId}`).pipe(map(data =>
      this.transform(data)));
   }

   private transform(data: IInformacionClima): InterfazClima{
     return {
      city: data.name,
      country: data.sys.country,
      date: data.dt * 1000,
      image: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      temperature: data.main.temp - 273,
      description: data.weather[0].description
     }
   }
}
