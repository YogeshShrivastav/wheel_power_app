import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController, Loading, Platform, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import {LoginserviceProvider} from '../../providers/loginservice/loginservice';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { OrdersPage } from '../orders/orders';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { HomePage } from '../home/home';
import { ViewCartPage } from '../view-cart/view-cart';
import { OrdersPageModule } from '../orders/orders.module';
import { AddOrderPage } from '../add-order/add-order';
import { OrderListPage } from '../order-list/order-list';
import { TabsPage } from '../tabs/tabs';
declare var SMS: any;

@IonicPage()
@Component({
    selector: 'page-otp',
    templateUrl: 'otp.html',
})
export class OtpPage {
    
    loading: Loading;
    otp_values = {one: '', two: '', three: '', four: '', five: '', six: ''};
    
    otpCredentials = { mobile: '', otp: '', token: '', login_data: ''};
    otp_value:any=[];
    show_message:boolean=false;
    disable_resend_button:boolean=false;
    arr:any;
    keycode:any;
    cart:any=[];
    cart_total:any=0;
    
    otpForm: FormGroup;
    
    equalto(field_name): ValidatorFn {
        
        return (control: AbstractControl): {[key: string]: any} => {
            let input = control.value;
            
            let isValid=control.root.value[field_name]==input
            if(!isValid)
            return { 'equalTo': {isValid} }
            else
            return null;
        };
    }
    
    constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public modalCtrl: ModalController, 
        public alertCtrl: AlertController, 
        public loadingCtrl: LoadingController, 
        public loginCtrl: LoginserviceProvider, 
        public formBuilder: FormBuilder, 
        public storage: Storage, 
        public toastCtrl: ToastController,
        public platform: Platform, 
        public androidPermissions: AndroidPermissions,
        public zone: NgZone,
        public event:Events) {
            
            this.otpCredentials.mobile = this.navParams.get('mobile');
            this.otpCredentials.otp = this.navParams.get('otp');
            this.otpCredentials.token = this.navParams.get('token');
            this.cart = this.navParams.get('cart');
            this.cart_total = this.navParams.get('cart_total');
            this.otpCredentials.login_data = this.navParams.get('login_data');
            
            this.otpForm = formBuilder.group({
                one: ['', Validators.compose([Validators.required])],
                two: ['', Validators.compose([Validators.required])],
                three: ['', Validators.compose([Validators.required])],
                four: ['', Validators.compose([Validators.required])],
                five: ['', Validators.compose([Validators.required])],
                six: ['', Validators.compose([Validators.required])]
            });
            console.log(this.cart);
        }
        
        
        ionViewDidLoad() {
            console.log('ionViewDidLoad OtpverifyPage');
            this.platform.ready().then((readySource) => {
                console.log("Platform Ready");
                // this.checkPermission();
                
                var str= this.otpCredentials.otp;
                var arr = (""+str).split("");
                console.log(arr);
                
                this.otp_values.one = arr[0];
                this.otp_values.two = arr[1];
                this.otp_values.three = arr[2];
                this.otp_values.four = arr[3];
                this.otp_values.five = arr[4];
                this.otp_values.six = arr[5];
            });
            
            console.log("card arr");
            console.log(this.cart);
        }
        
        checkPermission() {
            
            console.log("CHECK PERM");
            this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(response => {
                console.log("RESP");
                console.log(response);
                if(response.hasPermission == true)
                {
                    this.watchSMS();
                    
                } else {
                    
                    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS).then(success=>{
                        
                        console.log("SUCC AGAIN");
                        if(success.hasPermission == true)
                        {
                            this.watchSMS();
                            
                        } else {
                            console.log("cancelled");
                        }
                    },
                    err=>{
                        console.log("cancelled");
                    });
                }
                
            },err =>{
                console.log("ERR");
                this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS).then(success=>{
                    console.log("SUCC AGAIN");
                    this.watchSMS();
                },
                err=>{
                    console.log("cancelled");
                });
            });
        }
        
        watchSMS() {
            console.log("WATCH");
            console.log(SMS);
            let _scope = this;
            
            if(SMS) SMS.startWatch(function(){
                console.log('Succeed to start watching SMS');
                document.addEventListener('onSMSArrive',_scope.smsArived);
            }, function(){
                console.log('failed to start watching SMS');
            });
        }
        
        smsArived = (e: any) => {
            
            console.log("DOCUMENT");
            var sms = e.data;
            console.log(sms);
            var str= sms.body;
            str = str.replace(/\D+/g, '');
            console.log(str);
            this.arr = str.split("");
            console.log(this.arr);
            
            var substring = 'Basiq';
            
            var validate = sms.address.includes(substring);
            console.log(validate);
            console.log(this.otp_values);
            
            if(validate)
            {
                this.zone.run(() => {
                    this.otp_values.one = this.arr[0];
                    this.otp_values.two = this.arr[1];
                    this.otp_values.three = this.arr[2];
                    this.otp_values.four = this.arr[3];
                    this.otp_values.five = this.arr[4];
                    this.otp_values.six = this.arr[5];
                });
                
                SMS.stopWatch(function(){
                    console.log('Succeed to stop watching SMS');
                }, function(){
                    console.log('failed to stop watching SMS');
                });
                
                this.verify_otp();
            }
        }
        
        verify_otp() {
            
            console.log(this.otpCredentials);
            console.log(this.otp_values);
            
            let formOtp = this.otp_values.one+''+this.otp_values.two+''+this.otp_values.three+''+this.otp_values.four+''+this.otp_values.five+this.otp_values.six;
            
            console.log(formOtp);
            
            if(this.cart != '')
            {
                if(this.otpCredentials.otp == formOtp)
                {
                    this.storage.set('login_data',this.otpCredentials.login_data);
                    this.event.publish("login",true);
                    this.event.publish("order",true);
                    this.storage.set('token', this.otpCredentials.token);
                    this.navCtrl.push(OrdersPage,{data:this.cart,total:this.cart_total});
                }
                else
                {
                    this.showError('Otp not Correct!!');
                }
                return;
            }
            
            if(this.otpCredentials.otp == formOtp)
            {
                this.storage.set('login_data',this.otpCredentials.login_data);
                this.event.publish("login",true);
                this.storage.set('token', this.otpCredentials.token);
                this.navCtrl.setRoot(TabsPage);
            }
            else
            {
                this.showError('Otp not Correct!!');
            }
        }
        
        
        showError(text) {
            
            let alert = this.alertCtrl.create({
                title: 'Error!',
                subTitle: text,
                buttons: ['OK']
            });
            alert.present();
        }
        
        resend_otp() {
            
            this.checkPermission();
            for (var key in this.otp_values) {
                this.otp_values[key] = '';
            }
            
            this.loginCtrl.sendMobileSMS(this.otpCredentials.mobile).then((resp:any) => {
                console.log(resp);
                
                this.otp_value.push(resp.otp);
                console.log(this.otp_value);
                this.show_message=true;
                let toast = this.toastCtrl.create({
                    message: 'New OTP Sent to the Mobile Number!',
                    duration: 3000
                });
                toast.present();
                this.disable_resend_button=true;
            },
            error => {
                console.log(error);
            });
        }
        
        stopWatchSMS() {
            
            if(SMS) SMS.stopWatch(function(){
                console.log('Succeed to stop watching SMS');
            }, function() {
                console.log('failed to stop watching SMS');
            });
        }
        
        moveFocus(nextElement,previousElement,ev) {
            
            console.log(ev);
            this.keycode = ev.keyCode;
            console.log(nextElement);
            if(ev.keyCode != 8 && nextElement)
            {
                nextElement.setFocus();
            }
            
            if(ev.keyCode == 8 && previousElement)
            {
                console.log(previousElement);
                previousElement.setFocus();
            }
        }
        
        
        showLoading() {
            
            this.loading = this.loadingCtrl.create({
                content: '<p><img src="assets/imgs/gif.svg"/></p>'
            });
            this.loading.present();
        }
        
    }
    