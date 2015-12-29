let $ = require('jquery');

module.exports = {
  login(email, pass, history, cb) {
    cb = arguments[arguments.length - 1];
    var token = (typeof window !== "undefined")? localStorage.token : undefined;
    if (token) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    signIn('/auth/signin', email, pass)
      .then((g)=>{
        localStorage.token = Math.random().toString(36).substring(7);
        if (cb) cb(true)
        this.onChange(true)
        history.pushState(null, '/');
    })
    .catch((err)=>{
      if (cb) cb(false)
        this.onChange(false)

    });
  },

  getToken() {
    return (typeof window !== "undefined")? localStorage.token : undefined;
  },

  logout(cb) {
    signOut('/auth/signout')
      .then((g)=>{
          delete localStorage.token
          if (cb) cb()
          this.onChange(false)
    }).catch((err)=>{
      console.log(err);
    });
  },

  loggedIn() {
    return !!((typeof window !== "undefined")? localStorage.token : undefined)
  },

  onChange() {}
}

function signIn(url, email, pass) {
  var data = {email: email, password: pass};
  return new Promise(function(success,error){
      $.ajax({
        url,
        type:'POST',
        data,
        success,
        error
      })
    })
}
function signOut(url) {
      return new Promise(function(success,error){
        $.ajax({
          url:url,
          dataType:"json",
          success,
          error
        });
    });
}
