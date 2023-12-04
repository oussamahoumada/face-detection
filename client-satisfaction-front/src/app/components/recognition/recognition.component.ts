import { Component, OnInit } from '@angular/core';
import { RecognitionService } from '../../services/recognition.service';

@Component({
  selector: 'app-recognition',
  templateUrl: './recognition.component.html',
  styleUrls: ['./recognition.component.css'],
})
export class RecognitionComponent implements OnInit {
  constructor(private recognitionService: RecognitionService) {}
  ngOnInit() {}
  public url: any;
  public name: any;
  public discount: any;
  public satisfaction: any;
  public satisfaction_labele: any;
  public sensation = [
    ['sad', '20%'],
    ['fear', '5%'],
    ['happy', '0%'],
    ['angry', '20%'],
    ['neutral', '0%'],
    ['disgust', '15%'],
    ['surprise', '0%'],
  ];

  public sensation_icon = [
    ['fear', 'sentiment_dissatisfied'],
    ['neutral', 'sentiment_satisfied'],
    ['surprise', 'sentiment_satisfied'],
    ['happy', 'sentiment_very_satisfied'],
    ['sad', 'sentiment_very_dissatisfied'],
    ['angry', 'sentiment_very_dissatisfied'],
    ['disgust', 'sentiment_very_dissatisfied'],
  ];

  upload_image(ev: any) {
    if (ev.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(ev.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.recognitionService
          .uploadImage(
            event.target.result,
            'copie.jpg' /*ev.target.files[0].name*/
          )
          .subscribe((res) => {
            console.log(res);
            let icon = this.sensation_icon.find((f) => f[0] == res.sentiment);
            let disc = this.sensation.find((f) => f[0] == res.sentiment);
            this.name = res.message;
            this.satisfaction = res.sentiment;
            this.discount = disc != undefined ? disc[1] : '';
            this.satisfaction_labele = icon != undefined ? icon[1] : '';
            if (this.discount != '0%' && this.name !="Unknown") {
              this.recognitionService.sent_mail({
                client: this.name,
                satisfaction: this.satisfaction,
                discount: this.discount,
              });
            }
          });
      };
    }
  }
}
