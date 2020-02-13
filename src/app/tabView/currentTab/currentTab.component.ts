import { Component, Input, OnInit } from '@angular/core';
import { DarkSkyService } from "../../services/darkSky.service"
import { StateSealService } from "../../services/stateSeal.service"

@Component({
    selector: "currentTab",
    templateUrl: "./currentTab.component.html",
    styleUrls: ["./currentTab.component.css"]
  })

export class CurrentTabComponent implements OnInit
{
    // Define variables for Current Tab
    city: string = "";
    timezone: string = "";
    temperature: number;
    summary: string = "";

    // State Seal Src
    stateSeal: string = "";

    // Define Icon Values
    humidity: number;
    pressure: number;
    windSpeed: number;
    visibility: number;
    cloudCover: number;
    ozone: number;

    /**
     * Constructor
     */
    constructor(private darkSkyService : DarkSkyService,
                private stateSealService : StateSealService)
    {
        // Null Check Dark Sky Data
        if(this.darkSkyService.getData())
        {
            // Initialize Card Values
            this.city = this.darkSkyService.getCity();
            this.timezone = this.darkSkyService.getData()["timezone"];
            this.temperature = Math.round(this.darkSkyService.getData()["currently"]["temperature"]);
            this.summary = this.darkSkyService.getData()["currently"]["summary"];

            // Initialize State Seal
            if(this.stateSealService.getData())
            {
                this.stateSeal = this.stateSealService.getData()['items'][0]['link'];
            }

            // Initialize Icon Values
            this.humidity = this.darkSkyService.getData()["currently"]['humidity'];
            this.pressure = this.darkSkyService.getData()['currently']['pressure'];
            this.windSpeed = this.darkSkyService.getData()['currently']['windSpeed'];
            this.visibility = this.darkSkyService.getData()['currently']['visibility'];
            this.cloudCover =  this.darkSkyService.getData()['currently']['cloudCover'];
            this.ozone = this.darkSkyService.getData()['currently']['ozone'];
        }

        // Subscribe to Dark Sky Updates
        this.darkSkyService.darkSkyEmitter.subscribe(data =>
        {
            // Update Card Values
            this.city = this.darkSkyService.getCity();
            this.timezone = data["timezone"];
            this.temperature = Math.round(data["currently"]["temperature"]);
            this.summary = data["currently"]["summary"];

            // Update Icon Values
            this.humidity = data["currently"]['humidity'];
            this.pressure = data['currently']['pressure'];
            this.windSpeed = data['currently']['windSpeed'];
            this.visibility = data['currently']['visibility'];
            this.cloudCover =  data['currently']['cloudCover'];
            this.ozone = data['currently']['ozone'];
        })

        // Subscribe to State Seal Updates
        this.stateSealService.stateSealEmitter.subscribe(data =>
        {
            // Update State Seal
            this.stateSeal = data['items'][0]['link'];
        })
    }

    ngOnInit(){}
}