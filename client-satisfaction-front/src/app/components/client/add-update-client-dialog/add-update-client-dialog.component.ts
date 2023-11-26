import { FormControl, FormGroup } from '@angular/forms';
import { MatIconAnchor } from '@angular/material/button';
import { Component, OnInit, Inject } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-update-client-dialog',
  templateUrl: './add-update-client-dialog.component.html',
  styleUrls: ['./add-update-client-dialog.component.css'],
})
export class AddUpdateClientDialogComponent implements OnInit {
  public title: string = '';
  public shouldBeShown: boolean = false;
  public url: any;
  public url1: any;

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
    private clientService: ClientService
  ) {
    this.title = this.data.title;
    this.shouldBeShown = this.data.option;
    if (this.data.objet != null) {
      for (let field in this.data.objet) {
        for (let control in this.form.controls) {
          if (field == control) {
            if (field == 'image') {
              this.url = this.data.objet[field];
            } else this.form.controls[control].setValue(this.data.objet[field]);
          }
        }
      }
    }
  }
  ngOnInit() {
    /*this.clientService.downloadImage().subscribe((res) => {
      this.url1 = res.dataURL;
    });*/
  }
  add() {
    if (this.form.valid) {
      let req = {
        form: this.form.value,
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
        /*this.clientService
          .uploadImage(event.target.result, ev.target.files[0].name)
          .subscribe((res) => {
            console.log(res);
          });*/
      };
    }
  }


}
