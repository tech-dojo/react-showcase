let mongoose = require('mongoose');
let ShowPiece = require('./models/ShowPiece.js');
var User = require('./models/User.js');

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

var user = {
    email: 'test@tech-dojo.org',
    password: 'abcd5678',
    provider: 'local'
};
user = new User(user);
user.save();
