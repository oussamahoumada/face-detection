import { FormControl, FormGroup } from '@angular/forms';
import { MatIconAnchor } from '@angular/material/button';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-update-client-dialog',
  templateUrl: './add-update-client-dialog.component.html',
  styleUrls: ['./add-update-client-dialog.component.css'],
})
export class AddUpdateClientDialogComponent implements OnInit {
  public title: string = '';
  public shouldBeShown: boolean = false;

  public form: FormGroup = new FormGroup({
    name: new FormControl(null),
    mail: new FormControl(null),
    image: new FormControl(null),
    gender: new FormControl(null),
    birthday: new FormControl(null),
  });
  constructor(
    public dialogRef: MatDialogRef<AddUpdateClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = this.data.title;
    this.shouldBeShown = this.data.option;
    if (this.data.objet != null) {
      for (let field in this.data.objet) {
        for (let control in this.form.controls) {
          if (field == control) {
            this.form.controls[control].setValue(this.data.objet[field]);
          }
        }
      }
    }
  }
  ngOnInit() {}
  add() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  update() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
