webpackJsonp([0],{

/***/ 112:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 112;

/***/ }),

/***/ 155:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 155;

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_wordpress_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_authentication_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_forkJoin__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_forkJoin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_forkJoin__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var PostPage = (function () {
    function PostPage(navParams, navCtrl, loadingCtrl, alertCtrl, wordpressService, authenticationService) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.wordpressService = wordpressService;
        this.authenticationService = authenticationService;
        this.comments = new Array();
        this.categories = new Array();
        this.morePagesAvailable = true;
    }
    PostPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.morePagesAvailable = true;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.post = this.navParams.get('item');
        __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"].forkJoin(this.getAuthorData(), this.getCategories(), this.getComments())
            .subscribe(function (data) {
            _this.user = data[0].name;
            _this.categories = data[1];
            _this.comments = data[2];
            loading.dismiss();
        });
    };
    PostPage.prototype.getAuthorData = function () {
        return this.wordpressService.getAuthor(this.post.author);
    };
    PostPage.prototype.getCategories = function () {
        return this.wordpressService.getPostCategories(this.post);
    };
    PostPage.prototype.getComments = function () {
        return this.wordpressService.getComments(this.post.id);
    };
    PostPage.prototype.loadMoreComments = function (infiniteScroll) {
        var _this = this;
        var page = (this.comments.length / 10) + 1;
        this.wordpressService.getComments(this.post.id, page)
            .subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var item = data_1[_i];
                _this.comments.push(item);
            }
            infiniteScroll.complete();
        }, function (err) {
            console.log(err);
            _this.morePagesAvailable = false;
        });
    };
    PostPage.prototype.goToCategoryPosts = function (categoryId, categoryTitle) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */], {
            id: categoryId,
            title: categoryTitle
        });
    };
    PostPage.prototype.createComment = function () {
        var _this = this;
        var user;
        this.authenticationService.getUser()
            .then(function (res) {
            user = res;
            var alert = _this.alertCtrl.create({
                title: 'Add a comment',
                inputs: [
                    {
                        name: 'comment',
                        placeholder: 'Comment'
                    }
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function (data) {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'Accept',
                        handler: function (data) {
                            var loading = _this.loadingCtrl.create();
                            loading.present();
                            _this.wordpressService.createComment(_this.post.id, user, data.comment)
                                .subscribe(function (data) {
                                console.log("ok", data);
                                _this.getComments();
                                loading.dismiss();
                            }, function (err) {
                                console.log("err", err);
                                loading.dismiss();
                            });
                        }
                    }
                ]
            });
            alert.present();
        }, function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Please login',
                message: 'You need to login in order to comment',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'Login',
                        handler: function () {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
                        }
                    }
                ]
            });
            alert.present();
        });
    };
    return PostPage;
}());
PostPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-post',template:/*ion-inline-start:"/Users/kgotso/Development/playground/mkgotsino/src/pages/post/post.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title *ngIf="post">\n      Post\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div *ngIf="post" class="post">\n    <div class="post-title" [innerHTML]="post.title.rendered"></div>\n    <p class="post-content" [innerHTML]="post.content.rendered"></p>\n    <ion-row>\n      <ion-col>\n        <ion-icon name=\'md-calendar\'></ion-icon>\n        {{post.date.split(\'T\')[0]}}\n      </ion-col>\n      <ion-col text-right>\n        <ion-icon name="person"></ion-icon>\n        {{user}}\n      </ion-col>\n    </ion-row>\n    <p class="bold-title">Categories:</p>\n    <ion-grid>\n      <ion-row>\n        <ion-col class="category-col" *ngFor="let category of categories">\n          <ion-badge (click)="goToCategoryPosts(category.id, category.name)">{{category.name}}</ion-badge>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n    <p class="bold-title">Comments:</p>\n    <ion-item *ngFor="let comment of comments">\n      <ion-avatar item-start>\n        <img src="{{comment.author_avatar_urls[24]}}">\n      </ion-avatar>\n      <h2>{{comment.author_name}}</h2>\n      <p [innerHTML]="comment.content.rendered"></p>\n    </ion-item>\n    <ion-infinite-scroll [enabled]="morePagesAvailable" (ionInfinite)="loadMoreComments($event)">\n      <ion-infinite-scroll-content\n      loadingSpinner="bubbles"\n      loadingText="Loading more comments...">\n      </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n </div>\n</ion-content>\n<ion-footer>\n <ion-toolbar>\n  <button ion-button block (click)="createComment()">Add a Comment</button>\n </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/Users/kgotso/Development/playground/mkgotsino/src/pages/post/post.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_4__services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_5__services_authentication_service__["a" /* AuthenticationService */]])
], PostPage);

