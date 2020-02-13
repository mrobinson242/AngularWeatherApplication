import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DisplayService
{
    // Display Visibility
    private isTabViewVisible: boolean;
    private isAlertVisible : boolean;
    private refreshRequired : boolean;

    // Results Btn
    public resultsBtn: any;
    public modalBtn: HTMLElement;

    // Emitters
    @Output() tabViewEmitter = new EventEmitter<any>();
    @Output() alertEmitter = new EventEmitter<any>();
    @Output() favoriteEmitter = new EventEmitter<any>();
    @Output() refreshWeeklyTabEmitter = new EventEmitter<any>();
    @Output() resultsEmitter = new EventEmitter<any>();

    /**
     * Constructor
     */
    constructor(private http: HttpClient){}

    /**
     * setTabViewVisible
     *
     * @param isVisible
     */
    setTabViewVisible(isVisible)
    {
        // Update visibility of Tab View
        this.isTabViewVisible = isVisible;
        this.tabViewEmitter.emit(this.isTabViewVisible);
    }

    /**
     * setAlertViewVisible
     *
     * @param isVisible
     */
    setAlertViewVisible(isVisible)
    {
        // Update visibility of Alert View
        this.isAlertVisible = isVisible;
        this.alertEmitter.emit(this.isAlertVisible);
    }

    /**
     * setFavorite
     *
     * @param city
     */
    setFavorite(city)
    {
        this.favoriteEmitter.emit();
    }

    /**
     * refreshWeeklyTab
     */
    refreshWeeklyTab(refreshRequired)
    {
        this.refreshRequired = refreshRequired;
        this.refreshWeeklyTabEmitter.emit(this.refreshRequired);
    }

    /**
     * addFavorite
     *
     * @param icon
     * @param city 
     * @param state 
     */
    addFavorite(icon: string, city:string, state:string, lat: string, lon: string)
    {
        var abbr = this.map.get(state);
        let favorite = {icon: icon, city: city, state: state, abbr: abbr} 
        let key = city + ":" + state;
        localStorage.setItem(key, JSON.stringify(favorite));
        this.getFavorites();
    }

    /**
     * getFavorites - Gets all the saved favorites
     */
    getFavorites()
    {
        let savedData = new Array(localStorage.length);
        let favorites = [];

        for (let i = 0; i < savedData.length; i++) 
        {
            savedData[i] = JSON.parse(localStorage.getItem(localStorage.key(i)));
        }

        let data = {"all": savedData};
        this.favoriteEmitter.emit(data);
    }

    /**
     * removeFavorite - Removes Favorite based on provided key
     */
    removeFavorite(key: string)
    {
        // Remove Item from Local Storage
        localStorage.removeItem(key);

        // Get Favoirtes again for Table
        this.getFavorites();
    }

    /**
     * getFavorite
     */
    getFavorite(index:number)
    {
        return JSON.parse(localStorage.getItem(localStorage.key(index)));
    }

    /**
     * isFavorited - Checks if Location is in Favorites
     */
    isFavorited(key: string):boolean
    {
        if(localStorage.getItem(key) !== null)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    /**
     * showResults - Publish message to show results
     */
    showResults()
    {
        this.resultsEmitter.emit();
    }

    // Create Mapping of States to Abbreviations
    map = new Map([["Alabama", "AL"],
                   ["Alaska", "AK"],
                   ["Arizona", "AZ"],
                   ["Arkasas", "AR"],
                   ["California", "CA"],
                   ["Colorado", "CO"],
                   ["Connecticut", "CT"],
                   ["Delaware", "DE"],
                   ["District of Columbia", "DC"],
                   ["Florida", "FL"],
                   ["Georgia", "GA"],
                   ["Hawaii", "HI"],
                   ["Idaho", "ID"],
                   ["Illinois", "IL"],
                   ["Indiana", "IN"],
                   ["Iowa", "IA"],
                   ["Kansas", "KS"],
                   ["Kentucky", "KY"],
                   ["Louisiana", "LA"],
                   ["Maine", "ME"],
                   ["Maryland", "MD"],
                   ["Massachusetts", "MA"],
                   ["Michigan", "MI"],
                   ["Minnesota", "MN"],
                   ["Mississippi", "MS"],
                   ["Missouri", "MO"],
                   ["Montana", "MT"],
                   ["Nebraska", "NE"],
                   ["Nevada", "NV"],
                   ["New Hampshire", "NH"],
                   ["New Jersey", "NJ"],
                   ["New Mexico", "NM"],
                   ["New York", "NY"],
                   ["North Carolina", "NC"],
                   ["North Dakota", "ND"],
                   ["Ohio", "OH"],
                   ["Oklahmoa", "OK"],
                   ["Oregon", "OR"],
                   ["Pennsylvania", "PA"],
                   ["Rhode Island", "RI"],
                   ["South Carolina", "SC"],
                   ["South Dakota", "SD"],
                   ["Tennessee", "TN"],
                   ["Texas", "TX"],
                   ["Utah", "UT"],
                   ["Vermont", "VT"],
                   ["Virginia", "VA"],
                   ["Washington", "WA"],
                   ["West Virginia", "WV"],
                   ["Wisconsin", "WI"],
                   ["Wyoming", "WY"]]);
}