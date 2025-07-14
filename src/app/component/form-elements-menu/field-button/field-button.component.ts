import { Component, input } from '@angular/core';
import { FieldTypesDefinition } from '../../../models/fild';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-field-button',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './field-button.component.html',
  styleUrl: './field-button.component.scss'
})
export class FieldButtonComponent {

  field = input.required<FieldTypesDefinition>();

}
