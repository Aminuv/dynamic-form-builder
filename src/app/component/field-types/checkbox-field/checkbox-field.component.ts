import { Component, input } from '@angular/core';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormField } from '../../../models/field';

@Component({
  selector: 'app-checkbox-field',
  standalone: true,
  imports: [MatCheckboxModule],
  templateUrl: './checkbox-field.component.html',
  styleUrl: './checkbox-field.component.scss'
})
export class CheckboxFieldComponent {

  field = input.required<FormField>();

}
