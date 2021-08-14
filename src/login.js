
export const loginWithEmail = (email, password) => {
  const auth = firebase.auth();
  return auth.signInWithEmailAndPassword(email, password)
};
export const googleRegister = () => {
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider)
};

//REGISTRO
export const emailUserRegister = (email, password) => {
  const auth = firebase.auth();
  return auth.createUserWithEmailAndPassword(email, password)
}
