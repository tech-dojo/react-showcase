let mongoose = require('mongoose');
let ShowPiece = require('./models/ShowPiece.js');

mongoose.connection.db.dropDatabase();

var initial = [
          {
            url: 'http://www.insurancetrak.com/sites/default/files/sites/default/files/images/ArtDealer2.jpg',
            title: 'Rain',
            artist: 'jill111',
            likes: 20,
            pending: false,
            contributor: 'Ari',
               medium: 'Oil on Canvas',
            
          },
          {
            url: 'http://feminspire.com/wp-content/uploads/2013/05/modern-art.jpg',
            title: 'RainAutumn',
            artist: 'pashminu',
            likes: 40,
            pending: false,
            contributor: 'eric',
              medium: 'Acrylic',
          },
//          {
//            url: 'https://s-media-cache-ak0.pinimg.com/736x/08/e2/41/08e2417b42e4c3b8c52addd40a22b0a1.jpg',
//            title: 'Swing',
//            artist: 'Danson67',
//            likes: 1000,
//            pending: false,
//            contributor: 'mary',
//          },
          {
            url: 'http://s9.favim.com/orig/130906/art-artistic-baw-black-and-white-Favim.com-901159.jpg',
            title: 'Reflection',
            artist: 'fancycrave1',
            likes: 900,
            pending: false,
            contributor: 'trek',
          },
          {
            url: 'http://www.commercialfineart.com/images/i.jpg',
            title: 'Fall',
            artist: 'Hans',
            likes: 89,
            pending: false,
            contributor: 'doctor',
          },
          {
            url: 'http://funguerilla.com/wp-content/uploads/2010/06/leonid-afremov202.jpg',
            title: 'Lina',
            artist: 'fancycravel',
            likes: 3,
            pending: false,
            contributor: 'Cookie',
          },
//          {
//            url: 'http://www.webdesigncore.com/wp-content/uploads/2011/04/abstractpaintings21.jpg',
//            title: 'Storm',
//            artist: 'jill111',
//            pending: false,
//            contributor: 'Sia',
//          },
          {
            url: 'http://public.media.smithsonianmag.com/legacy_blog/lascaux-cave-painting.jpg',
            title: 'Primal',
            artist: 'BkrmadtyaKarki',
            pending: false,
            contributor: "Ann",
          },
        ];

initial.forEach(function(piece){
	new ShowPiece(piece).save();
});
