import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { TitleBarComponent } from '../globalFrontendComponents/TitleBar/TitleBar.component';
import { TeamComponent } from './Team/Team.component';
import { BannerComponent } from './Banner/Banner.component';
import { PopularCategoriesComponent } from './PopuplarCategories/PopularCategories.component';
import { FeatureSectionComponent } from './FeatureSection/FeatureSection.component';
import { TestimonialComponent } from './Testimonial/Testimonial.component';
import { FeatureGridSectionComponent } from '../globalFrontendComponents/FeatureGridSection/FeatureGridSection.component';
import { ParallaxComponent } from './ParallaxSection/Parallax.component';
import { ServicesComponent } from './Services/Services.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
   dayGridPlugin
 ]);

@NgModule({
   imports : [
   CommonModule,
   RouterModule,
   SlickCarouselModule,
   AgmCoreModule.forRoot({apiKey: 'AIzaSyBtdO5k6CRntAMJCF-H5uZjTCoSGX95cdk'})],
  declarations: [
    TitleBarComponent,
    TeamComponent,
    BannerComponent ,
     PopularCategoriesComponent,
     FeatureSectionComponent,
     TestimonialComponent,
     FeatureGridSectionComponent,
     ParallaxComponent,
     ServicesComponent
  ],
  exports: [ 
     TitleBarComponent,
     TeamComponent,
     BannerComponent ,
     PopularCategoriesComponent,
     FeatureSectionComponent,
     TestimonialComponent,
     FeatureGridSectionComponent,
     ParallaxComponent,
     ServicesComponent
   ]
})

export class GlobalModule {}
