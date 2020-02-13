// Modules
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SearchForm } from "./searchForm";
import { Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

// Services
import { GeocodeService } from "../services/geocode.service"
import { GeolocationService } from "../services/geolocation.service"
import { DarkSkyService } from "../services/darkSky.service"
import { DisplayService } from "../services/display.service"
import { StateSealService } from "../services/stateSeal.service";
import { ProgressService } from '../services/progress.service';
import { AutocompleteService } from '../services/autocomplete.service';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Label } from 'ng2-charts';

@Component({
  selector: "searchForm",
  templateUrl: "./searchForm.component.html",
  styleUrls: ["./searchForm.component.css"]
})

/**
 * SearchFormComponent
 */
export class SearchFormComponent implements OnInit
{
    // Initialize Vars
    form = SearchForm;
    geolocationData: any;
    geoLat: string;
    geoLon: string;
    autoOptions: any;
    tabPane: any;
    favoritePane: any;

    @ViewChild("currentLocation", {static: false})
    currentLocation: boolean;

    @ViewChild("state", {static: false})
    state: any;

    @ViewChild("resultsBtn", {static: true})
    resultsBtn: ElementRef;

    search = (text: Observable<string>) => 
    text.pipe(debounceTime(450),
              distinctUntilChanged(),
              map(term => term.length < 1 ? []
                : this.autoOptions.slice(0, 5))
             )

    /**
     * Constructor
     */
    constructor(private geocodeService: GeocodeService, 
                private geolocationService: GeolocationService,
                private darkSkyService : DarkSkyService,
                private stateSealService : StateSealService,
                private displayService : DisplayService,
                private progressService : ProgressService,
                private autocompleteService : AutocompleteService,
                private elRef:ElementRef)
    {
        // Initialize State value in Dropdown
        this.autoOptions = [];

        // Get Initial Latitutde/Longitude based on Current Location
        this.getGeolocation();

        // Initialize Google Geocode Subscriber
        this.geocodeService.geocodeEmitter.subscribe(data =>
        {
            // Update Latitude/Longitude
            this.form.lat = data['results'][0]['geometry']['location']['lat'];
            this.form.lon = data['results'][0]['geometry']['location']['lng'];

            // Show the Progress Bar
            this.progressService.showProgressBar(true);

            // Call Dark Sky API
            this.darkSkyService.getDarkSkyData(this.form);

            if(this.geocodeService.getState() != "")
            {
              // Reset Form with provided values
              this.form.street = this.geocodeService.getStreet();
              this.form.state = this.geocodeService.getState();
              this.form.city = this.geocodeService.getCity();
            }
        })

        // Initialize Dark Sky Subscriber
        this.darkSkyService.darkSkyEmitter.subscribe(data=>
        {
            this.form.currentLocation = this.darkSkyService.getCurrentLocation();

            this.progressService.showProgressBar(false);
        })

        // Initialize Google Autocomplete Subscriber
        this.autocompleteService.autocompleteEmitter.subscribe(data=>
        {
          // Clear existing Options
          this.autoOptions = [];

          // Get Prediciton Data
          let predictionData = data["predictions"];

          // Check that there are predictions
          if(predictionData.length != 0)
          {
              for(let i=0; i< predictionData.length; ++i)
              {
                  // Set the AutoComplete Options
                  this.autoOptions.push(predictionData[i]["structured_formatting"]["main_text"]);
              }
          }
        })
    }

    ngOnInit(){}

    ngAfterViewInit() 
    {
        this.tabPane = this.elRef.nativeElement.querySelector('tabPane');
        this.favoritePane = this.elRef.nativeElement.querySelector('favoritePane');
        this.displayService.resultsBtn = this.resultsBtn.nativeElement;
    }

  /**
   * submit - Callback for Submitting the Search Form
   */
  submit()
  {
      // Hide "Invalid Address Alert"
      this.displayService.setAlertViewVisible(false);

      // Update whether current location is selected
      this.darkSkyService.setCurrentLocation(this.form.currentLocation);

      // Check if Current Location selected
      if(this.form.currentLocation)
      {
          // Show the Progress Bar
          this.progressService.showProgressBar(true);

          // Update Form Info (City/State)
          this.form.lat = this.geoLat;
          this.form.lon = this.geoLon;
          this.darkSkyService.setFormInfo(this.geolocationData["city"], this.geolocationData["regionName"]);

          // Get State Seal
          this.stateSealService.getStateSeal(this.geolocationData["regionName"]);

          // Get Dark Sky Data
          this.darkSkyService.getDarkSkyData(this.form);
      }
      else
      {
          // Update Form Info (City/State)
          this.darkSkyService.setFormInfo(this.form.city, this.form.state);

          // Get State Seal
          this.stateSealService.getStateSeal(this.form.state);

          // Get Google Geocode Data
          this.geocodeService.getGeocodeData(this.form.street, this.form.city, this.form.state, true);
      }
  }

  /**
   * handleCurrentLocation
   */
  handleCurrentLocation()
  {
      // Check if Current Location selected
      if(this.currentLocation)
      {
          // Reset Form Fields
          this.form.street = "";
          this.form.city = "";
          this.form.state = "";
      }
  }

  /**
   * handleCityEntry - Callback for handling entry into Autocomplete Text Field
   */
  handleCityEntry(event: any)
  {
      this.autocompleteService.getAutocompleteData(event.target.value);
  }

  /**
   * clear
   */
  clear()
  {
      // Hide Views
      this.displayService.setTabViewVisible(false);
      this.displayService.setAlertViewVisible(false);
  }

  /**
   * getGeolocation - Subscribes to get Geolocation Data
   */
  getGeolocation()
  {
    // Subscribe to Geolocation Data
    this.geolocationService.getGeolocation().subscribe(data => 
    {
        // Save Geolocation Data
        this.geolocationData = data;

        // Set Latitude/Longitude
        this.geoLat = this.geolocationData["lat"];
        this.geoLon = this.geolocationData["lon"];
    });
  }

    /**
     * showFavorite - Shows the Favorite Pane
     */
    showFavorite()
    {
      this.tabPane.classList.remove("active");
      this.favoritePane.classList.remove("active");
      this.favoritePane.className += " active";
    }

    /**
     * showResults - Shows the Results Pane
     */
    showResults()
    {
      this.favoritePane.classList.remove("active");
      this.tabPane.classList.remove("active"); 
      this.tabPane.className += " active";
    }

  // State Options
  states = ["Alabama",
            "Alaska",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "District Of Columbia",
            "Florida",
            "Georiga",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "North Carolina",
            "North Dakota",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Pennsylvania",
            "Rhode Island", 
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Vermont",
            "Virginia",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming"
            ];
}
