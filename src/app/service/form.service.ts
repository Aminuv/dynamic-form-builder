import { FieldTypesService } from './field-types.service';
import { ApplicationRef, computed, inject, Injectable, signal } from '@angular/core';
import { FormRow } from '../models/form';
import { FormField } from '../models/field';
import { startViewTransition } from '../utils/view-transition';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private _rows = signal<FormRow[]>([]);
  private _selectedFieldId = signal<string | null>(null);
  public readonly rows = this._rows.asReadonly();

  private appRef = inject(ApplicationRef);

  public readonly selectedField = computed(() =>
    this._rows()
    .flatMap(row => row.fields)
    .find(f => f.id === this._selectedFieldId()));

    
  constructor( private fieldTypesService: FieldTypesService) {
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
    startViewTransition(() => {
      this._rows.set(newRow);
    });
    
  }

  deletField(fieldId: string) {
    const rows = this._rows();
    const newRows = rows.map(row => ({
      ...row,
      fields: row.fields.filter(f => f.id !== fieldId)
    }));
    startViewTransition(() => {
      this._rows.set(newRows);
      this.appRef.tick();
    });
  }


  addRow() {
    const newRows : FormRow = {
      id: crypto.randomUUID(),
      fields: []
    };
    const rows = this._rows();
    startViewTransition(() => {
      this._rows.set([...rows, newRows]);
    });
  }

  deleteRow(rowId: string) {
    if (this._rows().length === 1) {
      return;
    }
    const rows = this._rows();
    const newRows = rows.filter(row => row.id !== rowId);
    startViewTransition(() => {
      this._rows.set(newRows);
      this.appRef.tick();
    });
    
  }


  moveField(fieldId: string,
    sourceRowId: string,
    targetRowId: string,
    targetIndex: number = -1,
  ) {

    startViewTransition(() => {
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
    this.appRef.tick();
    });
    
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

  moveRowUp(rowId: string) {
    const rows = this._rows();
    const index = rows.findIndex(r => r.id === rowId);
    if (index > 0) {
      const newRow = [...rows];
      const temp = newRow[index - 1];
      newRow[index - 1] = newRow[index];
      newRow[index] = temp;
      startViewTransition(() => {
        this._rows.set(newRow);
      });
    }
  }

  moveRowDown(rowId: string) {
    const rows = this._rows();
    const index = rows.findIndex(r => r.id === rowId);
    if (index < rows.length - 1) {
      const newRow = [...rows];
      const temp = newRow[index + 1];
      newRow[index + 1] = newRow[index];
      newRow[index] = temp;
      startViewTransition(() => {
        this._rows.set(newRow);
      });
    }
  }



  // export form to file
  exportForm() {
    const formCode = this.generateFormCode();
    console.log(formCode);
    // save to file
    const blob = new Blob([formCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form.component.ts';
    a.click();
    URL.revokeObjectURL(url);
  }

  generateFormCode(): string {
    let code = this.generateImports();
    code += this.generateComponentDecorator();
    code += `template: \`\n`;
    code += `   <form class="flex flex-col gap-4">\n`;

    for (const row of this._rows()) {
      if (row.fields.length > 0) {
        code += `   <div class="flex flex-col gap-4">\n`;
        for (const field of row.fields) {
          code += `   <div class="flex-1">\n`;
          code += this.generateFieldsCode(field);
          code += `   </div>\n`;
        }
        code += `   </div>\n`;
      }
    }
    code += `</form>\n`;
    code += `\`\n`;
    code += `}\n`;
    code += `export class FormComponent {\n`;
    code += `}\n`;



    return code;
  }

  generateFieldsCode( field: FormField): string {
     const fieldDef = this.fieldTypesService.getFieldType(field.type);
     return fieldDef?.generateCode(field) || '';
  }

  generateImports(): string {
    return (
     `import { Component } from '@angular/core'; \n` +
     `import { CommonModule } from '@angular/common'; \n` +
     `import { FormsModule } from '@angular/forms'; \n` +
     `import { MatFormFieldModule } from '@angular/material/form-field'; \n` +
     `import { MatInputModule } from '@angular/material/input'; \n` +
     `import { MatSelectModule } from '@angular/material/select'; \n` +
     `import { MatCheckboxModule } from '@angular/material/checkbox'; \n` +
     `import { MatRadioModule } from '@angular/material/radio'; \n` +
     `import { MatDatepickerModule } from '@angular/material/datepicker'; \n` +
     `import { MatNativeDateModule } from '@angular/material/core'; \n` +
     `import { MatButtonModule } from '@angular/material/button'; \n\n` 

    );
  }

  generateComponentDecorator(): string {
    return (
      `@Component({ \n` +
      `standalone: true, \n` +
      `imports: [
      CommonModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatCheckboxModule,
      MatRadioModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatButtonModule
      ], \n` 
      
    );
  }



}
