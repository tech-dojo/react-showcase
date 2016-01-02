let $ = require('jquery');
let {get, post, del, put} = require("./../RestHelper.js");

module.exports = {
  login(email, pass, cb) {
      cb = arguments[arguments.length - 1];
      var token = (typeof window !== "undefined") ? localStorage.token : undefined;
      if (token) {
        if (cb) cb(true)
        this.onChange(true)
        return
      }
      post('/auth/signin', {email: email, password: pass})
        .then((data) => {
          localStorage.token = Math.random().toString(36).substring(7);
          if (cb) cb(true)
          this.onChange(true)
        })
        .catch((err) => {
          if (cb) cb(false)
          this.onChange(false)
        });
    },

    getToken() {
      return (typeof window !== "undefined") ? localStorage.token : undefined;
    },

    logout(cb) {
      get('/auth/signout')
        .then((g) => {
          delete localStorage.token
          if (cb) cb()
          this.onChange(false)
        }).catch((err) => {
          console.log(err);
        });
    },

    loggedIn() {
      return !!((typeof window !== "undefined") ? localStorage.token : undefined)
    },

    onChange() {}
}
