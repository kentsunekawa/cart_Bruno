class Cart_bruno {
    constructor(cartData, options) {

        this.cartData = cartData;
        this.options = options;
        this.isSingleSku = this.cartData.skuData.length ? false : true;
        this.selected = null;

        this.$cart = $('.bruno');
        this.$productsList = this.$cart.find('*[data-cart-elem=productsList]'),
        this.$root = $('<li></li>');
        this.$inCartBtn;
        this.msg;

        this.render.call(this);

        this.$itemSelector = this.$root.find('*[data-cart-elem=itemSelector]');
        this.$checkBox = this.$root.find('*[data-cart-elem=checkbox]');

        this.validate(false);

        this.handleEvent.call(this);
    }
    render() {
        this.create_product();
        this.$productsList.append(this.$root);

        this. $msg = this.create_msg();
    }

    handleEvent() {
        this.$itemSelector.on('touchstart click', (e) => {
            if (e.type === 'touchstart') {
                this.itemSelectorClickFlg = true;
            }
            
            if (this.itemSelectorClickFlg) {
                this.itemSelectorClickFlg = false;
            } else {
                this.selectChange(e);
            }
        });
    }

    selectChange(e) {
        let $currentSelector = $(e.currentTarget);

        let selectedNum = $currentSelector.attr('data-item-num');

        this.$root
            .find('.comp-itemSelector__selected')
            .removeClass('comp-itemSelector__selected');
        this.$root
            .find('.comp-checkBox__selected')
            .removeClass('comp-checkBox__selected');

        $currentSelector.addClass('comp-itemSelector__selected');
        $currentSelector
            .find('.comp-checkBox')
            .addClass('comp-checkBox__selected');
        
        if(!this.isSingleSku) {
            this.thumChange(selectedNum);
        }

        if(this.selected === null) {
            this.validate(true);
        }

        this.selected = selectedNum;
    }

    thumChange(selectedNum) {
        this.$thumImg.attr('src', this.cartData.skuData[selectedNum].thum);
    }

    validate(flg){
        if(flg) {
            this.$inCartBtn
                .on('touchstart.cv click.cv', (e) => {
                    console.log('cart in');
                    if (e.type === 'touchstart') {
                        this.cvBtnClickFlg = true;
                    }
                    
                    if (this.cvBtnClickFlg) {
                        this.cvBtnClickFlg = false;
                    } else {
                        this.$inCartBtn.off('touchstart.cv click.cv').addClass('comp-btn__disabled');
                        this.inCart();
                    }
                })
                .removeClass('comp-btn__disabled');
        } else {
            this.$inCartBtn.off('touchstart.cv click.cv').addClass('comp-btn__disabled');
        }
    }

    inCart(){
        let inventoryId = '';
        if(!this.isSingleSku) {
            inventoryId = this.cartData.skuData[this.selected].value
        }

        let checkContents = [];
        for(var i = 0; i < this.cartData.coreData.checkContent.length; i++) {
            checkContents.push(`★${this.cartData.coreData.checkContent[i]}`);
        }

        let param = {
            'itemid': this.cartData.coreData.itemId,
            'shopid': this.cartData.coreData.shopBid,
            'dbasket_choice_select[]': checkContents,
            'units': 1,
            'inventory_id': inventoryId,
        };
        $.ajax({
            url: 'http://direct.step.rakuten.co.jp/rms/mall/cartAdd/',
            type: 'get',
            dataType: 'jsonp',
            data: param
        }).then((data) => {
            this.done_cartIn(data);
        });
    }

    done_cartIn(data) {
        this.showMsg(data).done(() => {
            this.validate(true);
        });
    }

    showMsg(data) {
        var d = $.Deferred();
        let $currentMsg = this.$msg.clone();
        $currentMsg.find('*[data-cart-elem=msgTitle]').html(data.dialogTitle);
        if(data.resultMessage != '') {
            $currentMsg.find('*[data-cart-elem=msgText]').html(data.resultMessage);
        }
        this.$inCartBtnWrapper.append($currentMsg);
        setTimeout(() => {
            $currentMsg.remove();
            d.resolve();
        }, 3000);
        return d.promise();
    }


    // create-------------------------

    create_product() {
        
        if(this.isSingleSku) {
            this.$root
                .addClass('comp-items_item comp-items_item__single');
        } else {
            this.$root
                .addClass('comp-items_item comp-items_item__multi');
        }

        this.$thumArea = 
            $('<div></div>')
                .addClass('comp-items_thumArea')
                .append(this.create_thum());

        this.$itemsCore = 
            $('<div></div>')
                .addClass('comp-items_core')
                .append(this.create_itemInfo());

        if(this.isSingleSku) {
            let $checkBox = this.create_checkBox();
            this.$itemsCore
                .prepend($checkBox)
                .addClass('comp-itemSelector')
                .attr({
                    'data-item-num': '',
                    'data-cart-elem': 'itemSelector',
                });
        } else {
            let $skus = $('<div></div>').addClass('comp-skus comp-items_skus');
            let $skuList = this.create_skuList();
            this.$itemsCore.append(
                $skus.append($skuList)
            );
        }

        this.$cvArea = 
            $('<div></div>')
                .addClass('comp-items_cvArea bruno_cvArea')
                .append(
                    this.create_cartInBtn(),
                    this.create_cartLinkBtn()
                );

        this.$checkContentsArea = $('<div></div').addClass('comp-items_checkContents');
        let $checkContents = $('<ul></ul').addClass('comp-items_checkContentsList');
        for(var i = 0; i < this.cartData.coreData.checkContent.length; i++) {
            var $checkContent = 
                $('<li></li>')
                    .text(`★${this.cartData.coreData.checkContent[i]}`)
                    .addClass('comp-items_checkContent');
            $checkContents.append($checkContent);
        }
        this.$checkContentsArea.append($checkContents);

        this.$footer = 
            $('<div></div>')
                .addClass('comp-items_footer')
                .append(this.$checkContentsArea,this.$cvArea);
        

        this.$root.append(
            this.$thumArea,
            this.$itemsCore,
            this.$footer
        );
    }

    create_thum(){
        let $thum = $('<div></div>').addClass('comp-imgArea');
        this.$thumImg = $('<img>')
            .addClass('comp-img')
            .attr({
                src: this.cartData.coreData.thum,
                alt: this.cartData.coreDataproductName
            });
        return $thum.append(this.$thumImg);
    }

    create_itemInfo() {
        let $itemInfo = $('<div></div>').addClass('comp-items_itemInfo'),
            $brandName = $('<div></div>').addClass('comp-items_brandName').html(this.cartData.coreData.brand),
            $productName = $('<div></div>').addClass('comp-items_itemName').html(this.cartData.coreData.productName),
            $priceWrapper = $('<div></div>').addClass('comp-items_price comp-price'),
            $price = $('<p></p>').addClass('comp-price_price').text('円（税込）'),
            $priceText = $('<span></span>').html(this.cartData.coreData.price);
        if(this.cartData.coreData.isFreeShipping){
            let $freeShipping = $('<p></p>').addClass('comp-price_label comp-label freeShipping').text('送料無料');
            $priceWrapper.append($freeShipping);
        }
        $itemInfo.append(
            $brandName,
            $productName,
            $priceWrapper.append(
                $price.prepend($priceText)
            )
        )
        return $itemInfo;
    }

    create_checkBox() {
        let $span = 
            $('<span></span>')
                .addClass('comp-itemSelector_checkBox comp-checkBox')
                .attr('data-cart-elem', 'checkbox');
        return $span;
    }

    create_skuList() {
        let $ul = $('<div></div>').addClass('comp-skus_skuList');
        for(let i = 0; i < this.cartData.skuData.length; i++) {
            let currentData = this.cartData.skuData[i];
            let $li = this.create_sku(currentData, i);
            $ul.append($li)
        }
        return $ul;
    }

    create_sku(skuData, skuNum) {
        let $li = $('<a></a>')
            .addClass('comp-skus_sku comp-itemSelector')
            .attr({
                'data-item-num': skuNum,
                'data-cart-elem': 'itemSelector'
            }),
            $checkBox = this.create_checkBox(),
            $p = $('<p></p>').addClass('comp-itemSelector_itemName').html(skuData.skuName);

        $li.append($checkBox, $p);
        return $li;
    }

    create_cartInBtn() {
        this.$inCartBtnWrapper = $('<div></div>').addClass('bruno_cvBtn');
        this.$inCartBtn = 
            $('<a>かごに追加</a>')
                .attr({
                    'data-cart-elem': 'inCartBtn',
                    'id': `kaimono_${this.cartData.coreData.itemId}`
                })
                .addClass('comp-btn comp-btn__cv');
        let $icon = $('<span></span>').addClass('comp-btn_icon');

        this.$inCartBtnWrapper.append(
            this.$inCartBtn.prepend($icon)
        );

        return this.$inCartBtnWrapper;
    }

    create_cartLinkBtn() {
        $toCartBtn = $('<a>かごを見る</a>')
            .addClass('comp-btn comp-btn__cart')
            .attr({
                'href': 'https://ts.basket.step.rakuten.co.jp/rms/mall/bs/cartall/?shop_bid=262435',
                'target': '_top',
            });
        return $toCartBtn;
    }

    create_msg() {
        let $msgWrapper = $('<div></div>').addClass('comp-msg'),
            $msgTitle = $('<p></p>').addClass('comp-msg_title').attr('data-cart-elem', 'msgTitle'),
            $msgText = $('<p></p>').addClass('comp-msg_text').attr('data-cart-elem', 'msgText');

        $msgWrapper.append(
            $msgTitle,
            $msgText
        );

        return $msgWrapper;
    }
}

window.Cart_bruno = Cart_bruno;