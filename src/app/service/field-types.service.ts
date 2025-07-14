import { Injectable } from '@angular/core';
import { FieldTypesDefinition } from '../models/fild';

const TEXT_FIELD_DEFINITION = {
  type: 'text',
  label: 'Text_Field',
  icon: 'text_fields'
}

const CHECKBOX_FIELD_DEFINITION = {
  type: 'checkbox',
  label: 'Checkbox',
  icon: 'check_box'
}

@Injectable({
  providedIn: 'root'
})
export class FieldTypesService {

  fieldTypes = new Map<string, FieldTypesDefinition>([
    ['text', TEXT_FIELD_DEFINITION],
    ['checkbox', CHECKBOX_FIELD_DEFINITION]
  ])

  getAllFieldTypes(): FieldTypesDefinition[] {
    return Array.from(this.fieldTypes.values());
  }

}
