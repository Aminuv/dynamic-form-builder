import { Component, inject } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { FormService } from '../../../service/form.service';
import { FieldTypesDefinition } from '../../../models/field';
import { FormField } from '../../../models/field';
import { FormFieldComponent } from "../form-field/form-field.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-editor',
  standalone: true,
  imports: [
    DragDropModule,
    FormFieldComponent,
    MatButtonModule,
    MatIconModule,
    DragDropModule
],
  templateUrl:'./form-editor.component.html',
  styleUrl: './form-editor.component.scss'
})
export class FormEditorComponent {

  formService = inject(FormService);
  
  onDropInRow(event: CdkDragDrop<string>, rowId: string) {
    if (event.previousContainer.data === 'field-selector') {
      // add field to the row
      const fieldType = event.item.data as FieldTypesDefinition;
      const newField: FormField = {
        id: crypto.randomUUID(),
        type: fieldType.type,
        ...fieldType.defaultConfig
      }
      
      this.formService.addField(newField, rowId, event.currentIndex);
      return;
    }
    
    const dragData = event.item.data as FormField;
    const previousRowId = event.previousContainer.data as string;
    
    this.formService.moveField(dragData.id, previousRowId, rowId, event.currentIndex);
  }
}
