    document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const bienvenida = document.getElementById('bienvenida');
    const rolUsuario = document.getElementById('rolUsuario');

    if (!usuario) {
        alert('No has iniciado sesión');
        window.location.href = 'login.html';
        return;
    }

    if (bienvenida) bienvenida.textContent = `Bienvenido, ${usuario.nombre}`;
    if (rolUsuario) rolUsuario.textContent = `Rol: ${usuario.rol}`;

    const pagina = window.location.pathname;

    // Protección por rol
    if (
        (pagina.includes('admin-dashboard') && usuario.rol !== 'administrador') ||
        (pagina.includes('trabajador-dashboard') && usuario.rol !== 'trabajador') ||
        (pagina.includes('inspector-dashboard') && usuario.rol !== 'inspector')
    ) {
        alert('Acceso denegado');
        window.location.href = 'login.html';
        return;
    }

    // Mostrar secciones específicas
    mostrarContenidoPorRol(usuario.rol);
    });

    function mostrarContenidoPorRol(rol) {
    const secciones = document.querySelectorAll('[data-role]');

    secciones.forEach((seccion) => {
        const rolesPermitidos = seccion.getAttribute('data-role').split(',');
        if (rolesPermitidos.includes(rol)) {
        seccion.style.display = 'block';
        } else {
        seccion.style.display = 'none';
        }
    });
    }
