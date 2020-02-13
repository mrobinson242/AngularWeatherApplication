import { Component, OnInit, ViewChild} from '@angular/core';
import { DarkSkyService } from "../../services/darkSky.service"
import { HourlyData } from "./hourlyData";
import { BaseChartDirective } from 'ng2-charts/ng2-charts'
import { HostListener } from "@angular/core";

@Component({
    selector: "hourlyTab",
    templateUrl: "./hourlyTab.component.html",
    styleUrls: ["./hourlyTab.component.css"]
  })

export class HourlyTabComponent implements OnInit
{
    // Create ChartOption
    data = HourlyData;
    width: any;

    @ViewChild("baseChart", {static: false})
        chart: BaseChartDirective;

    @HostListener('window:resize', ['$event'])
    getScreenSize(event) 
    {
        // Update Width
        this.width = window.innerWidth;

        // Update Graph
        this.onOptionSelected();
    }

    // Initialize Bar Chart Params
    public barChartLabels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    public barChartType = 'bar';
    public barChartLegend = true; 
    public barChartData = [{data: [], label: 'temperature'}];
    public barChartOptions = {scaleShowVerticalLines: false, 
                              legend: { onClick: (e) =>e.stopPropagation()},
                              responsive: true,
                              scales: { yAxes: [{
                                                    ticks:
                                                    {
                                                        suggestedMin: 50,
                                                        suggestedMax: 50,
                                                        stepSize: 5
                                                    },
                                                    scaleLabel: 
                                                    {
                                                        display: true, 
                                                        labelString: ''}
                                                    }],
                                        xAxes: [{scaleLabel: {display: true, labelString: 'Time difference from current hour'}}]}};

    public chartColor =  [{ backgroundColor:["#9CD1F1", "#9CD1F1", "#9CD1F1", "#9CD1F1", "#9CD1F1",
                                             "#9CD1F1", "#9CD1F1", "#9CD1F1", "#9CD1F1", "#9CD1F1",
                                             "#9CD1F1", "#9CD1F1", "#9CD1F1", "#9CD1F1", "#9CD1F1",
                                             "#9CD1F1", "#9CD1F1", "#9CD1F1", "#9CD1F1", "#9CD1F1",
                                             "#9CD1F1", "#9CD1F1", "#9CD1F1", "#9CD1F1", "#9CD1F1"]}];
    
    // Chart Options
    chartOptions = ["Temperature",
                    "Pressure",
                    "Humidity",
                    "Ozone",
                    "Visibility",
                    "Wind Speed"];

    /**
     * Constructor
     *
     * @param darkSkyService - Service to get Dark Sky Data
     */
    constructor(private darkSkyService : DarkSkyService)
    {
        // Initialize Chart Opton to Temperature
        this.data.chartOption = "Temperature";

        // Populate Chart with Temperature Data
        this.getTempData();
    }

    /**
     * getTempData - Gets the Tempertaure data
     */
    getTempData()
    {
        // Null Check Dark Sky Data
        if(this.darkSkyService.getData())
        {
            // Get Data
            let jsonData = this.darkSkyService.getData();
            let hourlyData  = jsonData['hourly']['data'];
            let min = -1;
            let max = -1;

            // Iterate over data
            for(let i=0; i < hourlyData.length; ++i)
            {
                // Add Temperature Data
                this.barChartData[0]["data"].push(hourlyData[i]['temperature'])

                if(i==0)
                {
                    min = hourlyData[i]['temperature'];
                    max = hourlyData[i]['temperature'];
                }
                else
                {
                    if(hourlyData[i]['temperature'] < min)
                    {
                        min = hourlyData[i]['temperature'];
                    }

                    if(hourlyData[i]['temperature'] > max)
                    {
                        max = hourlyData[i]['temperature'];
                    }
                }
            }

            // Update Chart Labels
            this.barChartData[0]["label"] = "temperature";
            this.barChartOptions.scales.yAxes[0].scaleLabel.labelString = "Fahrenheit";

            if(this.width < 600) {
                this.barChartOptions.scales.yAxes[0].ticks.stepSize = 5;
                this.barChartOptions.scales.yAxes[0].ticks.suggestedMin = min - 5;
                this.barChartOptions.scales.yAxes[0].ticks.suggestedMax = max + 5;
            }
            else {
                this.barChartOptions.scales.yAxes[0].ticks.stepSize = 2;
                this.barChartOptions.scales.yAxes[0].ticks.suggestedMin = min - 2;
                this.barChartOptions.scales.yAxes[0].ticks.suggestedMax = max + 2;
            }


            if(this.chart)
            {
                this.chart.chart.options = this.barChartOptions;
                this.chart.update();
            }
        }
    }

