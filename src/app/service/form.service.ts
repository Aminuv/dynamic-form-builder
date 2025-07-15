import { computed, Injectable, signal } from '@angular/core';
import { FormRow } from '../models/form';
import { FormField } from '../models/field';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private _rows = signal<FormRow[]>([]);
  private _selectedFieldId = signal<string | null>(null);
  public readonly rows = this._rows.asReadonly();

  public readonly selectedField = computed(() =>
    this._rows()
    .flatMap(row => row.fields)
    .find(f => f.id === this._selectedFieldId()));

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


  moveField(fieldId: string,
    sourceRowId: string,
    targetRowId: string,
    targetIndex: number = -1,
  ) {
    const rows = this._rows();
    let fieldToMove: FormField | undefined;
    let sourceRowIndex: number = -1;
    let sourceFieldIndex: number = -1;
    
    rows.forEach((row, rowIndex) => {
      if (row.id === sourceRowId) {
        sourceRowIndex = rowIndex;
        sourceFieldIndex = row.fields.findIndex(f => f.id === fieldId);
        if (sourceFieldIndex >= 0) {
          fieldToMove = row.fields[sourceFieldIndex];
        }
      }
    });
    if (!fieldToMove) {
      return;
    }
    
    const newRows = [...rows];
    const fieldsWithRemovedField = newRows[sourceRowIndex].fields.filter(f => f.id !== fieldId);
    newRows[sourceRowIndex].fields = fieldsWithRemovedField;
    
    const targetRowIndex = newRows.findIndex(r => r.id === targetRowId);
    if (targetRowIndex >= 0) {
      const targetfields = [...newRows[targetRowIndex].fields];
      targetfields.splice(targetIndex, 0, fieldToMove);
      newRows[targetRowIndex].fields = targetfields;
    }
    this._rows.set(newRows);
  }

  setSelectedFieldId(fieldId: string) {
    this._selectedFieldId.set(fieldId);
  }

  updateField(fieldId: string, data: Partial<FormField>) {
    const rows = this._rows();
    const newRows = rows.map((row) => ({
      ...row,
      fields: row.fields.map((f) => (f.id === fieldId ? {...f, ...data} : f))    
    }));
    this._rows.set(newRows)
  }
}
