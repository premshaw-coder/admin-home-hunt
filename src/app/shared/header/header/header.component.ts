import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { Toolbar } from 'primeng/toolbar';
import { RoutesPaths } from '../../application-routes/app-routes';
import { SubscriptionStatusService } from '../../../../features/property-listing/services/subscription-status.service';

@Component({
  selector: 'app-header',
  imports: [Toolbar, MenuModule, BadgeModule, RippleModule, AvatarModule, ButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  private router = inject(Router)
  private service = inject(SubscriptionStatusService)

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

//test to invalidate the cache of subscription status hav to remove in the future
  public onClick1() {
    this.router.navigate([RoutesPaths.basePath + 'subscription'])
    this.service.refreshStatus()

  }

  public onClick2() {
    this.router.navigate([RoutesPaths.basePath + 'property-listing/rent'])
    this.service.refreshStatus()
  }
}



