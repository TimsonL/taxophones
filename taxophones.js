ymaps.ready(init);

function init() {
    var obj = json;  

    var myMap = new ymaps.Map('map', {
        center: [55.733835, 37.588227],
        zoom: 5
    }, {
        searchControlProvider: 'yandex#search'
    });
    
    ymaps.modules.require(['PieChartClusterer'], function (PieChartClusterer) {
        var clusterer = new PieChartClusterer();// {margin: 10});

        var placemarks = [];

        for (var i = 0; i < obj.length; i++) {
            var mark = new ymaps.Placemark([Number(obj[i].Cells.Y.replace(',', '.')), Number(obj[i].Cells.X.replace(',', '.'))], {
                balloonContentHeader: 'Таксофон, ' + obj[i].Cells.NAME,
                balloonContentBody: obj[i].Cells.ADDRESS,
            }, {
                preset: getIconColor(obj[i].Cells.NAME),
            });
            placemarks.push(mark);
        }
        clusterer.add(placemarks);
        myMap.geoObjects.add(clusterer);
    });

    function getIconColor (subject) {
        if (subject == 'Школа') {
            return 'islands#lightBlueIcon';
        } else if (subject == 'Ул.Кабина') {
            return 'islands#redIcon';
        } else if (subject == 'Гостиница') {
            return 'islands#blueIcon';
        } else if (subject == 'Больница') {
            return 'islands#darkBlueIcon';
        } else if (subject == 'Следственный изолятор') {
            return 'islands#darkGreenIcon';
        } else if (subject == 'Вуз') {
            return 'islands#pinkIcon';
        } else if (subject == 'Организация') {
            return 'islands#orangeIcon';
        } else if (subject == 'Аэропорт') {
            return 'islands#darkOrangeIcon';
        } else if (subject == 'Парк') {
            return 'islands#greenIcon';
        } else {
            return 'islands#oliveIcon'
        }
    }
}