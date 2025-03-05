import { Component } from '@angular/core';
import { NavItemConfig } from '../../interfaces/ui-config/nav-item-config.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  navItems: NavItemConfig[] = [
    {
      name: 'Movies',
      path: 'movies',
      active: true,
    },
    {
      name: 'TV Shows',
      path: 'tvshows',
      active:false,
    },
  ];

  constructor(private router:Router){

  }

  selectItem(nav: NavItemConfig){
    this.navItems.map((i:NavItemConfig) => {
      i.active = nav.name === i.name;
    })
    this.router.navigateByUrl(`${nav.path}`)
  }

  homePage(){
    this.router.navigateByUrl('/home');
  }
}
