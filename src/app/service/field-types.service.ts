import { Injectable } from '@angular/core';
import { FieldTypesDefinition } from '../models/field';
import { TextFieldComponent } from '../component/field-types/text-field/text-field.component';
import { CheckboxFieldComponent } from '../component/field-types/checkbox-field/checkbox-field.component';

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
  component: TextFieldComponent
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
  component: CheckboxFieldComponent
}

@Injectable({
  providedIn: 'root'
})
export class FieldTypesService {

  fieldTypes = new Map<string, FieldTypesDefinition>([
    ['text', TEXT_FIELD_DEFINITION],
    ['checkbox', CHECKBOX_FIELD_DEFINITION]
  ])

  getFieldType(type: string): FieldTypesDefinition | undefined {
    return this.fieldTypes.get(type);

  }

  getAllFieldTypes(): FieldTypesDefinition[] {
    return Array.from(this.fieldTypes.values());
  }

}
