import { Component } from '@angular/core';
import { FormEditorComponent } from "./form-editor/form-editor.component";

@Component({
  selector: 'app-main-canvas',
  imports: [FormEditorComponent],
  templateUrl: './main-canvas.component.html',
  styleUrl: './main-canvas.component.scss'
})
export class MainCanvasComponent {

}
