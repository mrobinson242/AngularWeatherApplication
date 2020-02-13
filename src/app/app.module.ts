// Import Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Import Components
import { AppComponent } from './app.component';
import { SearchFormComponent } from "./searchForm/searchForm.component";
import { TabViewComponent } from "./tabView/tabView.component";
import { FavoriteViewComponent } from "./favoriteView/favoriteView.component";
import { CurrentTabComponent } from "./tabView/currentTab/currentTab.component";
import { HourlyTabComponent } from "./tabView/hourlyTab/hourlyTab.component";
import { WeeklyTabComponent } from "./tabView/weeklyTab/weeklyTab.component";
import { ProgressBarComponent } from "./progressBar/progressBar.component";
import { AlertBarComponent } from "./alertBar/alertBar.component";

// Services
import { DisplayService } from "./services/display.service";
import { GeocodeService } from "./services/geocode.service";
import { GeolocationService } from "./services/geolocation.service";
import { DarkSkyService } from "./services/darkSky.service";
import { StateSealService } from "./services/stateSeal.service";
import { ProgressService } from "./services/progress.service";
import { AutocompleteService } from "./services/autocomplete.service";

@NgModule({
  declarations: [ AppComponent, SearchFormComponent, TabViewComponent, FavoriteViewComponent, CurrentTabComponent, HourlyTabComponent, WeeklyTabComponent, ProgressBarComponent, AlertBarComponent],
  providers: [DisplayService, GeocodeService, GeolocationService, DarkSkyService, StateSealService, ProgressService, AutocompleteService],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, ChartsModule, NgbModule],
  bootstrap: [ AppComponent, SearchFormComponent]
})

export class AppModule {}
