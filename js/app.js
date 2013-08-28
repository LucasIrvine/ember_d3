
/*---------APP--------*/
/*--------------------*/
App = Ember.Application.create({
  ready: function() {}
});


/*-------ROUTES-------*/
/*--------------------*/
App.Router.map(function() {
    this.resource('socialIdx');
    this.resource('brandMetrics');
});

App.SocialIdxRoute = Ember.Route.extend({
    model: function(){
        return App.TableData.grabData();
    }
});


/*------JSON DATA-----*/
/*--------------------*/
App.TableData = Ember.Object.extend();

App.TableData.reopenClass({
    grabData : function(){
        var socialIndexObj = [];
        $.getJSON('data/socialindex-example.json').then(function(response) {
            response.results.forEach(function(child) {
                socialIndexObj.pushObject(child);
            });
        });
        return socialIndexObj;
    }
});


/*-----CONTROLLERS----*/
/*--------------------*/
App.SocialIdxController = Ember.ArrayController.extend({
    pushSort : function(attribute){
        if(this.get('sortProperties.firstObject') == attribute){
            this.toggleProperty('sortAscending');
        }else{
            this.set('sortProperties', [attribute]);
            this.set('sortAscending', true);
        }
    }
});

App.chartValuesController = Ember.ArrayController.create({
    content: [ { "date": "2013-07-04", "Acura": 180, "Audi": 876, "BMW": 1388, "Adele": 2416, "Dunkin' Donuts": 494 }, { "date": "2013-07-05", "Acura": 64, "Audi": 270, "BMW": 564, "Adele": 158, "Dunkin' Donuts": 16 }, { "date": "2013-07-06", "Acura": 36, "Audi": 170, "BMW": 628, "Adele": 828, "Dunkin' Donuts": 152 }, { "date": "2013-07-07", "Acura": 178, "Audi": 838, "BMW": 762, "Adele": 1724, "Dunkin' Donuts": 460 }, { "date": "2013-07-08", "Acura": 286, "Audi": 916, "BMW": 1278, "Adele": 2510, "Dunkin' Donuts": 526 }, { "date": "2013-07-09", "Acura": 266, "Audi": 886, "BMW": 1926, "Adele": 2650, "Dunkin' Donuts": 830 }, { "date": "2013-07-10", "Acura": 200, "Audi": 798, "BMW": 2012, "Adele": 2690, "Dunkin' Donuts": 304 }, { "date": "2013-07-11", "Acura": 230, "Audi": 962, "BMW": 1762, "Adele": 2436, "Dunkin' Donuts": 724 }, { "date": "2013-07-12", "Acura": 182, "Audi": 872, "BMW": 1372, "Adele": 2534, "Dunkin' Donuts": 632 }, { "date": "2013-07-13", "Acura": 202, "Audi": 572, "BMW": 1330, "Adele": 2492, "Dunkin' Donuts": 410 }, { "date": "2013-07-14", "Acura": 180, "Audi": 666, "BMW": 1326, "Adele": 3172, "Dunkin' Donuts": 396 }, { "date": "2013-07-15", "Acura": 302, "Audi": 726, "BMW": 1888, "Adele": 3322, "Dunkin' Donuts": 432 }, { "date": "2013-07-16", "Acura": 206, "Audi": 778, "BMW": 1804, "Adele": 2588, "Dunkin' Donuts": 818 }, { "date": "2013-07-17", "Acura": 328, "Audi": 1016, "BMW": 1914, "Adele": 2612, "Dunkin' Donuts": 530 }, { "date": "2013-07-18", "Acura": 392, "Audi": 710, "BMW": 1104, "Adele": 2594, "Dunkin' Donuts": 646 } ]
});


/*-----Handlebars Helpers----*/
/*---------------------------*/
Ember.Handlebars.registerBoundHelper('rounder', function(rounder){
    return Math.round(rounder);
});

Ember.Handlebars.registerBoundHelper('sentiFormat', function(sentiFormat){
    sentiNumber = sentiFormat * 100;
    return Math.round(sentiNumber);
});

Ember.Handlebars.helper('posGraph', function(value, options) {
  var escaped = Handlebars.Utils.escapeExpression(value);
  return new Handlebars.SafeString('<div class="posSenti" style="width: '+ Math.round((escaped * 100)) +'%;"></div>');
});
Ember.Handlebars.helper('negGraph', function(value, options) {
  var escaped = Handlebars.Utils.escapeExpression(value);
  return new Handlebars.SafeString('<div class="negSenti" style="width: '+ Math.round((escaped * 100)) +'%;"></div>');
});



/*-----------VIEWS-----------*/
/*---------------------------*/
App.BrandMetricsView = Ember.View.extend({
    templateName: 'brandMetrics'
    ,chartValuesBinding: 'App.chartValuesController.content'

});
App.BrandMetricsController = Ember.Controller.extend();


