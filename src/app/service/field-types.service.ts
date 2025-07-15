import { Injectable } from '@angular/core';
import { FieldTypesDefinition } from '../models/field';
import { TextFieldComponent } from '../component/field-types/text-field/text-field.component';
import { CheckboxFieldComponent } from '../component/field-types/checkbox-field/checkbox-field.component';
import { SelectFieldComponent } from '../component/field-types/select-field/select-field.component';

const TEXT_FIELD_DEFINITION: FieldTypesDefinition = {
  type: 'text',
  label: 'Text_Field',
  icon: 'text_fields',
  defaultConfig: {
    label: 'text Field',
    required: false
  },
  settingsConfig: [
    {
      type: 'text', key: 'label', label: 'Label'
    },
    {type: 'text', key: 'placeholder', label: 'Placeholder'},
    {type: 'checkbox', key: 'required', label: 'Required'},
    {
      type: 'select',
      key: 'inputType',
      label: 'Input Type',
      options: [
      {label: 'Text', value: 'text'},
      {label: 'Number', value: 'number'},
      {label: 'Email', value: 'email'},
      {label: 'Phone', value: 'tel'},
      {label: 'URL', value: 'url'}
    ]
    }
  ],
  component: TextFieldComponent,
  generateCode: (field) => {
    return `
    <mat-form-field appearance="outline" class="w-full">
    <mat-label>${field.label}</mat-label>
    <input matInput type="${field.inputType || 'text'}" required="${field.required}" placeholder="${field.placeholder}">
  </mat-form-field>
    `
  }
}

const CHECKBOX_FIELD_DEFINITION: FieldTypesDefinition = {
  type: 'checkbox',
  label: 'Checkbox',
  icon: 'check_box',
  defaultConfig: {
    label: 'Checkbox',
    required: false
  },
  settingsConfig: [
    {
      type: 'text', key: 'label', label: 'Label'
    },
    {type: 'checkbox', key: 'required', label: 'Required'}
  ],
  component: CheckboxFieldComponent,
  generateCode: (field) => {
    return `
    <mat-form-field appearance="outline" class="w-full">
    <mat-label>${field.label}</mat-label>
    <input matInput type="checkbox" required="${field.required}">
  </mat-form-field>
    `
  }
}

const SELECT_FIELD_DEFINITION: FieldTypesDefinition = {
  type: 'select',
  label: 'Dropdown',
  icon: 'arrow_drop_down_circle',
  component: SelectFieldComponent,
  defaultConfig: {
    label: 'select',
    required: false,
    options: [
      {label: 'Option 1', value: 'option1'},
      {label: 'Option 2', value: 'option2'},
      {label: 'Option 3', value: 'option3'}
    ]
  },
  settingsConfig: [
    {type: 'text', key: 'label', label: 'Label'},
    {type: 'checkbox', key: 'required', label: 'Required'},
    {type: 'dynamic-Option', key: 'options', label: 'DropdownOptions'}
  ],
  generateCode: (field) => {
    let code = 
   `       <mat-form-field appearance="outline" class="w-full">\n`+
   `         <mat-label>${field.label}</mat-label>\n`+
   `         <mat-select required="${field.required}">\n`;

    if (field.options) {
      field.options.forEach(option => {
        code += `           <mat-option [value]="${option.value}">${option.label}</mat-option>\n`;
      });
    } else {
      code += 
      `           <mat-option value="option1">Option 1</mat-option>\n`+
      `           <mat-option value="option2">Option 2</mat-option>\n`+
      `           <mat-option value="option3">Option 3</mat-option>\n`;
    }
    code += `         </mat-select>\n    `+
            `         </mat-form-field>\n`;
    return code;
  }
}

@Injectable({
  providedIn: 'root'
})
export class FieldTypesService {

  fieldTypes = new Map<string, FieldTypesDefinition>([
    ['text', TEXT_FIELD_DEFINITION],
    ['checkbox', CHECKBOX_FIELD_DEFINITION],
    ['select', SELECT_FIELD_DEFINITION]
  ])

  getFieldType(type: string): FieldTypesDefinition | undefined {
    return this.fieldTypes.get(type);

  }

  getAllFieldTypes(): FieldTypesDefinition[] {
    return Array.from(this.fieldTypes.values());
  }

}
