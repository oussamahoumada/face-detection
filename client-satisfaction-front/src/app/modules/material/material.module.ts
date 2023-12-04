import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';

const materials: any = [
  MatCardModule,
  MatTabsModule,
  MatIconModule,
  MatMenuModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
  MatToolbarModule,
  MatFormFieldModule,
];

@NgModule({
  imports: [materials],
  exports: [materials],
})
export class MaterialModule {}