//# sourceMappingURL=post.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_wordpress_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_authentication_service__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterPage = (function () {
    function RegisterPage(navCtrl, formBuilder, wordpressService, authenticationService) {
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.wordpressService = wordpressService;
        this.authenticationService = authenticationService;
    }
    RegisterPage.prototype.ionViewWillLoad = function () {
        this.register_form = this.formBuilder.group({
            username: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            displayName: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["g" /* Validators */].required),
        });
    };
    RegisterPage.prototype.onSubmit = function (values) {
        var _this = this;
        var username; // this should be an administrator Username
        var password; // this should be an administrator Password
        //only authenticated administrators can create users
        this.authenticationService.doLogin(username, password)
            .subscribe(function (res) {
            var user_data = {
                username: values.username,
                name: values.displayName,
                email: values.email,
                password: values.password
            };
            _this.authenticationService.doRegister(user_data, res.json().token)
                .subscribe(function (result) {
                console.log(result);
            }, function (error) {
                console.log(error);
            });
        }, function (err) {
            console.log(err);
        });
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-register',template:/*ion-inline-start:"/Users/kgotso/Development/playground/mkgotsino/src/pages/register/register.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Register</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="form-content">\n  <form class="form" [formGroup]="register_form"  (ngSubmit)="onSubmit(register_form.value)">\n\n    <ion-item>\n      <ion-label color="primary">Username</ion-label>\n      <ion-input type="text" formControlName="username" class="form-controll" required></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary">Display Name</ion-label>\n      <ion-input type="text" formControlName="displayName"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary">Email</ion-label>\n      <ion-input type="email" formControlName="email"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary">Password</ion-label>\n      <ion-input type="password" formControlName="password"></ion-input>\n    </ion-item>\n    <br>\n    <button ion-button full type="submit" [disabled]="!register_form.valid">Submit</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/kgotso/Development/playground/mkgotsino/src/pages/register/register.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_3__services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_4__services_authentication_service__["a" /* AuthenticationService */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return WORDPRESS_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WORDPRESS_REST_API_URL; });
//config constants
//config constants
var WORDPRESS_URL = 'https://mkgotsino.com/friendzone/';
var WORDPRESS_REST_API_URL = WORDPRESS_URL + 'wp-json/wp/v2/';
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(223);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_post_post__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_register_register__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_wordpress_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_authentication_service__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_native_storage__ = __webpack_require__(203);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_post_post__["a" /* PostPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_register_register__["a" /* RegisterPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */])
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_post_post__["a" /* PostPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_register_register__["a" /* RegisterPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_12__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_native_storage__["a" /* NativeStorage */],
            __WEBPACK_IMPORTED_MODULE_9__services_wordpress_service__["a" /* WordpressService */],
            __WEBPACK_IMPORTED_MODULE_10__services_authentication_service__["a" /* AuthenticationService */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicErrorHandler */] }
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_authentication_service__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, authenticationService) {
        var _this = this;
        platform.ready().then(function () {
            authenticationService.getUser()
                .then(function (data) {
                authenticationService.validateAuthToken(data.token)
                    .subscribe(function (res) { return _this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]; }, function (err) { return _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]; });
            }, function (err) { return _this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */]; });
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/kgotso/Development/playground/mkgotsino/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/kgotso/Development/playground/mkgotsino/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_6__services_authentication_service__["a" /* AuthenticationService */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_native_storage__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthenticationService = (function () {
    function AuthenticationService(nativeStorage, http) {
        this.nativeStorage = nativeStorage;
        this.http = http;
    }
    AuthenticationService.prototype.getUser = function () {
        return this.nativeStorage.getItem('User');
    };
    AuthenticationService.prototype.setUser = function (user) {
        return this.nativeStorage.setItem('User', user);
    };
    AuthenticationService.prototype.logOut = function () {
        return this.nativeStorage.clear();
    };
    AuthenticationService.prototype.doLogin = function (username, password) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config__["b" /* WORDPRESS_URL */] + 'wp-json/jwt-auth/v1/token', {
            username: username,
            password: password
        });
    };
    AuthenticationService.prototype.doRegister = function (user_data, token) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config__["a" /* WORDPRESS_REST_API_URL */] + 'users?token=' + token, user_data);
    };
    AuthenticationService.prototype.validateAuthToken = function (token) {
        var header = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        header.append('Authorization', 'Basic ' + token);
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__config__["b" /* WORDPRESS_URL */] + 'wp-json/jwt-auth/v1/token/validate?token=' + token, {}, { headers: header });
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_native_storage__["a" /* NativeStorage */],
        __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
], AuthenticationService);

