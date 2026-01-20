const btnBajar = document.getElementById('btn-bajar');
const seccionProyectos = document.getElementById('proyectos');
const btnShowMenu = document.getElementById('btn-menu');

// Scroll suave hacia la sección de proyectos
btnBajar.addEventListener('click', () => {
	seccionProyectos.scrollIntoView({ behavior: 'smooth' });
});

// Toggle del menú móvil
btnShowMenu.addEventListener('click', () => {
	document.body.classList.toggle('menu-open');
});

// Asegurar que el menú se muestre en desktop al redimensionar
window.addEventListener('resize', () => {
	if(window.innerWidth > 1250) {
		document.body.classList.remove('menu-open');
	}
});
