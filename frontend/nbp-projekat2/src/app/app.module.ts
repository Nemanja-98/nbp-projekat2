//components imports 
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { StoreComponent } from './components/store/store.component';
import { AppComponent } from './app.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InvoiceDialogComponent } from './components/invoice-dialog/invoice-dialog.component';
import { EditProductDialogComponent } from './components/edit-product-dialog/edit-product-dialog.component';
import { DeleteProductDialogComponent } from './components/delete-product-dialog/delete-product-dialog.component';
import { CreateProductDialogComponent } from './components/create-product-dialog/create-product-dialog.component';

//module imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog'; 
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductListComponent,
    SidenavComponent,
    StoreComponent,
    ProductDialogComponent,
    NavigationComponent,
    ProfileComponent,
    InvoiceDialogComponent,
    EditProductDialogComponent,
    DeleteProductDialogComponent,
    CreateProductDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }