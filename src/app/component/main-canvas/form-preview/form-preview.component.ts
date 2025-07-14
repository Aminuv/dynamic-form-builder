import { Component, inject } from '@angular/core';
import { FormService } from '../../../service/form.service';
import { FieldPreviewComponent } from "../field-preview/field-preview.component";

@Component({
  selector: 'app-form-preview',
  standalone: true,
  imports: [FieldPreviewComponent],
  templateUrl: './form-preview.component.html',
  styleUrl: './form-preview.component.scss'
})
export class FormPreviewComponent {

  formService = inject(FormService);

}
