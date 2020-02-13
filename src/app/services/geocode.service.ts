import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient} from '@angular/common/http';

// Import Services
import { DisplayService } from "../services/display.service"
import { ProgressService } from '../services/progress.service';

@Injectable()
export class GeocodeService
{
    // Create JsonData
    private jsonData: any;

    // Form Variables
    private street : string;
    private city : string;
    private state : string;

    @Output() geocodeEmitter = new EventEmitter<any>();

    /**
     * Constructor
     */
     constructor(private http: HttpClient,
                 private displayService : DisplayService,
                 private progressService : ProgressService){}

    /**
     * getGeocodeData - Rquest to get data from Google Geocode API
     */
     getGeocodeData(street:string, city: string, state: string, saveParams: boolean)
     {
        // Form URL
        var url = 'http://octofire.us-east-2.elasticbeanstalk.com/geocode/?street=' + street + '&city=' + city + '&state=' + state;

        // Subscribe to Node.js Request
        this.http.get(url).subscribe(data => 
        {
            // Set Forecast Data
            this.jsonData = data;

            if(data["status"] == "ZERO_RESULTS")
            {
                // Display "Invalid Address Alert"
                this.displayService.setAlertViewVisible(true);
                this.displayService.setTabViewVisible(false);
                this.progressService.showProgressBar(false);
            }
            else
            {
                //Hide "Invalid Address Alert"
                this.displayService.setAlertViewVisible(false);

                // Publish Data to Subscribers
                this.geocodeEmitter.emit(this.jsonData);
            }
        });

        if(saveParams)
        {
            // save form params
            this.street = street;
            this.city = city;
            this.state = state;
        }
        else
        {
            this.street = street;
            this.city = city;
            this.state = "";
        }
    }

    // Getters
    getStreet() { return this.street; }
    getCity() { return this.city; }
    getState() { return this.state; }
}