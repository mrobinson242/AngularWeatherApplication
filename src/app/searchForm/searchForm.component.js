"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var SearchFormComponent = (function () {
    function SearchFormComponent() {
        // Initialize Vars
        this.state = "Select State";
        // State Options
        this.states = ["Select State",
            "Alabama",
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
    /**
     * Constructor
     */
    //constructor(private geocodeService: GeocodeService)
    //{
    //}
    SearchFormComponent.prototype.ngOnInit = function () {
    };
    /**
     * submit - Callback for Submitting the Search Form
     */
    SearchFormComponent.prototype.submit = function () {
        // TODO: Remove Debug Stmt
        console.log("Search");
        // Search Google Geocode API
        //this.geocodeService.search(theForm);
    };
    return SearchFormComponent;
}());
SearchFormComponent = __decorate([
    core_1.Component({
        selector: "searchForm",
        templateUrl: "./searchForm.component.html",
        styleUrls: ["./searchForm.component.css"]
    })
], SearchFormComponent);
exports.SearchFormComponent = SearchFormComponent;
//# sourceMappingURL=searchForm.component.js.map