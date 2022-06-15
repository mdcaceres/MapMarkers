import { Component, OnInit } from '@angular/core';
import { HereMapComponent } from "./here-map/here-map.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public title : string = "holis";

    public query: string;

    public map : any;


    public constructor() {
        this.query = "starbucks";
    }

    public ngOnInit() { }

}
