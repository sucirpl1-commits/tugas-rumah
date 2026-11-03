const btnTema = document.querySelector('#btnToggleTema');
const bodyHalaman = document.querySelector('body');
btnTema.addEventListener('click', function() {
  bodyHalaman.classList.toggle('light-mode');
  if (bodyHalaman.classList.contains('light-mode')) {
    btnTema.textContent = '☀️ Mode Terang';
  } else {
    btnTema.textContent = '🌙 Mode Gelap';
  }
});