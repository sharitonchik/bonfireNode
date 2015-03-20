/**
 * Created by Nastushka on 22.11.2014.
 */

document.addEventListener('DOMContentLoaded',createMap,false);


function createMap(){

    ymaps.ready(init);



}

function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
    var myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [53.9, 27.56], // Минск
        zoom: 10
    });

    var myPlacemark = new ymaps.Placemark([53.9, 27.56]);
    myMap.geoObjects.add(myPlacemark);



}