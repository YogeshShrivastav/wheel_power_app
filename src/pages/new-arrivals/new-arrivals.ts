import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';
import { NavController, LoadingController } from 'ionic-angular';
import {ArrivalserviceProvider } from '../../providers/arrivalservice/arrivalservice';
import { SearchPage } from '../search/search';
/**
 * Generated class for the NewArrivalsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-new-arrivals',
  templateUrl: 'new-arrivals.html',
})
export class NewArrivalsPage {

  listActive:any
  arrivalslist:any=[];

  category_list:any=[];

  categoryData:any;
  filterSelectedData={};
  category:any;
  subcategorydata:any=[];
  
  constructor(public navCtrl: NavController, public service: ArrivalserviceProvider , public loadingCtrl: LoadingController) {
    
    this.filterSelectedData['category'] = [];
    // this.getSubCategoryData(this.categoryData, this.filterSelectedData);
    this.getCategory()
    this.getNewArrival()
    
   
  }


  getNewArrival() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    
    this.service.getNewArrival().then((response:any)=>{
      loading.dismiss();
      console.log(response);
      this.arrivalslist = response;

      // console.log(this.arrivalslist);
      
    });
    loading.present();
  }

  getCategory() {
    let loading = this.loadingCtrl.create({
      // spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    
    this.service.getCategory().then((response:any)=>{
      loading.dismiss();
      console.log(response);
      this.category_list = response;

      // console.log(this.arrivalslist);
      
    });
    loading.present();
  }

  toggleListView(){
    this.listActive = !this.listActive;
  }




  SeeProductDetails(id:any){
    this.navCtrl.push(ProductDetailsPage,{new_arrival:id})
  }

  goToSearch(){
    this.navCtrl.push(SearchPage)
  }



  saveFilterSelected(type, type_val, action) {


    if(type !== 'clear') {

        if(action == true) {
          this.filterSelectedData[type].push(type_val);
        }

        if(action == false) {
            var typeIndex = this.filterSelectedData[type].findIndex((val)=> {
                return val === type_val;
            });

            this.filterSelectedData[type].splice(typeIndex, 1);
        }

    } 
    else {
       
        this.filterSelectedData['category'] = [];

     

        for(let i=0; i<this.categoryData.length;i++) {
            this.categoryData[i].checked = false;
        }
    }

    this.getSubCategoryData(this.category,this.filterSelectedData);
        
    console.log(type, type_val, action);
    console.log(this.filterSelectedData);
}

togglePopUp() {
  this.saveFilterSelected('clear', '', '');
//   console.log(this.popupActive);
}

getSubCategoryData(category:any, filterSelected){
  this.service.getSubCategoryData(category, filterSelected).then((response:any)=>{
    console.log(response);
    this.subcategorydata = response.sub_category;
    // this.productlist_data = response.product_name;
    // console.log(this.subcategorydata);
    // console.log(response.product_name);
    // this.msg =response.msg;
    // this.filterExist = response.filterExist;
    // console.log(this.product_list);
  });
}


ionViewDidLoad() {
  console.log('ionViewDidLoad NewArrivalsPage');
}
}
