import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfilepageComponent } from './pages/profilepage/profilepage.component';
import { EditpageComponent } from './pages/editpage/editpage.component';
import { DashboardpageComponent } from './pages/dashboardpage/dashboardpage.component';
//Angular chips
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { NumericTextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { UploadguideComponent } from './components/uploadguide/uploadguide.component';
import { SafePipe } from './safe.pipe';
import { TooltipModule } from 'ng2-tooltip-directive';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomepageComponent,
    UserCardComponent,
    SigninComponent,
    SignupComponent,
    FooterComponent,
    ProfilepageComponent,
    EditpageComponent,
    DashboardpageComponent,
    UploadguideComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    TooltipModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-top-right",
      preventDuplicates: true,
      newestOnTop: true,
      progressBar: true,
      progressAnimation: "increasing",
    }),
    DropDownListModule,
    MultiSelectAllModule,
    ButtonModule,
    CheckBoxModule,
    NumericTextBoxModule,
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
