import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './components/app-routing-module/app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponentComponent } from './pages/home/home-component/home-component.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { IndexComponentComponent } from './pages/index/index-component/index-component.component';
import { FooterComponent } from './components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemsComponent } from './components/items/items.component';
import { AppRoutingModuleComponent } from './components/app-routing-module/app-routing-module.component';
import { ProductFromUrlComponent } from './components/product-from-url/product-from-url.component';
import { PadreColoresComponent } from './components/padre-colores/padre-colores.component';
import { HijoColoresComponent } from './components/hijo-colores/hijo-colores.component';
import { ColoresComponent } from './pages/colores/colores/colores.component';
import { HelperServiceComponent } from './components/helper-service/helper-service.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { BidsComponent } from './components/bids/bids.component';
import { BidService } from './services/bid.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    PageNotFoundComponent,
    HeaderComponent,
    IndexComponentComponent,
    FooterComponent,
    CarouselComponent,
    ItemsComponent,
    AppRoutingModuleComponent,
    ProductFromUrlComponent,
    PadreColoresComponent,
    HijoColoresComponent,
    ColoresComponent,
    HelperServiceComponent,
    BidsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [HelperServiceComponent, ProductService, BidService],
  bootstrap: [AppComponent],
})
export class AppModule {}
