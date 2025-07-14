import { Component, inject, input } from '@angular/core';
import { FormField } from '../../../models/field';
import { FormService } from '../../../service/form.service';
import { TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FieldPreviewComponent } from "../field-preview/field-preview.component";



@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    TitleCasePipe,
    MatButtonModule,
    MatIconModule,
    FieldPreviewComponent
],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {
  formService = inject(FormService);

  field = input.required<FormField>();


  deleteField(e: Event) {
    e.stopPropagation();
    this.formService.deletField(this.field().id);
  }

}