    /**
     * onOptionSelected - Gets the selected option and
     *                    updates the chart data
     */
    onOptionSelected()
    {
        // Get Data
        let jsonData = this.darkSkyService.getData();
        let hourlyData  = jsonData['hourly']['data'];

        // Reset Chart Data
        this.barChartData = [{data: [], label: ''}];

        // Check if Temperature
        if(this.data.chartOption == "Temperature")
        {
            this.getTempData();
        }

        // Check if Pressure
        if(this.data.chartOption == "Pressure")
        {
            let min = -1;
            let max = -1;

            // Iterate over data
            for(let i=0; i < hourlyData.length; ++i)
            {
                // Add Pressure Data
                this.barChartData[0]["data"].push(hourlyData[i]['pressure']);

                if(i==0)
                {
                    min = hourlyData[i]['pressure'];
                    max = hourlyData[i]['pressure'];
                }
                else
                {
                    if(hourlyData[i]['pressure'] < min)
                    {
                        min = hourlyData[i]['pressure'];
                    }

                    if(hourlyData[i]['pressure'] > max)
                    {
                        max = hourlyData[i]['pressure'];
                    }
                }
            }

            // Update Chart Labels
            this.barChartData[0]["label"] = "pressure";
            this.barChartOptions["scales"]["yAxes"][0]["scaleLabel"]["labelString"] = "Millibars";

            if(this.width < 600) {
                this.barChartOptions.scales.yAxes[0].ticks.stepSize = 5;
                this.barChartOptions.scales.yAxes[0].ticks.suggestedMin = min - 5;
                this.barChartOptions.scales.yAxes[0].ticks.suggestedMax = max + 5;
            }
            else {
                this.barChartOptions.scales.yAxes[0].ticks.stepSize = 2;
                this.barChartOptions.scales.yAxes[0].ticks.suggestedMin = min - 2;
                this.barChartOptions.scales.yAxes[0].ticks.suggestedMax = max + 2;
            }
            this.chart.chart.options = this.barChartOptions;
            this.chart.update();
        }

        // Check if Humidity
        if(this.data.chartOption == "Humidity")
        {
            let min = -1;
            let max = -1;

            // Iterate over data
            for(let i=0; i < hourlyData.length; ++i)
            {
                // Add Humidity Data
                let humidityData = (hourlyData[i]['humidity'] * 100);
                this.barChartData[0]["data"].push(humidityData);

                if(i==0)
                {
                    min = humidityData;
                    max = humidityData;
                }
                else
                {
                    if(humidityData < min)
                    {
                        min = humidityData;
                    }

                    if(humidityData > max)
                    {
                        max = humidityData;
                    }
                }
            }

            // Update Chart Labels
            this.barChartData[0]["label"] = "humidity";
            this.barChartOptions["scales"]["yAxes"][0]["scaleLabel"]["labelString"] = "% Humidity";
            this.barChartOptions.scales.yAxes[0].ticks.suggestedMin = min - 5;
            this.barChartOptions.scales.yAxes[0].ticks.suggestedMax = max + 5;
            this.barChartOptions.scales.yAxes[0].ticks.stepSize = 5;
            this.chart.chart.options = this.barChartOptions;
            this.chart.update();
        }

        // Check if Ozone
        if(this.data.chartOption == "Ozone")
        {
            let min = -1;
            let max = -1;

            // Iterate over data
            for(let i=0; i < hourlyData.length; ++i)
            {
                // Add Ozone Data
                this.barChartData[0]["data"].push(hourlyData[i]['ozone']);

                if(i==0)
                {
                    min = hourlyData[i]['ozone'];
                    max = hourlyData[i]['ozone'];
                }
                else
                {
                    if(hourlyData[i]['ozone'] < min)
                    {
                        min = hourlyData[i]['ozone'];
                    }

                    if(hourlyData[i]['ozone'] > max)
                    {
                        max = hourlyData[i]['ozone'];
                    }
                }
            }

            // Update Chart Labels
            this.barChartData[0]["label"] = "ozone";
            this.barChartOptions["scales"]["yAxes"][0]["scaleLabel"]["labelString"] = "Dobson Units";
            this.barChartOptions.scales.yAxes[0].ticks.suggestedMin = min - 5;
            this.barChartOptions.scales.yAxes[0].ticks.suggestedMax = max + 5;
            this.barChartOptions.scales.yAxes[0].ticks.stepSize = 5;
            this.chart.chart.options = this.barChartOptions;
            this.chart.update();
        }

        // Check if Visibility
        if(this.data.chartOption == "Visibility")
        {
            let min = -1;
            let max = -1;

            // Iterate over data
            for(let i=0; i < hourlyData.length; ++i)
            {
                // Add Visibility Data
                this.barChartData[0]["data"].push(hourlyData[i]['visibility']);

                if(i==0)
                {
                    min = hourlyData[i]['visibility'];
                    max = hourlyData[i]['visibility'];
                }
                else
                {
                    if(hourlyData[i]['visibility'] < min)
                    {
                        min = hourlyData[i]['visibility'];
                    }

                    if(hourlyData[i]['visibility'] > max)
                    {
                        max = hourlyData[i]['visibility'];
                    }
                }
            }

            // Update Chart Label
            this.barChartData[0]["label"] = "visibility";
            this.barChartOptions["scales"]["yAxes"][0]["scaleLabel"]["labelString"] = "Miles (Maximum 10)";

            if(this.width < 600) {
                this.barChartOptions.scales.yAxes[0].ticks.stepSize = 2;
                this.barChartOptions.scales.yAxes[0].ticks.suggestedMin = min - 2;
                this.barChartOptions.scales.yAxes[0].ticks.suggestedMax = max + 2;
            }
            else {
                this.barChartOptions.scales.yAxes[0].ticks.stepSize = 1;
                this.barChartOptions.scales.yAxes[0].ticks.suggestedMin = min - 2;
                this.barChartOptions.scales.yAxes[0].ticks.suggestedMax = max + 2;
            }
            this.chart.chart.options = this.barChartOptions;
            this.chart.update();
        }

        // Check if Wind Speed
        if(this.data.chartOption == "Wind Speed")
        {
            let min = -1;
            let max = -1;

            // Iterate over data
            for(let i=0; i < hourlyData.length; ++i)
            {
                // Add Wind Speed Data
                this.barChartData[0]["data"].push(hourlyData[i]['windSpeed']);

                if(i==0)
                {
                    min = hourlyData[i]['windSpeed'];
                    max = hourlyData[i]['windSpeed'];
                }
                else
                {
                    if(hourlyData[i]['windSpeed'] < min)
                    {
                        min = hourlyData[i]['windSpeed'];
                    }

                    if(hourlyData[i]['windSpeed'] > max)
                    {
                        max = hourlyData[i]['windSpeed'];
                    }
                }
            }

            // Update Chart Label
            this.barChartData[0]["label"] = "wind speed";
            this.barChartOptions["scales"]["yAxes"][0]["scaleLabel"]["labelString"] = "Miles per Hour";

            if(this.width < 600) {
                this.barChartOptions.scales.yAxes[0].ticks.stepSize = 2;
                this.barChartOptions.scales.yAxes[0].ticks.suggestedMin = min - 2;
                this.barChartOptions.scales.yAxes[0].ticks.suggestedMax = max + 2;
            }
            else {
                this.barChartOptions.scales.yAxes[0].ticks.stepSize = 1;
                this.barChartOptions.scales.yAxes[0].ticks.suggestedMin = min;
                this.barChartOptions.scales.yAxes[0].ticks.suggestedMax = max + 1;
            }
            this.chart.chart.options = this.barChartOptions;
            this.chart.update();
        }
    }

    ngOnInit(){}
}