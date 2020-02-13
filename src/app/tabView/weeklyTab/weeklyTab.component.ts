import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DarkSkyService } from "../../services/darkSky.service";
import { DisplayService } from "../../services/display.service";
import * as CanvasJS from '../../../app/canvasjs.min';

@Component({
    selector: "weeklyTab",
    templateUrl: "./weeklyTab.component.html",
    styleUrls: ["./weeklyTab.component.css"]
  })

export class WeeklyTabComponent implements OnInit
{
    dailyData: any;
    chart: any;

    // Modal Button
    @ViewChild("modalButton", {static: true})
    modalButton: ElementRef;

    @ViewChild("myModal", {static: true})
    myModal: any;

    // Define variables for Modal Window
    modalDate: string = "";
    modalCity: string = "";
    modalTemp: number;
    modalSummary: string = "";
    modalImg: string = "";

    // Define Modal Weather Attributes
    modalPrecip: string = "";
    modalChanceOfRain: string = "";
    modalWindSpeed: string = "";
    modalHumidity: string = "";
    modalVisibility: string = "";

    // Sleep Function
    sleep = (milliseconds) => 
    {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    /**
     * Constructor
     *
     * @param darkSkyService - Service to get Dark Sky Data
     */
    constructor(private darkSkyService : DarkSkyService,
                private displayService : DisplayService,
                private elRef:ElementRef)
    {

        displayService.refreshWeeklyTabEmitter.subscribe(refreshRequired =>
        {
            this.createChart();

            this.sleep(300).then(()=> 
            {
                this.chart.render();
            })
        })

        darkSkyService.modalEmitter.subscribe(data =>
        {
            // Display Date
            let time = new Date(data["currently"]["time"] * 1000);
            this.modalDate = time.getDate() + "/" + (time.getMonth()+1) + "/" + time.getFullYear();

            // Display Modal Location Info
            this.modalCity = this.darkSkyService.getCity();
            this.modalTemp = Math.round(data["currently"]["temperature"]);
            this.modalSummary = data["currently"]["summary"];

            if(data["currently"]["icon"] == "clear-day" || data["currently"]["icon"] == "clear-night")
            {
                // Set to Clear Image
                this.modalImg = "https://cdn3.iconfinder.com/data/icons/weather-344/142/sun-512.png";
            }
            else if(data["currently"]["icon"] == "rain")
            {
                // Set to Rainy Image
                this.modalImg = "https://cdn3.iconfinder.com/data/icons/weather-344/142/rain-512.png";
            }
            else if(data["currently"]["icon"] == "snow")
            {
                // Set to Snowy Image
                this.modalImg = "https://cdn3.iconfinder.com/data/icons/weather-344/142/snow-512.png";
            }
            else if(data["currently"]["icon"] == "sleet")
            {
                // Set to Sleet Image
                this.modalImg = "https://cdn3.iconfinder.com/data/icons/weather-344/142/lightning-512.png"; 
            }
            else if(data["currently"]["icon"] == "wind")
            {
                // Set to Windy Image
                this.modalImg = "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_10-512.png";
            }
            else if(data["currently"]["icon"] == "fog")
            {
                // Set to Fog Image
                this.modalImg = "https://cdn3.iconfinder.com/data/icons/weather-344/142/cloudy-512.png";
            }
            else if(data["currently"]["icon"] == "cloudy")
            {
                // Set to Cloudy Image
                this.modalImg = "https://cdn3.iconfinder.com/data/icons/weather-344/142/cloud-512.png";
            }
            else if(data["currently"]["icon"] == "partly-cloudy-day" || data["currently"]["icon"] == "partly-cloudy-night")
            {
                // Set to Clear Image
                this.modalImg = "https://cdn3.iconfinder.com/data/icons/weather-344/142/sunny-512.png";
            }

            // Set Modal Weather Attributes
            if( data["currently"]["precipIntensity"] == 0)
            {
                this.modalPrecip = "Precipitation: " + data["currently"]["precipIntensity"];
            }
            else
            {
                this.modalPrecip = "Precipitation: " + data["currently"]["precipIntensity"].toFixed(2);
            }

            this.modalChanceOfRain = "Chance of Rain: " + (data["currently"]["precipProbability"] * 100) + " %";
            this.modalWindSpeed = "Wind Speed: " + data["currently"]["windSpeed"].toFixed(2) + " mph";
            this.modalHumidity = "Humidity: " + (data["currently"]["humidity"] * 100) + " %";
            this.modalVisibility = "Visibility: " + data["currently"]["visibility"].toFixed(2) + " miles";
        
            // Show Modal
            this.modalButton.nativeElement.click();
        })
    }

    ngOnInit() 
    {
        this.createChart();
    }

    /**
     * callModal
     */
    callModal()
    {
        this.myModal.showModal();
    }

    /**
     * createChart
     */
    createChart()
    {
        // Get Data
        let jsonData = this.darkSkyService.getData();
        this.dailyData  = jsonData['daily']['data'];
        let lat = this.darkSkyService.getLatitude();
        let lon = this.darkSkyService.getLongitude();

        // Day 0 Info
        let time0 = new Date(this.dailyData[0].time * 1000);
        let date0 = time0.getDate() + "/" + (time0.getMonth()+1) + "/" + time0.getFullYear();
        let tempLow0 = this.dailyData[0]['temperatureLow'];
        let tempHigh0 = this.dailyData[0]['temperatureHigh'];

        // Day 1 Info
        let time1 = new Date(this.dailyData[1].time * 1000);
        let date1 = time1.getDate() + "/" + (time1.getMonth()+1) + "/" + time1.getFullYear();
        let tempLow1 = this.dailyData[1]['temperatureLow'];
        let tempHigh1 = this.dailyData[1]['temperatureHigh'];

        // Day 2 Info
        let time2 = new Date(this.dailyData[2].time * 1000);
        let date2 = time2.getDate() + "/" + (time2.getMonth()+1) + "/" + time2.getFullYear();
        let tempLow2 = this.dailyData[2]['temperatureLow'];
        let tempHigh2 = this.dailyData[2]['temperatureHigh'];

        // Day 3 Info
        let time3 = new Date(this.dailyData[3].time * 1000);
        let date3 = time3.getDate() + "/" + (time3.getMonth()+1) + "/" + time3.getFullYear();
        let tempLow3 = this.dailyData[3]['temperatureLow'];
        let tempHigh3 = this.dailyData[3]['temperatureHigh'];

        // Day 4 Info
        let time4 = new Date(this.dailyData[4].time * 1000);
        let date4 = time4.getDate() + "/" + (time4.getMonth()+1) + "/" + time4.getFullYear();
        let tempLow4 = this.dailyData[4]['temperatureLow'];
        let tempHigh4 = this.dailyData[4]['temperatureHigh'];

        // Day 5 Info
        let time5 = new Date(this.dailyData[5].time * 1000);
        let date5 = time5.getDate() + "/" + (time5.getMonth()+1) + "/" + time5.getFullYear();
        let tempLow5 = this.dailyData[5]['temperatureLow'];
        let tempHigh5 = this.dailyData[5]['temperatureHigh'];

        // Day 6 Info
        let time6 = new Date(this.dailyData[6].time * 1000);
        let date6 = time6.getDate() + "/" + (time6.getMonth()+1) + "/" + time6.getFullYear();
        let tempLow6 = this.dailyData[6]['temperatureLow'];
        let tempHigh6 = this.dailyData[6]['temperatureHigh'];

        // Day 7 Info
        let time7 = new Date(this.dailyData[7].time * 1000);
        let date7 = time7.getDate() + "/" + (time7.getMonth()+1) + "/" + time7.getFullYear();
        let tempLow7 = this.dailyData[7]['temperatureLow'];
        let tempHigh7 = this.dailyData[7]['temperatureHigh'];

        // Create Color Set
        CanvasJS.addColorSet("default", ["#9CD1F1"]);

        // Create Chart
        this.chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            colorSet: "default",
            title: { text: "Weekly Weather" },
            dataPointWidth: 20,
            legend: { verticalAlign: "top"},
            axisX: { title: "Days",
                     gridThickness: 0 },
            axisY: {
                includeZero: false,
                title: "Temperature in Fahrenheit",
                interval: 10,
                gridThickness: 0
            }, 
            data: [{
                click: this.showModal,
                type: "rangeBar",
                showInLegend: true,
                yValueFormatString: "#0",
                indexLabel: "{y[#index]}",
                legendText: "Day wise temperature range",
                toolTipContent: "<b>{label}</b>: {y[0]} to {y[1]}",
                dataPoints: [
                    { y:[tempLow7, tempHigh7], label: date7, lat: lat, lon: lon, darkSky: this.darkSkyService, time: this.dailyData[7].time},
                    { y:[tempLow6, tempHigh6], label: date6, lat: lat, lon: lon, darkSky: this.darkSkyService, time: this.dailyData[6].time},
                    { y:[tempLow5, tempHigh5], label: date5, lat: lat, lon: lon, darkSky: this.darkSkyService, time: this.dailyData[5].time},
                    { y:[tempLow4, tempHigh4], label: date4, lat: lat, lon: lon, darkSky: this.darkSkyService, time: this.dailyData[4].time},
                    { y:[tempLow3, tempHigh3], label: date3, lat: lat, lon: lon, darkSky: this.darkSkyService, time: this.dailyData[3].time},
                    { y:[tempLow2, tempHigh2], label: date2, lat: lat, lon: lon, darkSky: this.darkSkyService, time: this.dailyData[2].time},
                    { y:[tempLow1, tempHigh1], label: date1, lat: lat, lon: lon, darkSky: this.darkSkyService, time: this.dailyData[1].time},
                    { y:[tempLow0, tempHigh0], label: date0, lat: lat, lon: lon, darkSky: this.darkSkyService, time: this.dailyData[0].time},
                ]
            }]
        });
    }

    /**
     * showModal
     */
    showModal(e)
    {
        // Get Dark Sky Service
        let service = e.dataPoint.darkSky;
        service.getModalData(e.dataPoint.lat, e.dataPoint.lon, e.dataPoint.time);
    }
}