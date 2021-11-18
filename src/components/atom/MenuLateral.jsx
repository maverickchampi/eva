import React from "react";

const MenuLateral = () => {
  return (
    <header class="header" id="header">
      <div class="header__toggle" id="header-icon">
        <i class="bi bi-list" id="header-toggle"></i>
      </div>

      <div class="navbar" id="nav-bar">
        <nav class="nav">
          <div>
            <a class="nav__logo" routerLink="/dashboard">
              <i class="bi bi-basket nav__logo-icon"></i>
              <span class="nav__logo-nombre">ConsumeYa</span>
            </a>

            <div class="nav__list">
              <a class="nav__link" routerLinkActive="active">
                <i class="bi {{item.icon}} nav__icon"></i>
                <span class="nav__nombre">a</span>
              </a>
            </div>
          </div>

          <a class="nav__link">
            <i class="bi bi-box-arrow-left nav__icon"></i>
            <span class="nav__nombre">Cerrar sesión</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default MenuLateral;
