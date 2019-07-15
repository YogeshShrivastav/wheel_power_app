import { Component } from '@angular/core';
// import { Storage } from '@ionic/storage';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { EnquiryserviceProvider } from '../../providers/enquiryservice/enquiryservice';
import { HomePage } from '../../pages/home/home';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { CatalougeProvider } from '../../providers/catalouge/catalouge';


/**
 * Generated class for the EnquiryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enquiry',
  templateUrl: 'enquiry.html',
})
export class EnquiryPage {
state_list:any=[];
// public state_name:any;
city_list:any=[];

category_list:any=[];
sub_category_list:any=[];
product_list:any=[];

validations_form: FormGroup;
form :any = {};
pr_name:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public service: EnquiryserviceProvider ,public loadingCtrl: LoadingController,  public toastCtrl: ToastController, public formBuilder: FormBuilder, public prod:CatalougeProvider) 

  {

    

    if(this.navParams.get('p_d')){
      this.pr_name= this.navParams.get('p_d');
      console.log(this.pr_name);
      console.log(this.pr_name["category"]);
      this.form.category = this.pr_name["category"];      
      console.log(this.form.category);
      this.form.sub_category = this.pr_name["sub_category"];
      console.log(this.form.sub_category);
      this.form.product_name = this.pr_name["product_name"];
      console.log(this.form.product_name);
      
         
      
     }



  
    this.validations_form = formBuilder.group({
    
      fname: ['', Validators.compose([Validators.required])],
      lname: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      state: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])],
      sub_category: ['', Validators.compose([Validators.required])],
      product_name: ['', Validators.compose([Validators.required])],
      enquiry: ['', Validators.compose([Validators.required])],
      user: ['', Validators.compose([Validators.required])]
    });

    this.getState();
    this.get_category();
   
  }

  getState() {
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    
    this.service.getState().then((response:any)=>{
      loading.dismiss();
      console.log(response);
      this.state_list = response;
      
    });
    loading.present();
  }

  getCity(val) {
    console.log(val);
    
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    
    this.service.getCity(val).then((response:any)=>{
      loading.dismiss();
      console.log(response);
      this.city_list = response;
      
    });
    loading.present();
  }

  get_category(){
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    this.prod.getCategory().then((response:any)=>{
      loading.dismiss();
      console.log(response);
      this.category_list = response;
    });
    loading.present();
  }

  get_sub_category(val){
    console.log(val);

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
    this.prod.getsubCategory(val).then((response)=>{
      loading.dismiss();
      console.log(response);
      this.sub_category_list = response;

    });
    loading.present();
  }

  get_products(val){
    console.log(val);
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: `<img src="./assets/imgs/gif.svg" class="h15" />`,
    });
      this.prod.getProductssList(val).then((response)=>{
        console.log(response);
        this.product_list = response;
      })
  }


  submit_enquiry() {
    console.log(this.form);

    if(this.validations_form.invalid)
    {
      // this.validations_form.get('company').markAsTouched();
      this.validations_form.get('fname').markAsTouched();
      this.validations_form.get('lname').markAsTouched();
      this.validations_form.get('email').markAsTouched();
      this.validations_form.get('phone').markAsTouched();
      this.validations_form.get('state').markAsTouched();
      this.validations_form.get('city').markAsTouched();
      this.validations_form.get('category').markAsTouched();
      this.validations_form.get('sub_category').markAsTouched();
      this.validations_form.get('product_name').markAsTouched();
      this.validations_form.get('enquiry').markAsTouched();
      this.validations_form.get('user').markAsTouched();
      return;
    }
    console.log(this.form);

    this.service.submit_enquiry(this.form).then((response:any)=>{
      console.log(response);
      this.form={};
      let toast = this.toastCtrl.create({
          message: 'Your Enquiry Submitted Successfully!',
          duration: 3000
        });
        toast.present();
       
      this.navCtrl.push(HomePage,{response:response});
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EnquiryPage');
  }

  goToSearch(){
    this.navCtrl.push(SearchPage)
  }

}
