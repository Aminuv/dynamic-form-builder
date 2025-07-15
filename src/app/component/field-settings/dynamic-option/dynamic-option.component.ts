import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OptionItem } from '../../../models/field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-option',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
],
  templateUrl: './dynamic-option.component.html',
  styleUrl: './dynamic-option.component.scss'
})
export class DynamicOptionComponent {

title = input('');
options = input.required<OptionItem[]>();
optionChange = output<OptionItem[]>();

addOption() {
  const currentOptions = this.options();
  const newOption = [...currentOptions];
  newOption.push({
    label: `option ${newOption.length + 1}`,
    value: `option${newOption.length + 1}`
  });
  this.optionChange.emit(newOption);
}

removeOption(index: number) {
  const currentOptions = this.options();
  const newOption = [...currentOptions];
  newOption.splice(index, 1);
  this.optionChange.emit(newOption);
}

updateOption(index: number, newLabel: string) {
  const currentOptions = this.options();
  const newOption = [...currentOptions];
  newOption[index] = {
    ...newOption[index],
    label: newLabel
  };
  this.optionChange.emit(newOption);
}

}
