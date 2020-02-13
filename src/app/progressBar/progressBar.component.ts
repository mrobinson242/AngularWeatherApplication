import { Component, OnInit} from '@angular/core';
import { ProgressService } from '../services/progress.service';

@Component({
    selector: "progressBar",
    templateUrl: "./progressBar.component.html",
    styleUrls: ["./progressBar.component.css"]
  })

/**
 * SearchFormComponent
 */
export class ProgressBarComponent implements OnInit
{
    // Create Progress Bar visibility flag
    progressVisible: boolean;

    /**
     * Constructor
     */
    constructor(progressService : ProgressService)
    {
        // Initialize progress bar visibility
        this.progressVisible = false;

        progressService.progressEmitter.subscribe(isVisible =>
        {
            this.progressVisible = isVisible;
        })
    }

    ngOnInit() {}
}