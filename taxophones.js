ymaps.ready(init);

function init() {
    var obj = json;  

    var nameArr = [];

    var myMap = new ymaps.Map('map', {
        center: [55.733835, 37.588227],
        zoom: 5,
        controls: []
    }, {
        searchControlProvider: 'yandex#search'
    });

    

    ymaps.modules.require('PieChartClusterer', function (PieChartClusterer) {
        var clusterer = new PieChartClusterer();// {margin: 10});

        var placemarks = [];

        var iconColor = {
            'Школа': '#87cefa',
            'Ул. Кабина': '#ff0000',
            'Гостиница': '#42aaff',
            'Больница': '#3b83bd',
            'Следственный изолятор': '#013220',
            'Вуз': '#ffc0cb',
            'Организация': '#ffa500',
            'Аэропорт': '#ff8c00',
            'Парк': '#008000',
            'Метро-улица': '#808000',
            'Метро-вистебюль': '#808000',
            'Метро-переход': '#808000',
            'Подземный переход': '#808000',
            'Метро': '#808000',
            'Вокзал-улица': '#808080',
            'Роддом': '#ffff00',
            'Театр': '#964b00',
            'Музыкальная школа': '#4169e1',
            'Жилой дом': '#00008b',
            'Общежитие': '#6600ff',
            'Спорт': '#f5d033',
            'Магазин': '#9400d3',
            'Рынок': '#9400d3',
            'Автовокзал': '#151719'
        }
        var str = '';

        for (var i = 0; i < obj.length; i ++) {
            if (obj[i].Cells.NAME == 'Ул.Кабина' || obj[i].Cells.NAME == 'Ул. кабина') {
                obj[i].Cells.NAME = 'Ул. Кабина';
            }
        }
        
        for (var i = 0; i < obj.length; i ++) {
            var mark = new ymaps.Placemark([Number(obj[i].Cells.Y.replace(',', '.')), Number(obj[i].Cells.X.replace(',', '.'))], {
                balloonContentHeader: 'Таксофон, ' + obj[i].Cells.NAME,
                balloonContentBody: obj[i].Cells.ADDRESS
            }, {
                iconColor: iconColor[obj[i].Cells.NAME] || 'lightBlue'
            });
            placemarks.push(mark);
            if (str.indexOf(obj[i].Cells.NAME) == -1) {
                nameArr.push(obj[i].Cells.NAME);
            }
            str += obj[i].Cells.NAME + ', ';
        }
        clusterer.add(placemarks);
        myMap.geoObjects.add(clusterer);
        var legend = document.getElementById('legend');
        var temp = 10;
        for (var i = 0; i < nameArr.length; i ++) {
            var newItem = document.createElement('div');
            var newColorItem = document.createElement('div');
            newItem.classList.add('text');
            newColorItem.classList.add('color');
            newItem.style.top += temp + 'px';
            newColorItem.style.top += temp + 'px';
            newItem.innerHTML = nameArr[i];
            newColorItem.style.backgroundColor = iconColor[nameArr[i]] || 'lightBlue';
            legend.appendChild(newItem);
            legend.appendChild(newColorItem);
            temp += 30;
        }
    });
}