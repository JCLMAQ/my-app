import { BreakpointObserver } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { SimpledialogComponent } from '@my-app/ui/utilities';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { MATERIAL } from '@my-app/material';
import { I18nService } from '@my-app/ui/i18n';
import { LanguageSelectorComponent } from '@my-app/ui/language-selector';
import { GeolocationComponent } from '@my-app/ui/utilities';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';
import { StyleManager } from './style-manager.service';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@Component({
    selector: 'my-app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
    GeolocationComponent,
    NgClass,
    RouterLink,
    LanguageSelectorComponent,
    RouterOutlet,
    TranslateModule,
      ...MATERIAL,
      RouterOutlet,
    ],
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'my-app MonoRepo';
  loading : boolean = true;
  defaultLang = 'en'; // default

  // SideNav Variables
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile= true;
  isCollapsed = true;

  // Light-Dark theme switch variables
  isDark: boolean = true;
  theme: string = "ligt-theme";

// Dark theme management
  @HostBinding('class') className = '';

  // toggleControl = new FormControl(false);


  constructor(
    private router: Router,
    private styleManager: StyleManager,
    private dialog: MatDialog,
    private overlay: OverlayContainer,
    private observer: BreakpointObserver,
    public translateService: TranslateService,
    private i18nService: I18nService,
    // private entityDefinitionService: EntityDefinitionService,
  ) {
    // entityDefinitionService.registerMetadataMap(entityUserMetadata);
    translateService.setDefaultLang(this.defaultLang);
    // translateService.use('en');
    translateService.addLangs(['en','fr']);
    const browserLang = translateService.getBrowserLang();
      if (browserLang) {
        translateService.use(browserLang);
      }
  }

  ngOnInit(): void {
    // Light - Dark theme init
    this.setDefaultTheme();

    // Responsive sidebar management init
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
      this.isCollapsed = false;
    });

    // mat-spinner control base on navigation events
    this.router.events.subscribe(event => {
      switch (true) {
          case event instanceof NavigationStart: {
              this.loading = true;
              break;
          }
          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
              this.loading = false;
              break;
          }
          default: {
              break;
          }
      }
    });

    // Setup translations
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);

  } // NgOnInit end

  showDialog(): void {
    this.dialog.open(SimpledialogComponent,
      {
        width: '500px'
      });
  }

  toggleMenu() {
    // Responsive sidebar management open/close
    if(this.isMobile){
      this.sidenav.toggle();
    } else {
      this.sidenav.open(); // On desktop/tablet, the menu can never be fully closed
      this.isCollapsed = !this.isCollapsed;
    }
  }

  setDefaultTheme ( ) {
    // Light - Dark theme init
    if (localStorage.getItem('theme' )) {
    this.theme = localStorage.getItem('theme') as string;
    const body = document .getElementsByTagName ( 'body' ) [0];
    body.classList.add(this .theme);
    } else {
      this.theme = 'light-theme';
      localStorage.setItem('theme', this.theme);}
      this.theme === 'light-theme' ? this.isDark = true  : this.isDark =  false;
  }

  switchTheme ( ) {
    // Light - Dark theme swith
    const body = document. getElementsByTagName ('body') [0];
    body.classList.remove (this .theme);
    this.theme === 'light-theme'? this.theme = 'dark-theme': this. theme = 'light-theme';
    body .classList.add (this .theme);
    localStorage.setItem('theme', this.theme);
    this.isDark = !this.isDark;
  }

  switchLang(language: string): void {
    this.translateService.use(language);
  }
  ngOnDestroy() {
    this.i18nService.destroy();
  }

}
