const body = document.body,
  menuBar = document.querySelector('nav.menubar'),
  galeria = document.querySelector('.galeria'),
  imgs = galeria.querySelectorAll('img'),
  btnImgGrande = document.getElementById('btn-img-grande'),
  imgFondo = document.getElementById('img-fondo'),
  imgGrande = document.getElementById('img-grande'),
  imgCopete = document.getElementById('img-copete'),
  cerrar = document.getElementById('cerrar'),
  prev = document.getElementById('prev'),
  next = document.getElementById('next'),
  preload = document.querySelector('.precarga'),
  preloadIcon = document.querySelector('.precarga .icono-preload'),
  cargando = document.getElementById('cargando'),
  none = document.getElementById('none'),
  mostrarImg = (img) => {
    const src = img.src.replace('/thumbs', ''),
      copete = img.dataset.text
    imgFondo.classList.add('mostrar-img')
    imgGrande.setAttribute('src', src)
    imgGrande.setAttribute('data-index', img.dataset.index)
    imgCopete.innerHTML = copete
  },
  ocultarImg = () => {
    body.classList.remove('no-scroll-bar')
    imgFondo.classList.remove('mostrar-img')
  }
  imgPrev = () => {
    let i = parseInt(imgGrande.dataset.index)
    i--
    if (i === -1) {
      i = imgs.length -1
    }
    mostrarImg(imgs[i])
  },
  imgNext = () => {
    let i = parseInt(imgGrande.dataset.index)
    i++
    if (i === imgs.length) {
      i = 0
    }
    mostrarImg(imgs[i])
  }

imgs.forEach(img => img.addEventListener('click', () => mostrarImg(img))
);

window.addEventListener('load', () => {
  // Cambia el cargando a carga finalizada
  cargando.classList.remove('icono-preload')
  // Elimina las imgs
  body.removeChild(none)
  // Cartel de carga finalizada
  cargando.innerHTML = '¡Carga finalizada!';
  setTimeout(() => {
    // Sube el <div>
    preload.classList.toggle('seguir');
  }, 1000)
})

prev.addEventListener('click', () => imgPrev())

next.addEventListener('click', () => imgNext())

cerrar.addEventListener('click', () => {
  ocultarImg()
})

let c = 0
imgs.forEach(img => {
  img.setAttribute('data-index', c)
  c++
  var imgNone = document.createElement('img');
  imgNone.setAttribute('src', img.src.replace('/thumbs', ''));
  none.appendChild(imgNone);
});

document.addEventListener("keydown", () => {
  window.onkeydown = (event) => {
    if (event.keyCode == 27) {
      ocultarImg()
    } else if (event.keyCode == 39) {
      imgNext()
    } else if (event.keyCode == 37) {
      imgPrev()
    }
  }
})