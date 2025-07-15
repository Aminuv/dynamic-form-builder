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
