import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

const materials: any = [
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
];

@NgModule({
  imports: [materials],
  exports: [materials],
})
export class MaterialModule {}
