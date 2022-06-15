import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Marcador } from '../interfaces/Marcador';
import { MarcadorProvider } from '../Providers/MarcadorProvider';

declare var H: any;

@Component({
    selector: 'here-map',
    templateUrl: './here-map.component.html',
    styleUrls: ['./here-map.component.css']
})
export class HereMapComponent implements OnInit {
    private ui : any;
    private search : any;
    private marcadores : {}[] = [];

    @ViewChild("map")
    public mapElement!: ElementRef;

    @Input()
    public _apikey: any;

    @Input()
    public lat: any;

    @Input()
    public lng: any;

    @Input()
    public width: any;

    @Input()
    public height: any;

    private platform: any;
    public map: any;

    constructor(private marcadorProvider : MarcadorProvider) {
      this.marcadorProvider.getMarcadores().subscribe((data) => {
        let marcador = {} as Marcador
        if(data.ok){
          for(let m of data.listaMarcadores as Marcador[]){
            //this.marcadores.push(m); UNDEFINED!!!
            this.addMarkers({ lat: m.latitud, lng: m.longitud });
          }
        }
        else alert("no se consiguieron marcadores en la nube");
      });
    }

    public ngOnInit() {
        this.platform = new H.service.Platform({
            "apikey": this._apikey
        });
     }

    public ngAfterViewInit() {

        let defaultLayers = this.platform.createDefaultLayers();
        this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.vector.normal.map,
            {
                zoom: 4,
                center: { lat: this.lat, lng: this.lng },
                pixelRatio: window.devicePixelRatio || 1
            }
        );
        window.addEventListener('resize', () => this.map.getViewPort().resize());

        let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
        this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
    }

  private addMarkers(c : {}){
    let icon : any = new H.map.Icon('https://cdn0.iconfinder.com/data/icons/travel-filled-line-4/64/Travel-Filled-12-512.png',{size: {w: 40, h: 40}});
    let LocationOfMarker = c
    console.log("locacion para el macador = " + JSON.stringify(LocationOfMarker));
    let marker : any = new H.map.Marker(LocationOfMarker, { icon: icon });
    this.map.addObject(marker);
    this.map.setCenter(LocationOfMarker);
    this.map.setZoom(8)
  }
}
