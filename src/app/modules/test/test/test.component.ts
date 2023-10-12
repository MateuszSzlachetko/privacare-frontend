import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  message: any;

  constructor(private http: HttpClient) {
  }

  helloWorld() {
    this.http.get('/api/test').subscribe(data => {
      this.message = data;
    })
  }
}
