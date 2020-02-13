import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StateSealService
{
    // Create JsonData
    private jsonData: any;
    private stateSeal: string;

    @Output() stateSealEmitter = new EventEmitter<any>();

    /**
     * Constructor
     */
    constructor(private http: HttpClient){}

    /**
     * getStateSeal - Request to get data from Google State Seal API
     *
     * @param data
     */
    getStateSeal(state:string)
    {
        // Form URL
        var url = 'http://octofire.us-east-2.elasticbeanstalk.com/stateSeal/?state=' + state;
    
        this.http.get(url).subscribe(data =>
        {
            // Set Forecast Data
            this.jsonData = data;

            // Set State seal
            this.stateSeal = data['items'][0]['link'];

            // Publish Data to Subscribers
            this.stateSealEmitter.emit(this.jsonData);
        });
    }

    // Getters
    getData() { return this.jsonData; }
    getSeal() { return this.stateSeal; }
}