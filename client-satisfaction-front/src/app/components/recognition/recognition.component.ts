import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recognition',
  templateUrl: './recognition.component.html',
  styleUrls: ['./recognition.component.css'],
})
export class RecognitionComponent implements OnInit {
  public satisfaction_list = [
    'sentiment_very_satisfied',
    'sentiment_dissatisfied',
    'sentiment_very_dissatisfied',
  ];
  public satisfaction_labele = 'sentiment_dissatisfied';
  constructor() {}
  ngOnInit() {}
  public url = '';
  upload_image(ev: any) {
    if (ev.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(ev.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
    }
  }
}
