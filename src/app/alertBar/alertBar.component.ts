import { Component, OnInit } from '@angular/core';
import { DisplayService } from "../services/display.service"

@Component({
    selector: "alertBar",
    templateUrl: "./alertBar.component.html",
    styleUrls: ["./alertBar.component.css"]
  })

/**
 * AlertFormComponent
 */
export class AlertBarComponent implements OnInit
{
    // Create Alert Bar visibility flag
    alertVisible: boolean;

    /**
     * Constructor
     */
    constructor( private displayService : DisplayService)
    {
        // Initialize progress bar visibility
        this.alertVisible = false;

        // Listener for displaying Alert
        displayService.alertEmitter.subscribe(isVisible =>{ this.alertVisible = isVisible; })
    }

    ngOnInit() {}
}