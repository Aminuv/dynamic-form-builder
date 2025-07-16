import { Component, input } from '@angular/core';
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { FormField } from '../../../models/field';
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: 'app-date-field',
  imports: [
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatFormFieldModule],
  templateUrl: './date-field.component.html',
  styleUrl: './date-field.component.scss'
})
export class DateFieldComponent {
  field = input.required<FormField>();

}
