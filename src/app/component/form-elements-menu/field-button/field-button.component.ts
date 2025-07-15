import { Component, input, signal } from '@angular/core';
import { FieldTypesDefinition } from '../../../models/field';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule, CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-field-button',
  standalone: true,
  imports: [
    MatIconModule,
    DragDropModule
  ],
  templateUrl: './field-button.component.html',
  styleUrl: './field-button.component.scss'
})
export class FieldButtonComponent {

  field = input.required<FieldTypesDefinition>();

  whileDragging = signal(false);

}
