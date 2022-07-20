import {
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  NgModule,
  forwardRef,
} from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ScreenWithSidenavComponent, ToolbarComponent } from './layout';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptor } from './shared/http';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlBrazilian } from './shared/i18n';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';
import { BaseListComponent } from './shared/base/base-list/base-list.component';

registerLocaleData(pt);

@NgModule({
  declarations: [AppComponent, ScreenWithSidenavComponent, ToolbarComponent, BaseListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSidenavModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    {
      provide: MatPaginatorIntl,
      useClass: forwardRef(() => MatPaginatorIntlBrazilian),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
