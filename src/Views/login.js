import { LoginController } from '../Controllers/login';

export function LoginView() {
  const view = document.createElement('div');
  view.className = 'login-container d-flex align-items-center justify-content-center vh-100';

  // Login form
  view.innerHTML = `
    <div class="login-card card shadow-lg" style="width: 350px;">
      <div class="card-header bg-primary text-white text-center">
        <h3>Connexion</h3>
      </div>
      <div class="card-body">
        <form id="login-form">
          <div class="mb-3">
            <label for="username" class="form-label">Nom d'utilisateur</label>
            <div class="input-group">
              <span class="input-group-text"><i class="fas fa-user"></i></span>
              <input 
                type="text" 
                class="form-control" 
                id="username" 
                placeholder="Entrez votre nom d'utilisateur" 
                required
              >
            </div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Mot de passe</label>
            <div class="input-group">
              <span class="input-group-text"><i class="fas fa-lock"></i></span>
              <input 
                type="password" 
                class="form-control" 
                id="password" 
                placeholder="Entrez votre mot de passe" 
                required
              >
            </div>
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="remember-me">
            <label class="form-check-label" for="remember-me">Se souvenir de moi</label>
          </div>
          <div id="login-error" class="alert alert-danger d-none" role="alert">
            Identifiants incorrects. Veuillez réessayer.
          </div>
          <button type="submit" class="btn btn-primary w-100">
            Se connecter
          </button>
        </form>
      </div>
      <div class="card-footer text-center">
        <a href="#" id="forgot-password" class="text-muted">Mot de passe oublié ?</a>
      </div>
    </div>
  `;

  // Initialisation du contrôleur
  const controller = new LoginController();

  // Ajout des écouteurs d'événements
  function addEventListeners() {
    const loginForm = view.querySelector('#login-form');
    const errorMessage = view.querySelector('#login-error');
    const forgotPasswordLink = view.querySelector('#forgot-password');

    // Écouteur pour la soumission du formulaire de connexion
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = view.querySelector('#username').value;
      const password = view.querySelector('#password').value;
      const rememberMe = view.querySelector('#remember-me').checked;

      try {
        const result = await controller.login(username, password, rememberMe);

        if (result.success) {
          // Masquer le message d'erreur s'il était visible
          errorMessage.classList.add('d-none');

          // Redirection ou mise à jour de l'interface
          controller.navigateToDashboard();
        } else {
          // Afficher le message d'erreur
          errorMessage.classList.remove('d-none');
        }
      } catch (error) {
        errorMessage.classList.remove('d-none');
      }
    });

    // Écouteur pour le mot de passe oublié
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      controller.showForgotPasswordModal();
    });
  }

  // Initialisation
  setTimeout(() => {
    addEventListeners();
  }, 0);

  return view;
}