//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WordpressService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_forkJoin__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_forkJoin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_forkJoin__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var WordpressService = (function () {
    function WordpressService(http) {
        this.http = http;
    }
    WordpressService.prototype.getRecentPosts = function (categoryId, page) {
        if (page === void 0) { page = 1; }
        //if we want to query posts by category
        var category_url = categoryId ? ("&categories=" + categoryId) : "";
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* WORDPRESS_REST_API_URL */]
            + 'posts?page=' + page
            + category_url)
            .map(function (res) { return res.json(); });
    };
    WordpressService.prototype.getComments = function (postId, page) {
        if (page === void 0) { page = 1; }
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* WORDPRESS_REST_API_URL */]
            + "comments?post=" + postId
            + '&page=' + page)
            .map(function (res) { return res.json(); });
    };
    WordpressService.prototype.getAuthor = function (author) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* WORDPRESS_REST_API_URL */] + "users/" + author)
            .map(function (res) { return res.json(); });
    };
    WordpressService.prototype.getPostCategories = function (post) {
        var _this = this;
        var observableBatch = [];
        post.categories.forEach(function (category) {
            observableBatch.push(_this.getCategory(category));
        });
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].forkJoin(observableBatch);
    };
    WordpressService.prototype.getCategory = function (category) {
        return this.http.get(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* WORDPRESS_REST_API_URL */] + "categories/" + category)
            .map(function (res) { return res.json(); });
    };
    WordpressService.prototype.createComment = function (postId, user, comment) {
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        header.append('Authorization', 'Bearer ' + user.token);
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__config__["a" /* WORDPRESS_REST_API_URL */] + "comments?token=" + user.token, {
            author_name: user.displayname,
            author_email: user.email,
            post: postId,
            content: comment
        }, { headers: header })
            .map(function (res) { return res.json(); });
    };
    return WordpressService;
}());
WordpressService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], WordpressService);

