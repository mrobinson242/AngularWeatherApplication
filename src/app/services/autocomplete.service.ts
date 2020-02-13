import { Injectable, EventEmitter, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

import 'rxjs/add/operator/map'
import { stringify } from 'querystring';

@Injectable()
export class AutocompleteService
{
    // Create JsonData
    private autocompleteData: any;

    // Emitters
    @Output() autocompleteEmitter = new EventEmitter<any>();

    /**
     * Constructor
     */
    constructor(private http: HttpClient){}

    /**
     * getAutocompleteData - Request to get data from Autocomplete API
     *
     * @param form
     */
    getAutocompleteData(input)
    {
        // Form URL
        var url = 'http://octofire.us-east-2.elasticbeanstalk.com/autocomplete/?input=' + input;

        // Subscribe to Node.js Request
        this.http.get(url).subscribe(data =>
        {
            this.autocompleteEmitter.emit(data);
        });
    }
}