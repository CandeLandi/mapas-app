import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CounterAloneComponent } from '../counter-alone/counter-alone.component';

@Component({
  standalone: true,
  imports: [ CounterAloneComponent],
  templateUrl: './alone.component.html',
  styleUrl: './alone.component.scss'
})
export class AloneComponent {

}
