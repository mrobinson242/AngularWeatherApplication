import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GeolocationService
{
  /**
   * Constructor
   */
  constructor(private http: HttpClient){}

  /**
   * getGeolocation
   */
  getGeolocation()
  {
    return this.http.get("http://ip-api.com/json");
  }
}