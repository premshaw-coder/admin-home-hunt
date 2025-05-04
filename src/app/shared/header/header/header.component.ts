import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { Toolbar } from 'primeng/toolbar';
import { RoutesPaths } from '../../application-routes/app-routes';

@Component({
  selector: 'app-header',
  imports: [Toolbar, MenuModule, BadgeModule, RippleModule, AvatarModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  private router = inject(Router)

  ngOnInit() {
    this.items = [
      {
        label: 'User Info',
        items: [
          {
            label: 'Prem Shaw',
            icon: 'pi pi-user'
          },
          {
            label: 'premranjanshaw@gmail.com',
            icon: 'pi pi-envelope'
          }
        ]
      },
      {
        label: 'Profile',
        items: [
          {
            label: 'Settings',
            icon: 'pi pi-cog'
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
              localStorage.removeItem('UserInfo');
              this.router.navigate([RoutesPaths.basePath + RoutesPaths.login]);
            }
          }
        ]
      }
    ];
  }
}



