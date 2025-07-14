import { Injectable, signal } from '@angular/core';
import { FormRow } from '../models/form';
import { FormField } from '../models/field';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private _rows = signal<FormRow[]>([]);
  public readonly rows = this._rows.asReadonly();

  constructor() {
    this._rows.set([
      {
        id: crypto.randomUUID(),
        fields: []
      }
    ]);
   }

  addField(field: FormField, rowId: string, index?: number) {
    const rows = this._rows();
    const newRow = rows.map(row => {
      if (row.id === rowId) {
        const updatedFields = [...row.fields];
      if (index !== undefined) {
        updatedFields.splice(index, 0, field);
      } else {
        updatedFields.push(field);
      }
      return {
        ...row,
        fields: updatedFields
      }
      }
      return row;
    });
    this._rows.set(newRow);
  }

  deletField(fieldId: string) {
    const rows = this._rows();
    const newRows = rows.map(row => ({
      ...row,
      fields: row.fields.filter(f => f.id !== fieldId)
    }));
    this._rows.set(newRows);
  }


  addRow() {
    const newRows : FormRow = {
      id: crypto.randomUUID(),
      fields: []
    };
    const rows = this._rows();
    this._rows.set([...rows, newRows]);
  }

  deleteRow(rowId: string) {
    if (this._rows().length === 1) {
      return;
    }
    const rows = this._rows();
    const newRows = rows.filter(row => row.id !== rowId);
    this._rows.set(newRows);
  }
}
