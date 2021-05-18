import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule  } from 'ngx-toastr';
import { routing } from './app.routes';
import { AppComponent } from './app.component';
import { HomeModule } from './views/home/home.module';
import { LittleTablesLimitedByTaskModule } from './views/multiplication/little-tables/limited-by-task/limited-by-task.module';
import { LittleTablesLimitedByTimeModule } from './views/multiplication/little-tables/limited-by-time/limited-by-time.module';
import { Data } from './models/data.model';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ToastrModule.forRoot({ preventDuplicates: true }),
    HomeModule,
    LittleTablesLimitedByTaskModule,
    LittleTablesLimitedByTimeModule
  ],
  providers: [
    Data
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
