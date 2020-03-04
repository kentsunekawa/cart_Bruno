/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/src/bruno/cart_bruno.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/src/bruno/cart_bruno.js":
/*!************************************!*\
  !*** ./js/src/bruno/cart_bruno.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Cart_bruno =\n/*#__PURE__*/\nfunction () {\n  function Cart_bruno(cartData, options) {\n    _classCallCheck(this, Cart_bruno);\n\n    this.cartData = cartData;\n    this.options = options;\n    this.isSingleSku = this.cartData.skuData.length ? false : true;\n    this.selected = null;\n    this.$cart = $('.bruno');\n    this.$productsList = this.$cart.find('*[data-cart-elem=productsList]'), this.$root = $('<li></li>');\n    this.$inCartBtn;\n    this.msg;\n    this.render.call(this);\n    this.$itemSelector = this.$root.find('*[data-cart-elem=itemSelector]');\n    this.$checkBox = this.$root.find('*[data-cart-elem=checkbox]');\n    this.validate(false);\n    this.handleEvent.call(this);\n  }\n\n  _createClass(Cart_bruno, [{\n    key: \"render\",\n    value: function render() {\n      this.create_product();\n      this.$productsList.append(this.$root);\n      this.$msg = this.create_msg();\n    }\n  }, {\n    key: \"handleEvent\",\n    value: function handleEvent() {\n      var _this = this;\n\n      this.$itemSelector.on('touchstart click', function (e) {\n        if (e.type === 'touchstart') {\n          _this.itemSelectorClickFlg = true;\n        }\n\n        if (_this.itemSelectorClickFlg) {\n          _this.itemSelectorClickFlg = false;\n        } else {\n          _this.selectChange(e);\n        }\n      });\n    }\n  }, {\n    key: \"selectChange\",\n    value: function selectChange(e) {\n      var $currentSelector = $(e.currentTarget);\n      var selectedNum = $currentSelector.attr('data-item-num');\n      this.$root.find('.comp-itemSelector__selected').removeClass('comp-itemSelector__selected');\n      this.$root.find('.comp-checkBox__selected').removeClass('comp-checkBox__selected');\n      $currentSelector.addClass('comp-itemSelector__selected');\n      $currentSelector.find('.comp-checkBox').addClass('comp-checkBox__selected');\n\n      if (!this.isSingleSku) {\n        this.thumChange(selectedNum);\n      }\n\n      if (this.selected === null) {\n        this.validate(true);\n      }\n\n      this.selected = selectedNum;\n    }\n  }, {\n    key: \"thumChange\",\n    value: function thumChange(selectedNum) {\n      this.$thumImg.attr('src', this.cartData.skuData[selectedNum].thum);\n    }\n  }, {\n    key: \"validate\",\n    value: function validate(flg) {\n      var _this2 = this;\n\n      if (flg) {\n        this.$inCartBtn.on('touchstart.cv click.cv', function (e) {\n          console.log('cart in');\n\n          if (e.type === 'touchstart') {\n            _this2.cvBtnClickFlg = true;\n          }\n\n          if (_this2.cvBtnClickFlg) {\n            _this2.cvBtnClickFlg = false;\n          } else {\n            _this2.$inCartBtn.off('touchstart.cv click.cv').addClass('comp-btn__disabled');\n\n            _this2.inCart();\n          }\n        }).removeClass('comp-btn__disabled');\n      } else {\n        this.$inCartBtn.off('touchstart.cv click.cv').addClass('comp-btn__disabled');\n      }\n    }\n  }, {\n    key: \"inCart\",\n    value: function inCart() {\n      var _this3 = this;\n\n      var inventoryId = '';\n\n      if (!this.isSingleSku) {\n        inventoryId = this.cartData.skuData[this.selected].value;\n      }\n\n      var checkContents = [];\n\n      for (var i = 0; i < this.cartData.coreData.checkContent.length; i++) {\n        checkContents.push(\"\\u2605\".concat(this.cartData.coreData.checkContent[i]));\n      }\n\n      var param = {\n        'itemid': this.cartData.coreData.itemId,\n        'shopid': this.cartData.coreData.shopBid,\n        'dbasket_choice_select[]': checkContents,\n        'units': 1,\n        'inventory_id': inventoryId\n      };\n      $.ajax({\n        url: 'http://direct.step.rakuten.co.jp/rms/mall/cartAdd/',\n        type: 'get',\n        dataType: 'jsonp',\n        data: param\n      }).then(function (data) {\n        _this3.done_cartIn(data);\n      });\n    }\n  }, {\n    key: \"done_cartIn\",\n    value: function done_cartIn(data) {\n      var _this4 = this;\n\n      this.showMsg(data).done(function () {\n        _this4.validate(true);\n      });\n    }\n  }, {\n    key: \"showMsg\",\n    value: function showMsg(data) {\n      var d = $.Deferred();\n      var $currentMsg = this.$msg.clone();\n      $currentMsg.find('*[data-cart-elem=msgTitle]').html(data.dialogTitle);\n\n      if (data.resultMessage != '') {\n        $currentMsg.find('*[data-cart-elem=msgText]').html(data.resultMessage);\n      }\n\n      this.$inCartBtnWrapper.append($currentMsg);\n      setTimeout(function () {\n        $currentMsg.remove();\n        d.resolve();\n      }, 3000);\n      return d.promise();\n    } // create-------------------------\n\n  }, {\n    key: \"create_product\",\n    value: function create_product() {\n      if (this.isSingleSku) {\n        this.$root.addClass('comp-items_item comp-items_item__single');\n      } else {\n        this.$root.addClass('comp-items_item comp-items_item__multi');\n      }\n\n      this.$thumArea = $('<div></div>').addClass('comp-items_thumArea').append(this.create_thum());\n      this.$itemsCore = $('<div></div>').addClass('comp-items_core').append(this.create_itemInfo());\n\n      if (this.isSingleSku) {\n        var $checkBox = this.create_checkBox();\n        this.$itemsCore.prepend($checkBox).addClass('comp-itemSelector').attr({\n          'data-item-num': '',\n          'data-cart-elem': 'itemSelector'\n        });\n      } else {\n        var $skus = $('<div></div>').addClass('comp-skus comp-items_skus');\n        var $skuList = this.create_skuList();\n        this.$itemsCore.append($skus.append($skuList));\n      }\n\n      this.$cvArea = $('<div></div>').addClass('comp-items_cvArea bruno_cvArea').append(this.create_cartInBtn(), this.create_cartLinkBtn());\n      this.$checkContentsArea = $('<div></div').addClass('comp-items_checkContents');\n      var $checkContents = $('<ul></ul').addClass('comp-items_checkContentsList');\n\n      for (var i = 0; i < this.cartData.coreData.checkContent.length; i++) {\n        var $checkContent = $('<li></li>').text(\"\\u2605\".concat(this.cartData.coreData.checkContent[i])).addClass('comp-items_checkContent');\n        $checkContents.append($checkContent);\n      }\n\n      this.$checkContentsArea.append($checkContents);\n      this.$footer = $('<div></div>').addClass('comp-items_footer').append(this.$checkContentsArea, this.$cvArea);\n      this.$root.append(this.$thumArea, this.$itemsCore, this.$footer);\n    }\n  }, {\n    key: \"create_thum\",\n    value: function create_thum() {\n      var $thum = $('<div></div>').addClass('comp-imgArea');\n      this.$thumImg = $('<img>').addClass('comp-img').attr({\n        src: this.cartData.coreData.thum,\n        alt: this.cartData.coreDataproductName\n      });\n      return $thum.append(this.$thumImg);\n    }\n  }, {\n    key: \"create_itemInfo\",\n    value: function create_itemInfo() {\n      var $itemInfo = $('<div></div>').addClass('comp-items_itemInfo'),\n          $brandName = $('<div></div>').addClass('comp-items_brandName').html(this.cartData.coreData.brand),\n          $productName = $('<div></div>').addClass('comp-items_itemName').html(this.cartData.coreData.productName),\n          $priceWrapper = $('<div></div>').addClass('comp-items_price comp-price'),\n          $price = $('<p></p>').addClass('comp-price_price').text('円（税込）'),\n          $priceText = $('<span></span>').html(this.cartData.coreData.price);\n\n      if (this.cartData.coreData.isFreeShipping) {\n        var $freeShipping = $('<p></p>').addClass('comp-price_label comp-label freeShipping').text('送料無料');\n        $priceWrapper.append($freeShipping);\n      }\n\n      $itemInfo.append($brandName, $productName, $priceWrapper.append($price.prepend($priceText)));\n      return $itemInfo;\n    }\n  }, {\n    key: \"create_checkBox\",\n    value: function create_checkBox() {\n      var $span = $('<span></span>').addClass('comp-itemSelector_checkBox comp-checkBox').attr('data-cart-elem', 'checkbox');\n      return $span;\n    }\n  }, {\n    key: \"create_skuList\",\n    value: function create_skuList() {\n      var $ul = $('<div></div>').addClass('comp-skus_skuList');\n\n      for (var i = 0; i < this.cartData.skuData.length; i++) {\n        var currentData = this.cartData.skuData[i];\n        var $li = this.create_sku(currentData, i);\n        $ul.append($li);\n      }\n\n      return $ul;\n    }\n  }, {\n    key: \"create_sku\",\n    value: function create_sku(skuData, skuNum) {\n      var $li = $('<a></a>').addClass('comp-skus_sku comp-itemSelector').attr({\n        'data-item-num': skuNum,\n        'data-cart-elem': 'itemSelector'\n      }),\n          $checkBox = this.create_checkBox(),\n          $p = $('<p></p>').addClass('comp-itemSelector_itemName').html(skuData.skuName);\n      $li.append($checkBox, $p);\n      return $li;\n    }\n  }, {\n    key: \"create_cartInBtn\",\n    value: function create_cartInBtn() {\n      this.$inCartBtnWrapper = $('<div></div>').addClass('bruno_cvBtn');\n      this.$inCartBtn = $('<a>かごに追加</a>').attr({\n        'data-cart-elem': 'inCartBtn',\n        'id': \"kaimono_\".concat(this.cartData.coreData.itemId)\n      }).addClass('comp-btn comp-btn__cv');\n      var $icon = $('<span></span>').addClass('comp-btn_icon');\n      this.$inCartBtnWrapper.append(this.$inCartBtn.prepend($icon));\n      return this.$inCartBtnWrapper;\n    }\n  }, {\n    key: \"create_cartLinkBtn\",\n    value: function create_cartLinkBtn() {\n      $toCartBtn = $('<a>かごを見る</a>').addClass('comp-btn comp-btn__cart').attr({\n        'href': 'https://ts.basket.step.rakuten.co.jp/rms/mall/bs/cartall/?shop_bid=262435',\n        'target': '_top'\n      });\n      return $toCartBtn;\n    }\n  }, {\n    key: \"create_msg\",\n    value: function create_msg() {\n      var $msgWrapper = $('<div></div>').addClass('comp-msg'),\n          $msgTitle = $('<p></p>').addClass('comp-msg_title').attr('data-cart-elem', 'msgTitle'),\n          $msgText = $('<p></p>').addClass('comp-msg_text').attr('data-cart-elem', 'msgText');\n      $msgWrapper.append($msgTitle, $msgText);\n      return $msgWrapper;\n    }\n  }]);\n\n  return Cart_bruno;\n}();\n\nwindow.Cart_bruno = Cart_bruno;\n\n//# sourceURL=webpack:///./js/src/bruno/cart_bruno.js?");

/***/ })

/******/ });