import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { Toolbar } from 'primeng/toolbar';
import { RoutesPaths } from '../../constants/application-routes/app-routes';
import { SubscriptionStatusService } from '../../../../features/property-listing/services/subscription-status.service';
import { skip, take } from 'rxjs/operators';
import { AuthApiResponse } from '../../../../features/auth/interfaces/auth/auth-login.interface';

@Component({
  selector: 'app-header',
  imports: [Toolbar, MenuModule, BadgeModule, RippleModule, AvatarModule, ButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;
  private readonly router = inject(Router)
  private readonly subscriptionStatusService = inject(SubscriptionStatusService)
  private readonly userInfo: AuthApiResponse = JSON.parse(localStorage.getItem('UserInfo') ?? '{}')


  ngOnInit() {
    this.items = [
      {
        label: 'User Info',
        items: [
          {
            label: this.userInfo?.name ?? '',
            icon: 'pi pi-user'
          },
          {
            label: this.userInfo?.email ?? '',
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
              this.router.navigate([RoutesPaths.BasePath + RoutesPaths.Auth.login]);
            }
          }
        ]
      }
    ];
  }

  //test to invalidate the cache of subscription status hav to remove in the future
  public onClick1() {
    this.subscriptionStatusService.refreshStatus();
    this.subscriptionStatusService.getSubscriptionStatus().pipe(skip(1), take(1)).subscribe(() => {
      this.router.navigate([RoutesPaths.BasePath + 'subscription'])
    })
  }

  public onClick2() {
    this.subscriptionStatusService.refreshStatus();
    this.subscriptionStatusService.getSubscriptionStatus().pipe(skip(1), take(1)).subscribe(() => {
      this.router.navigate([RoutesPaths.BasePath + 'property-listing/rent'])
    })
  }
}



