const section_header = `  <header class="cursor-light">
<nav
  class="navbar navbar-top-default navbar-expand-lg black bottom-nav nav-box-shadow no-animation"
>
  <div class="container-fluid">
    <a class="logo nav-link" href="index.html">
      <img src="source/img/Apurva-logo-final.png" alt="apurva.ai" title="apurva.ai" class="logo-img" />
    </a>
    <div class="collapse navbar-collapse d-none d-lg-block">
      <ul class="nav navbar-nav">
        <li class="nav-item">
          <a href="about-us.html" class="scroll nav-link apurva-about">About</a>
        </li>
        <li class="nav-item">
          <a href="Apurva-Library.html" class="scroll nav-link apurva-library">
          Apurva Library</a>
        </li>

        <li class="nav-item">
          <a
            link
            type="button"
            class="btn btn-medium btn-rounded btn-yellow hide contact-btn small"
            href="Apurva-Experience.html">
            Apurva Experience
          </a>
        </li>
      </ul>
    </div>

    <!-- side menu open button -->
    <a
      class="menu_bars d-inline-block menu-bars-setting animated-wrap sidemenu_toggle d-block d-lg-none"
    >
      <div class="menu-lines animated-element">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </a>
    <!-- Side Menu -->
  </div>
</nav>
<!-- Side Menu -->
<div class="side-menu">
  <div class="quarter-circle">
    <div class="menu_bars2 active" id="btn_sideNavClose">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
  <div class="inner-wrapper">
    <nav class="side-nav m-0">
      <ul class="navbar-nav flex-lg-row">
        <li class="nav-item">
          <a href="about-us.html" class="scroll nav-link apurva-about-mobile">About</a>
        </li>
        <li class="nav-item">
          <a href="Apurva-Library.html" class="scroll nav-link apurva-library-mobile"
            >Apurva Library</a>
        </li>
        <li class="nav-item">
          <a href="Apurva-Experience.html" class="scroll nav-link apurva-experience-mobile"
            >Apurva Experience</a>
        </li>
        
      </ul>
    </nav>
  </div>
</div>
<a id="close_side_menu" href="javascript:void(0);"></a>
<!--Side Menu-->
</header>`;

document.getElementById("headers").innerHTML = section_header;
