import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    authors: any ;
    editAuthors = [];

    constructor(private _httpService: HttpService) { }

  ngOnInit() {
      this.getAuthors();
  }

    getAuthors() {
        let observable = this._httpService.getAuthors();
        observable.subscribe(data => {
            this.authors = data;
        });
    }

}
