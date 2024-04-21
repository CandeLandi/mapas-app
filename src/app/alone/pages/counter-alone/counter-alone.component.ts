import { Component } from '@angular/core';

@Component({
  selector: 'counter-alone',
  standalone: true,
/*  */
  templateUrl: './counter-alone.component.html',
  styleUrl: './counter-alone.component.scss'
})
export class CounterAloneComponent {

public counter: number = 10;


}
