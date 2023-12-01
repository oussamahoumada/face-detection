import { FormControl, FormGroup } from '@angular/forms';
import { MatIconAnchor } from '@angular/material/button';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RecognitionService } from '../../../services/recognition.service';

@Component({
  selector: 'app-add-update-client-dialog',
  templateUrl: './add-update-client-dialog.component.html',
  styleUrls: ['./add-update-client-dialog.component.css'],
})
export class AddUpdateClientDialogComponent implements OnInit {
  public title: string = '';
  public shouldBeShown: boolean = false;
  public url: any;
  public img_name: any;

  public form: FormGroup = new FormGroup({
    name: new FormControl(null),
    mail: new FormControl(null),
    image: new FormControl(null),
    discount: new FormControl(null),
    client_id: new FormControl(null),
    Satisfaction: new FormControl(null),
    dateNaissance: new FormControl(null),
  });
  constructor(
    public dialogRef: MatDialogRef<AddUpdateClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private recognitionService: RecognitionService
  ) {
    this.title = this.data.title;
    this.shouldBeShown = this.data.option;
    if (this.data.objet != null) {
      for (let field in this.data.objet) {
        for (let control in this.form.controls) {
          if (field == control) {
            if (field == 'image') {
              this.recognitionService
                .downloadImage(this.data.objet[field])
                .subscribe((res) => {
                  this.url = res.dataURL;
                });
            } else this.form.controls[control].setValue(this.data.objet[field]);
          }
        }
      }
    }
  }
  ngOnInit() {}
  add() {
    if (this.form.valid) {
      let fr: any = this.form.value;
      fr['image'] = this.url;
      fr['img_name'] = this.img_name;
      let req = {
        form: fr,
        meth: 'add',
      };
      this.dialogRef.close(req);
    }
  }

  update() {
    if (this.form.valid) {
      let req = {
        form: this.form.value,
        meth: 'update',
      };
      this.dialogRef.close(req);
    }
  }

  upload_image(ev: any) {
    if (ev.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(ev.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.img_name = ev.target.files[0].name;
      };
    }
  }
}
