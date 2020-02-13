import { Component,  OnInit } from '@angular/core';
import { TabView } from "./tabView";

// Services
import { DarkSkyService } from '../services/darkSky.service';
import { DisplayService } from '../services/display.service';
import { StateSealService } from "../services/stateSeal.service"

@Component({
    selector: "tabPane",
    templateUrl: "./tabView.component.html",
    styleUrls: ["./tabView.component.css"]
  })

/**
 * TabViewComponent
 */
export class TabViewComponent implements OnInit
{
    // Initialize Vars
    tabView = TabView;
    isVisible: boolean;
    isFavorite: boolean;

    /**
     * Constructor
     */
     constructor(private darkSkyService : DarkSkyService, 
                 private displayService : DisplayService,
                 private stateSealService : StateSealService)
     {
        // Subscribe to Dark Sky Data
        this.darkSkyService.darkSkyEmitter.subscribe(data =>
        {

           // Check if Item is in Favorite's List
           let city = darkSkyService.getCity();
           let state = darkSkyService.getState();
           let key = city + ":" + state;
           this.isFavorite = displayService.isFavorited(key);

          // Update Visibility of Tab View
          this.isVisible = true;
        })

        // Subscribe to Tab View Visibility
        this.displayService.tabViewEmitter.subscribe(isVisible =>
        {
            // Update visibility of Tab View
            this.isVisible = isVisible;
        })

        // Subscribe to Favorites Data
        displayService.favoriteEmitter.subscribe(data=>
        {
            // Check if Item is still in Favorite's List
            let city = darkSkyService.getCity();
            let state = darkSkyService.getState();
            let key = city + ":" + state;
            this.isFavorite = displayService.isFavorited(key);
        })

        // Initialize Visibility
        this.isVisible = false;
        this.isFavorite = false;
     }

     /**
      * tweet - Opens a new dialog and composes a Tweet to post to Twitter
      */
     tweet()
     {
        // Get Data
        let city = this.darkSkyService.getCity();
        let temp = Math.round(this.darkSkyService.getData()["currently"]["temperature"]) + "°F. ";
        let summary = this.darkSkyService.getData()["currently"]["summary"];

        // Format URL
        let url = "https://twitter.com/intent/tweet?text=";
        url += "The current temperature at " + city + " is " + temp;
        url += "The weather conditions are " + summary +". ";
        url += "&hashtags=CSCI571WeatherSearch";

        // Open Twitter Dialog
        let win = window.open(url, "tweet")
     }

     /**
      * favorite - Creates a favorite row in the Favorites Tab
      */
     favorite()
     {
         if(!this.isFavorite)
         {
            // Get Information for Favorite
            let stateSeal = this.stateSealService.getSeal();
            let city = this.darkSkyService.getCity();
            let state = this.darkSkyService.getState();
            let lat = this.darkSkyService.getLatitude();
            let lon = this.darkSkyService.getLongitude();

            // Add to Favorite's List
            this.displayService.addFavorite(stateSeal, city, state, lat, lon);

            // Update Favorite Indication for Button
            this.isFavorite = true;
         }
         else
         {
            // Remove from Favorite's List
            let city = this.darkSkyService.getCity();
            let state = this.darkSkyService.getState();
            let key = city + ":" + state;
            this.displayService.removeFavorite(key);

            // Update Favorite Indication for Button
            this.isFavorite = false;
         }
     }

     /**
      * updateWeekly
      */
     updateWeekly()
     {
        this.displayService.refreshWeeklyTab(true);
     }

    ngOnInit() {}
}