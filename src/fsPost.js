export const showFsPost = () => {
    const publicaciones = document.querySelector('#allPost');
    //const logoutOption = document.querySelector('#logout-button');
    
    const setupPost = (data) => {
      if (data.length) {
        let html = '';
        data.forEach((doc) => {
          const post = doc.data();
          post.id = doc.id;
          // console.log(user)
          const div = `
                    <div class='postDiv'>
                      <h5>${post.tituloPost}</h5>
                      <p>${post.contenidoPost}</p>
                      <button class="btn-delete" data-id="${post.id}" >Eliminar</button>
                      <button class="btn-edit" data-id="${post.id}">Modificar</button>
                    </div>`;
          html += div;
        });
        publicaciones.innerHTML = html;
        // desde firebase elimina
        const deletePost = id => fs.collection('publicaciones').doc(id).delete();
        // boton eliminar
        const btnDelete = document.querySelectorAll('.btn-delete');
        btnDelete.forEach( btn => {
          btn.addEventListener( 'click', async (e) => {
            await deletePost(e.target.dataset.id)
            //window.location.hash = 'muro';
            window.location.reload();
          })
        })
        // ---
        // desde firebase se llama get
        const getPost = (id) => {
          fs.collection('publicaciones').doc(id).get().then((ele)=>{
            console.log(ele.data());
            if (ele.data()) {
              const user = ele.data();
              const costoInput = document.querySelector('#costoInput');
              const diasInput = document.querySelector('#diasInput');
              const nochesInput = document.querySelector('#nochesInput');
              const ninosInput = document.querySelector('#ninosInput');
              const personasInput = document.querySelector('#personasInput');
              const tituloPost = document.querySelector('#tituloPost');
              const contenidoPost = document.querySelector('#contenidoPost');
              const locacionInput = document.querySelector('#locacionInput');
          
              costoInput.value = user.costoInput;
              diasInput.value = user.diasInput;
              nochesInput.value = user.nochesInput;
              ninosInput.value = user.ninosInput;
              personasInput.value = user.personasInput;
              tituloPost.value = user.tituloPost;
              contenidoPost.value = user.contenidoPost;
              locacionInput.value = user.locacionInput;
            }
          }).catch((err) => {
            console.log(err);
          })
        };
        // boton editar
        const btnEdit = document.querySelectorAll('.btn-edit');
        btnEdit.forEach( btn => {
          btn.addEventListener( 'click', async (e) => {
            window.location.hash = '#newpost';
            await getPost(e.target.dataset.id);
          })
        })
        // ---
      }
    };
  
    const auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        const fs = firebase.firestore();
        fs.collection('publicaciones')
          .get()
          .then((snapshot) => {
            setupPost(snapshot.docs);
          });
      } else {
        setupPost([]);
      }
    });
  };
  
  //EDITAR POST
  export const editPost = (idPost, description) => {
    // Obtener acceso a Firestore
    const db = firebase.firestore();
    return db.collection('post').doc(idPost).update({
      description,
    });
  };