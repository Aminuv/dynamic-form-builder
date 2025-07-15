import { Component, input as inputSignal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { FormField } from '../../../models/field';

@Component({
  selector: 'app-select-field',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.scss'
})
export class SelectFieldComponent {

  field = inputSignal.required<FormField>();
}
