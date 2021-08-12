import {createLogin, createSignup, createMuro} from './logingroup.js';
import {crearUsuarioFb} from './firebase.js';
import {showAuthUsers} from './authuser.js';
import {cerrarSesion} from './logout.js';
import {validarRegistro, camposLlenos, campos} from './validaciones.js';

//ENROUTAMIENTO codigo bonito


//RUTA SIN #
/*const changeRoute = (hash) => {
  if (hash === '#login'){
    window.location.hash = '/login';
  } else if (hash === '#signup'){
    window.location.hash = 'signup';
  } else if (hash === '#muro'){
    window.location.hash = 'muro';
  }
};*/


// crear la funcion mostrar seccion - esto si funciona
const showSeccion = (ruta) => {
  const secciones = document.querySelector('#secciones');
  secciones.innerHTML = '';
  switch (ruta) {
    case '#login': { return secciones.innerHTML = createLogin,mostrarContraseña(), botonLogin(), gogleaRegistro(), console.log("hola estoy en login");}
    case '#signup': { return secciones.innerHTML = createSignup, funcionesRegitro(), botonCancelarRegistro(), validarRegistro(), console.log("hola estoy en regsitro"); }
    case '#muro': { return secciones.innerHTML = createMuro, showAuthUsers(), cerrarSesion(), console.log("hola estoy en muro"); }
    case '': { return secciones.innerHTML = createLogin, mostrarContraseña(), botonLogin(), gogleaRegistro(), console.log("hola estoy en muro"); }
    case '/': { return secciones.innerHTML = createLogin, mostrarContraseña(), botonLogin(), gogleaRegistro(), console.log("hola estoy en login"); }

  default: {return secciones.innerHTML = `estoy en otro lado 404`}
  }
};
/// fin

// si el usuario esta logeado 
const userLoggedIn = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      showSeccion(window.location.hash);
    } else {
      window.location.hash = 'login';    
    }
  });
  window.addEventListener('hashchange', () => showSeccion(window.location.hash));
};
// función que muestra la vista al momento de recargar
window.addEventListener('load', userLoggedIn);
// fin


// funcion mostrar contraseña
const mostrarContraseña = () => {
  const showPassword = document.querySelector('#show-password');
  showPassword.addEventListener('change', () => {
    const password1 = document.querySelector('#login-password');
      if ( password1.type === "text" ) {
          password1.type = "password"
      } else {
          password1.type = "text"
      }
  });
}

// otra funcion?
const funcionesRegitro = () =>{
  const signupForm = document.querySelector("#signup-form"); // todo el formulario
  const botonForm = document.querySelector("#submit-button"); // boton "sign up"
  botonForm.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("registrandote"); // si funciona al hacer click
    const signupEmail = document.querySelector("#signup-email").value;
    const signupPassword = document.querySelector("#signup-password").value;
    const usernameInput = document.querySelector("#username").value;
    const fullnameInput = document.querySelector("#fullname").value;
    const passwordInput = document.querySelector('#signup-password').value;
    const emailInput = document.querySelector('#signup-email').value;
    crearUsuarioFb(signupEmail, signupPassword, usernameInput, fullnameInput, passwordInput, emailInput); // funcion de crear usuarios
    
    /*camposLlenos(campos); // funcion si los campos estan llenos
    if (camposLlenos(campos)) {*/
      signupForm.reset();
      console.log("me resetea el formulario")
      window.location.hash = 'login';
      showSeccion();
      console.log("me regresa al login")
   /* };*/
    console.log('cambiar pantalla');
  });
}

// boton "cancel"
const botonCancelarRegistro = () => {
  const cancelButton = document.querySelector('#cancelButton');
  cancelButton.addEventListener('click', () => {
  window.location.hash = 'login';
    //showSeccion();
  });
}

// evento al hacer click al boton "login"
const botonLogin = () => {
  const loginButon = document.querySelector('#login-button');
  const loginForm = document.querySelector('#login-form')
  loginButon.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("logueandote");
      const loginEmail = document.querySelector("#login-email").value;
      const loginPassword = document.querySelector("#login-password").value;
      console.log(loginEmail, loginPassword);
    
      auth
        .signInWithEmailAndPassword(loginEmail, loginPassword)
        .then((userCredential) => {
          console.log("logueado");
          loginForm.reset();
          console.log("resea el formulario")
          window.location.hash = 'muro';
          showSeccion();
          console.log("ruta del muro")
        }) // fin then
        .catch((err) => {
          const wrongLoginPassword = document.querySelector('#wrongpassword');
          const wrongLoginEmail = document.querySelector('#wrongemail');
          if (err.message == 'The password is invalid or the user does not have a password.'){
            wrongLoginPassword.innerHTML = 'La contraseña es incorrecta';
            wrongLoginPassword.style.color = 'red'
          }
          if (err.message == 'There is no user record corresponding to this identifier. The user may have been deleted.'){
            wrongLoginEmail.innerHTML = 'Este correo no es valido, por favor corrigelo';
            wrongLoginEmail.style.color = 'red'
          }
        }) //Termina login con firebase
    }); // fin del evento
}

// Logearse con google
const gogleaRegistro = () => {
  const googleButton = document.querySelector("#google-login");
  googleButton.addEventListener("click", (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log("te logueaste con google");
        window.location.hash = 'muro';
        showSeccion();
        console.log(" logeado con google me direcciona al muro")
      })
      .catch((err) => {
        console.log(err);
      })
    //Termina login google con firebase
  });
  }

//FLECHAS DE ATRAS Y ADELANTE ------> SI FUNCIONA!
window.addEventListener('popstate', (event) => {
  console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
  console.log('POPOPOPOPOP');
  if(window.location.pathname === 'login'){
    secciones.innerHTML = createLogin;
    console.log(' LOGIN')
  } else if (window.location.pathname === 'signup'){
    secciones.innerHTML = createSignup;
    console.log(' REGISTRO')
  }  
});
