import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tailwind-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
      <div>
        <div class="text-xl font-medium text-black">Tailwind Test</div>
        <p class="text-gray-500">If you see this styled properly, Tailwind is working!</p>
      </div>
    </div>
  `
})
export class TailwindTestComponent {}
