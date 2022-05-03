import { PlanService } from './../../services/plan.service';
import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Plan } from '../../entities/plan';

@Component({
  selector: 'dashboard-one',
  templateUrl: './DashboardOne.component.html',
  styleUrls: ['./DashboardOne.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardOneComponent implements OnInit{

	bannerTitle: string = 'Find Your Sport Plan';
	bannerDesc : string = 'Explore top-rated plans, find new friends and more';
	bannerImage: string = 'assets/images/main-search-background-01.jpg';

	popularCategoriesTitle : string = 'Popular Categories';
	popularCategoriesDesc  : string = 'Browse the most desirable categories';
	categories : any = [
								{
									title: 'Resistance',
									subTitle : '',
									image: 'assets/images/cat-img-5.jpg',
								},
								{
									title: 'Plyometric',
									subTitle : '',
									image: 'assets/images/cat-img-2.jpg',
								},
								{
									title: 'Continuous',
									subTitle : '',
									image: 'assets/images/cat-img-6.jpg',
								},
								{
									title: 'Fartlek',
									subTitle : '',
									image: 'assets/images/cat-img-4.jpg',
								},
								{
									title: 'Interval',
									subTitle : '',
									image: 'assets/images/cat-img-1.jpg',
								},
								{
									title: 'Circuit',
									subTitle : '',
									image: 'assets/images/cat-img-3.jpg',
								}
							];

	constructor(
		private PlanService: PlanService
	){
	}

	ngOnInit(){
		this.GetPlansCountByCategory();
	}

	GetPlansCountByCategory(){
		this.categories.forEach(element => {
			this.PlanService.getPlansByCategory(element.title).subscribe(plans => element.subTitle = plans.length +' plans');
							});
	}
}
