import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormElementsMenuComponent } from './component/form-elements-menu/form-elements-menu.component';
import { MainCanvasComponent } from './component/main-canvas/main-canvas.component';
import { FieldSettingsComponent } from './component/field-settings/field-settings.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormElementsMenuComponent, MainCanvasComponent, FieldSettingsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dynamic-form-builder';
}
