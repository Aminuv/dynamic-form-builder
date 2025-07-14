import { Component, signal } from '@angular/core';
import { FormEditorComponent } from "./form-editor/form-editor.component";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormPreviewComponent } from './form-preview/form-preview.component';
@Component({
  selector: 'app-main-canvas',
  standalone: true,
  imports: [
    FormEditorComponent
    , MatButtonToggleModule,
    FormPreviewComponent
  ],
  templateUrl: './main-canvas.component.html',
  styleUrl: './main-canvas.component.scss'
})
export class MainCanvasComponent {

  activeTab = signal<'preview' | 'editor'>('editor');

}
