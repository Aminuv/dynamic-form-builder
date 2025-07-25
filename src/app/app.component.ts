import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormElementsMenuComponent } from './component/form-elements-menu/form-elements-menu.component';
import { MainCanvasComponent } from './component/main-canvas/main-canvas.component';
import { FieldSettingsComponent } from './component/field-settings/field-settings.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormService } from './service/form.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    FormElementsMenuComponent,
    MainCanvasComponent,
    FieldSettingsComponent,
    DragDropModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dynamic-form-builder';
  formService = inject(FormService);
}
