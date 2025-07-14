import { Component, computed, inject, input } from '@angular/core';
import { FormField } from '../../../models/field';
import { FieldTypesService } from '../../../service/field-types.service';
import { FormService } from '../../../service/form.service';
import { NgComponentOutlet, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    NgComponentOutlet,
    TitleCasePipe,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {
  fieldTypesService = inject(FieldTypesService);
  formService = inject(FormService);

  field = input.required<FormField>();

  previewComponent = computed(() => {
    const type = this.fieldTypesService.getFieldType(this.field().type);
    return type?.component ?? null;
  })

  deleteField(e: Event) {
    e.stopPropagation();
    this.formService.deletField(this.field().id);
  }

}
