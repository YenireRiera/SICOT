document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const fabButton = document.getElementById("fabButton");
  const fabOptions = document.getElementById("fabOptions");
  const formLogin = document.getElementById('form-login');
  const mensajeDiv = document.getElementById('mensaje-login');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      nav.classList.toggle('nav-visible');
    });
  }

  if (fabButton && fabOptions) {
    fabButton.addEventListener("click", function () {
      fabOptions.classList.toggle("show");
    });
  }

  if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
      e.preventDefault();

      const correo = document.getElementById('correo').value;
      const contrasena = document.getElementById('contrasena').value;

      try {
        const respuesta = await fetch('http://localhost:3000/api/usuarios/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ correo, contrasena })
        });

        const data = await respuesta.json();
        console.log("Respuesta del backend:", data);

        if (respuesta.ok) {
          localStorage.setItem('usuario', JSON.stringify({
            nombre: data.nombre,
            rol: data.rol
          }));

          if (data.rol === 'administrador') {
            window.location.href = 'admin-dashboard.html';
          } else if (data.rol === 'inspector') {
            window.location.href = 'inspector-dashboard.html';
          } else if (data.rol === 'trabajador') {
            window.location.href = 'trabajador-dashboard.html';
          } else {
            window.location.href = 'usuario-dashboard.html';
          }
        } else {
          mensajeDiv.textContent = data.error || 'Error al iniciar sesión';
        }
      } catch (error) {
        console.error('Error al conectar con el backend:', error);
        mensajeDiv.textContent = 'Error del servidor. Intenta más tarde.';
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-registro');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const contrasena = document.getElementById('contrasena').value;
        const rol = document.getElementById('rol').value;

        if (!nombre || !correo || !contrasena || !rol) {
            alert('Por favor completa todos los campos');
            return;
        }

        const datos = { nombre, correo, contrasena, rol };

        try {
            const response = await fetch('http://localhost:3000/api/usuarios/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            const resultado = await response.json();

            if (response.ok) {
                // Guarda los datos del usuario localmente
                localStorage.setItem('usuario', JSON.stringify({ nombre, rol }));

                // Redirige automáticamente según el rol
                if (rol === 'administrador') {
                    window.location.href = 'admin-dashboard.html';
                } else if (rol === 'inspector') {
                    window.location.href = 'inspector-dashboard.html';
                } else if (rol === 'trabajador') {
                    window.location.href = 'trabajador-dashboard.html';
                } else {
                    window.location.href = 'usuario-dashboard.html';
                }
            } else {
                alert(resultado.error || 'Error al registrar');
            }
        } catch (error) {
            console.error('Error al conectar con el backend:', error);
            alert('Ocurrió un error al intentar registrar el usuario');
        }
    });
});

