import { Injectable, EventEmitter, Output} from '@angular/core';

@Injectable()
export class ProgressService
{
    // Visibility Flag
    private isVisible: boolean;

    // Emitters
    @Output() progressEmitter = new EventEmitter<any>();

    showProgressBar(isVisible)
    {
        // Update Visibility indication
        this.isVisible = isVisible;

        // Publish Visibility to Subscribers
        this.progressEmitter.emit(this.isVisible)
    }
}