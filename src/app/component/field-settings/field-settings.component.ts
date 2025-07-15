import { Component, computed, inject } from '@angular/core';
import { FormService } from '../../service/form.service';
import { FieldTypesService } from '../../service/field-types.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from "@angular/material/checkbox";
import { MatSelectModule } from '@angular/material/select';
import { DynamicOptionComponent } from "./dynamic-option/dynamic-option.component";

@Component({
  selector: 'app-field-settings',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInput,
    MatCheckbox,
    MatSelectModule,
    DynamicOptionComponent
],
  templateUrl: './field-settings.component.html',
  styleUrl: './field-settings.component.scss'
})
export class FieldSettingsComponent {

  formService = inject(FormService);
  fieldTypesService = inject(FieldTypesService);

  fieldSettings = computed(() => {
    const field = this.formService.selectedField();
    if (!field) {
      return [];
    }
    const fieldDef = this.fieldTypesService.getFieldType(field.type);
    return fieldDef?.settingsConfig || [];
  })

  fieldValues = computed(() => {
    const field = this.formService.selectedField();
    if (!field) {
      return {};
    }
    return field as any;
  })

  updateField(fieldId: string, key: string, value: any) {
    this.formService.updateField(fieldId, { [key]: value });
  }
}
