import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DarkSkyService
{
    // Create JsonData
    private jsonData: any;

    // Form Information
    private state: string;
    private city: string;
    private currentLocation: any;
    private lat: string;
    private lon: string;

    // Emitters
    @Output() darkSkyEmitter = new EventEmitter<any>();
    @Output() modalEmitter = new EventEmitter<any>();
  
    /**
     * Constructor
     */
    constructor(private http: HttpClient){}

    /**
     * getDarkSkyData - Request to get data from Dark Sky API
     *
     * @param form
     */
    getDarkSkyData(data)
    {
        // Get Latitude/Longitude
        this.lat = data.lat;
        this.lon = data.lon;

        // Form URL
        var url = 'http://octofire.us-east-2.elasticbeanstalk.com/darkSky/?lat=' + this.lat + '&lon=' + this.lon;
    
        // Subscribe to Node.js Request
        this.http.get(url).subscribe(data =>
        {
          // Set Forecast Data
          this.jsonData = data;

          // Publish Data to Subscribers
          this.darkSkyEmitter.emit(this.jsonData);
        });
    }

    /**
     * getModalData
     *
     * @param lat
     * @param lon 
     */
    getModalData(lat, lon, time)
    {
        // Form URL
        var url = 'http://octofire.us-east-2.elasticbeanstalk.com/modal/?lat=' + lat + '&lon=' + lon +'&time=' + time;

        // Subscribe to Node.js Request
        this.http.get(url).subscribe(data =>
        {
            // Publish Data to Subscribers
            this.modalEmitter.emit(data);
        });
    }

    /**
     * setFormInfo - Sets the 
     *
     * @param data
     */
    setFormInfo(city, state)
    {
      // Update Form Info
      this.state = state;
      this.city = city;
    }

    /**
     * setCurrentLocation - Sets the State of the Current Location CheckBox
     *
     * @param currentLocation
     */
    setCurrentLocation(currentLocation)
    {
      this.currentLocation = currentLocation;
    }

    // Getters
    getCity() { return this.city; }
    getState() { return this.state; }
    getData() { return this.jsonData; }
    getCurrentLocation() { return this.currentLocation;}
    getLatitude() { return this.lat; }
    getLongitude() { return this.lon; }
}