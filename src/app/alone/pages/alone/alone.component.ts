import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CounterAloneComponent } from '../../components/counter-alone/counter-alone.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';

@Component({
  standalone: true,
  imports: [ CounterAloneComponent, SideMenuComponent ],
  templateUrl: './alone.component.html',
  styleUrl: './alone.component.scss'
})
export class AloneComponent {

}
