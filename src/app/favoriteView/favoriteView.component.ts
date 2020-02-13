import { Component,  OnInit, ElementRef } from '@angular/core';

// Services
import { DisplayService } from '../services/display.service';
import { GeocodeService } from "../services/geocode.service"
import { DarkSkyService } from "../services/darkSky.service"
import { StateSealService } from "../services/stateSeal.service";

@Component({
    selector: "favoritePane",
    templateUrl: "./favoriteView.component.html",
    styleUrls: ["./favoriteView.component.css"]
  })

/**
 * FavoriteViewComponent
 */
export class FavoriteViewComponent implements OnInit
{
      // Create Alert Bar visibility flag
      recordsAvailable: boolean;
      favorites: [];

    /**
     * Constructor
     */
     constructor(private displayService : DisplayService,
                 private geocodeService: GeocodeService, 
                 private darkSkyService : DarkSkyService,
                 private stateSealService : StateSealService,
                 private elRef:ElementRef)
     {
        this.recordsAvailable = false;

        displayService.favoriteEmitter.subscribe(data=>
        {
            if(data["all"].length == 0)
            {
              this.recordsAvailable = false;  
            }
            else
            {
              this.favorites = data["all"];
              this.recordsAvailable = true;  
            }
        })

        // Get Favorites upon startup
        this.displayService.getFavorites();
     }

     /**
      * removeFavorite - Removes the Favorite from the Table
      */
     removeFavorite(city: string, state: string) 
     {
        // Form Key
        let key = city + ":" + state;

        // Remove Favorite
        this.displayService.removeFavorite(key);
     }

     handleUrl(index)
     {
       var data = this.displayService.getFavorite(index);
       let city = data.city;
       let state = data.state;

       // Update Current Location in Dark Sky
       this.darkSkyService.setCurrentLocation(false);
       this.darkSkyService.setFormInfo(city, state);

        // Get State Seal
        this.stateSealService.getStateSeal(state);

        // Get Google Geocode Data
        this.geocodeService.getGeocodeData("", city, state, false);

        // Show Results Tab
        this.displayService.setTabViewVisible(false);
        this.displayService.resultsBtn.click();
     }

    ngOnInit(){}
}