//# sourceMappingURL=wordpress.service.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__post_post__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_wordpress_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_authentication_service__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = (function () {
    function HomePage(navCtrl, navParams, loadingCtrl, wordpressService, authenticationService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.wordpressService = wordpressService;
        this.authenticationService = authenticationService;
        this.posts = new Array();
        this.morePagesAvailable = true;
        this.loggedUser = false;
    }
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.authenticationService.getUser()
            .then(function (data) { return _this.loggedUser = true; }, function (error) { return _this.loggedUser = false; });
        this.morePagesAvailable = true;
        //if we are browsing a category
        this.categoryId = this.navParams.get('id');
        this.categoryTitle = this.navParams.get('title');
        if (!(this.posts.length > 0)) {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.wordpressService.getRecentPosts(this.categoryId)
                .subscribe(function (data) {
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var post = data_1[_i];
                    post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
                    _this.posts.push(post);
                }
                loading_1.dismiss();
            });
        }
    };
    HomePage.prototype.postTapped = function (event, post) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__post_post__["a" /* PostPage */], {
            item: post
        });
    };
    HomePage.prototype.doInfinite = function (infiniteScroll) {
        var _this = this;
        var page = (Math.ceil(this.posts.length / 10)) + 1;
        var loading = true;
        this.wordpressService.getRecentPosts(this.categoryId, page)
            .subscribe(function (data) {
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var post = data_2[_i];
                if (!loading) {
                    infiniteScroll.complete();
                }
                post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
                _this.posts.push(post);
                loading = false;
            }
        }, function (err) {
            _this.morePagesAvailable = false;
        });
    };
    HomePage.prototype.logOut = function () {
        var _this = this;
        this.authenticationService.logOut()
            .then(function (res) { return _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]); }, function (err) { return console.log('Error in log out'); });
    };
    HomePage.prototype.goToLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/kgotso/Development/playground/mkgotsino/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title *ngIf="!categoryTitle">Recents posts</ion-title>\n    <ion-title *ngIf="categoryTitle">{{categoryTitle}} posts</ion-title>\n    <ion-buttons *ngIf="loggedUser" end>\n      <button ion-button icon-only (click)="logOut()">\n        <ion-icon class="toolbar-icon" name="log-out"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-buttons *ngIf="!loggedUser" end>\n      <button ion-button icon-only (click)="goToLogin()">\n        <ion-icon class="toolbar-icon" name="log-in"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="content">\n  <ion-card *ngFor="let post of posts" >\n    <ion-card-content >\n      <ion-card-title [innerHTML]="post.title.rendered"></ion-card-title>\n      <p [innerHTML]="post.excerpt.rendered"></p>\n    </ion-card-content>\n    <ion-row no-padding>\n       <ion-col>\n         <button ion-button clear small color="primary" icon-start>\n           {{post.date.split(\'T\')[0]}}\n         </button>\n       </ion-col>\n       <ion-col text-right>\n         <button ion-button small color="primary" (click)="postTapped($event, post)" icon-start>\n            Read More\n         </button>\n       </ion-col>\n     </ion-row>\n  </ion-card>\n  <ion-infinite-scroll [enabled]="morePagesAvailable" (ionInfinite)="doInfinite($event)">\n    <ion-infinite-scroll-content\n    loadingSpinner="bubbles"\n    loadingText="Loading more posts ...">\n    </ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"/Users/kgotso/Development/playground/mkgotsino/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4__services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_5__services_authentication_service__["a" /* AuthenticationService */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home_home__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register_register__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_wordpress_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_authentication_service__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginPage = (function () {
    function LoginPage(navCtrl, loadingCtrl, formBuilder, wordpressService, authenticationService) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.formBuilder = formBuilder;
        this.wordpressService = wordpressService;
        this.authenticationService = authenticationService;
    }
    LoginPage.prototype.ionViewWillLoad = function () {
        this.login_form = this.formBuilder.group({
            username: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].compose([
                __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required
            ])),
            password: new __WEBPACK_IMPORTED_MODULE_4__angular_forms__["b" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["g" /* Validators */].required)
        });
    };
    LoginPage.prototype.login = function (value) {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        this.authenticationService.doLogin(value.username, value.password)
            .subscribe(function (res) {
            _this.authenticationService.setUser({
                token: res.json().token,
                username: value.username,
                displayname: res.json().user_display_name,
                email: res.json().user_email
            });
            loading.dismiss();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */]);
        }, function (err) {
            loading.dismiss();
            _this.error_message = "Invalid credentials. Try with username 'aa' password 'aa'.";
            console.log(err);
        });
    };
    LoginPage.prototype.skipLogin = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_1__home_home__["a" /* HomePage */]);
    };
    LoginPage.prototype.goToRegister = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__register_register__["a" /* RegisterPage */]);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/kgotso/Development/playground/mkgotsino/src/pages/login/login.html"*/'<ion-content padding class="form-content">\n  <form class="form" [formGroup]="login_form" (ngSubmit)="login(login_form.value)">\n    <ion-label class="title">Welcome back</ion-label>\n    <p class="skip-login"><a (click)="skipLogin()">Click here to skip login!</a></p>\n    <p class="skip-login"><a (click)="goToRegister()">Click here to Register!</a></p>\n    <ion-item>\n      <ion-label color="primary">Username</ion-label>\n      <ion-input type="text" formControlName="username" class="form-controll" required></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label color="primary">Password</ion-label>\n      <ion-input type="password" formControlName="password" class="form-controll" required></ion-input>\n    </ion-item>\n    <p class="error-message" *ngIf="error_message">{{error_message}}</p>\n    <button ion-button full class="login-button" [disabled]="!login_form.valid" type="submit">Login</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/Users/kgotso/Development/playground/mkgotsino/src/pages/login/login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_5__services_wordpress_service__["a" /* WordpressService */],
        __WEBPACK_IMPORTED_MODULE_6__services_authentication_service__["a" /* AuthenticationService */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ })

},[204]);
//# sourceMappingURL=main.js.map