import { Component, input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormField } from '../../../models/field';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './text-field.component.html',
  styleUrl: './text-field.component.scss'
})
export class TextFieldComponent {

  field = input.required<FormField>();

}
