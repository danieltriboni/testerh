import { Component } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent {

  public navItems = this.register.items$;

  constructor(public register: RegisterService) {}

}
