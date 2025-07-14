import { Component, inject, signal } from '@angular/core';
import { FormEditorComponent } from "./form-editor/form-editor.component";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormPreviewComponent } from './form-preview/form-preview.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormService } from '../../service/form.service';

@Component({
  selector: 'app-main-canvas',
  standalone: true,
  imports: [
    FormEditorComponent,
    MatButtonToggleModule,
    FormPreviewComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './main-canvas.component.html',
  styleUrl: './main-canvas.component.scss'
})
export class MainCanvasComponent {

  activeTab = signal<'preview' | 'editor'>('editor');

  formService = inject(FormService);

}
