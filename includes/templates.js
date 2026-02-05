class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header>
                <nav>
                    <a href="/" class="logo"> <!-- change index.html par la page d'accueil -->
                        <img src="./ressources/ENM Logo.png" alt="ENM-Lab" class="logo-img">
                    </a>
                    
                    <ul class="nav-links">
                        <li><a href="/">Accueil</a></li>
                        <li><a href="mode-operatoire.html">Mode opératoire</a></li> <!-- adapte les liens selon tes pages -->
                        <li><a href="realisation.html">Réalisations</a></li>
                        <li><a href="#form-cta">Contact</a></li>
                        <li>
                            <button id="theme-toggle" aria-label="Changer de thème">
                                <span class="theme-icon">☀️</span>
                            </button>
                        </li>
                    </ul>

                    <div class="menu-toggle">☰</div>
                </nav>
            </header> 
        `;
        
        // Déclenche un événement personnalisé une fois le header chargé
        this.dispatchEvent(new CustomEvent('header-loaded', { bubbles: true }));
    }
}
customElements.define('site-header', SiteHeader);

class SiteFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <p>© 2026 ENM-Lab. Tous droits réservés.</p>
                <ul>
                    <li><a href="#">Mentions légales</a></li>
                    <li><a href="#">Politique de confidentialité</a></li>
                </ul>
            </footer>
        `;
    }
}
customElements.define('site-footer', SiteFooter);