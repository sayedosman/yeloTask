import { Injectable } from '@angular/core';
import { Car } from '../model/car';
import { ErrorDetails } from '../model/error-details';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  constructor(private httpClient:HttpClient) { }
  deleteCar(carId:Number):Observable<Boolean>{
    console.log(carId);
    return this.httpClient.delete<Boolean>("http://localhost:8080/cars/"+carId);
  }
  getAllCars():Observable<Array<Car>>{
    return this.httpClient.get<Array<Car>>("http://localhost:8080/cars")
  }
  addCar(car:Car):Observable<ErrorDetails>{
    return this.httpClient.post<ErrorDetails>("http://localhost:8080/cars/addCar",car)
  }
  SerchByNameOrModel(key:string):Observable<Array<Car>>{

    return this.httpClient.get<Array<Car>>("http://localhost:8080/cars/serch/"+key)
  }
  FilterByNameOrModel(key:string):Observable<Array<Car>>{

    return this.httpClient.get<Array<Car>>("http://localhost:8080/cars/filter/"+key)
  }
}
