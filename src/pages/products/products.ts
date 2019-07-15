import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { CatalougeProvider } from '../../providers/catalouge/catalouge';
import { ConstantProvider } from '../../providers/constant/constant';
import { SearchPage } from '../search/search';
import { ProductDetailsPage } from '../product-details/product-details';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  listView:any;    
  sub_category:any='';
  category:any=''; 
  brand:any='';
  categoryData:any;
  filterSelectedData=[];
  
  type_val:any
  upload_url:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public serv: CatalougeProvider, public loadingCtrl: LoadingController, public constant:ConstantProvider,public db:DatabaseProvider) {
    this.brand = navParams.get('brand');
    this.category = navParams.get('category');
    this.sub_category = navParams.get('sub_categoryes');
  }

  ionViewDidLoad() {
    this.upload_url = this.db.upload_url;
    this.get_product_list('');
    this.getCategoryList();
  }

  product_list:any=[];
  get_product_list(filterSelectedData)
  {
    this.db.getData({brand:this.brand,"category":this.category,"sub_category":this.sub_category,filterSelectedData},"product/product_list")
    .subscribe(resp=>{
      console.log(resp);
      this.product_list=resp;
    })
  }

  // getProductList(filterSelectedData)
  // {
  //   let loading = this.loadingCtrl.create({
  //     spinner: 'hide',
  //     content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
  //   });
    
  //   this.serv.getProductList(this.sub_categoryes,filterSelectedData,this.newarrival,this.brand).then((response:any)=>{
  //     loading.dismiss();
  //     console.log(response);
  //     this.productlist = response;    
  //   });
  //   loading.present();
  // }

  category_list:any=[];
  getCategoryList() {  
    
    this.db.getData(this.brand,"product/category_list")
    .subscribe(resp=>{
      console.log(resp);
      this.category_list=resp;
    });
   
  }

  
  toggleListView(){
    this.listView = !this.listView;
  }
  
  goToProductDetailPage(data) {
    console.log(data);
    this.navCtrl.push(ProductDetailsPage,{detail:data});
  }
   
  goToSearch(){
    this.navCtrl.push(SearchPage)
  }
  
  saveFilterSelected(type, category, sub_category ,action)
  {
    if(type!='clear')
    {    
      console.log(category);
      console.log(action);
      
      if(type == 'category')
      {        
        if(action == true)
        {
          this.filterSelectedData.push({category:category,sub_category:[]});
          this.getSubCategoryData(category); 
        }
        
        if(action == false)
        {          
          var typeIndex = this.filterSelectedData.findIndex((val)=> {
            return val.category === category;            
          });
          this.filterSelectedData.splice(typeIndex, 1);
          this.subcategorydata = this.subcategorydata.filter((row)=> {
            return row.category != category;
          });
          console.log(this.subcategorydata);
        }
      }
                   
      if(type=='sub_category') 
      {
        console.log(this.filterSelectedData);
        
        var categoryIndex = this.filterSelectedData.findIndex((val)=>
        {
            return val.category === category;
        });
        
        if(action==true)
        {
          this.filterSelectedData[categoryIndex].sub_category.push(sub_category);
        }            
        if(action==false)
        {
          var subCategoryIndex = this.filterSelectedData[categoryIndex].sub_category.findIndex((row)=>{
              return row == sub_category;
          });          
          this.filterSelectedData[categoryIndex].sub_category.splice(subCategoryIndex, 1);
        }

      }
    }
    else
    {
      this.subcategorydata=[];
      for(let i=0; i<this.category_list.length;i++) 
      {
        this.category_list[i].checked = false;
      }
    }

    console.log(this.filterSelectedData);
    this.get_product_list(this.filterSelectedData)
  }

  togglePopUp() {
    this.saveFilterSelected('clear', '', '','');
  }
  
  subcategorydata:any=[];
  getSubCategoryData(category)
  {
    this.db.getData({'category':category},"product/subcategory_data")
    .subscribe(resp=>{
      this.subcategorydata = this.subcategorydata.concat(resp);
    });
  }
  
 
  
  
}
