window.execCart = function(cartName, options) {

    var isDataGetSuccess = false;

    var cartData = getParam('cartData', location.href);

    if(cartData !== null && cartData.split(',').length > 0 && cartData.split(',')[0] !== '') {
        var dataNames = cartData.split(',');
        getData(0);
    } else {
        console.log('商品データが設定されていません。');
        close();
    }

    function getData(current) {
        var url = '../../info/cartData/' + cartName + '/' + dataNames[current] + '.json';
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
        }).done((data) => {
            // new window.Cart_〇〇(data, options);
            new window['Cart_' + cartName](data, options);
            isDataGetSuccess = true;

            current++;
            if(current < dataNames.length) {
                getData(current);
            }

        }).fail(function() {
            var errorMsg = '「' + dataNames[current] + '」の商品データの取得に失敗しました。';
            console.log(errorMsg);
            current++;
            if(current < dataNames.length) {
                getData(current);
            } else {
                if(!isDataGetSuccess) {
                    close();
                }
            }
        });
    }

    function getParam(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function close() {
        $('body').empty();
    }
}