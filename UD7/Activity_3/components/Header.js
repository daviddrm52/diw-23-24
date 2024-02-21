//Component for the header
export default {
    name: "header-posts",
    template: `
    <header>
        <nav class="navbar" style="background-color: #B4001D;">
            <div class="container">
                <a class="navbar-brand" id="indexLogoHeaderLink" href="./index.html">
                    <img src="./img/base_logo.png" alt="AviaTalk.com" width="130px">
                </a>
                <i class="d-flex">
                    <a href="#" class="text-dark"><button class="btn ms-1"><span class="material-symbols-outlined md-18 m-1" style="vertical-align: middle;">help</span>Help</button></a>
                    <a id="signInLink" href="./sign_in.html" class="text-dark"><button class="btn ms-1 bg-secondary"><span id="userIcon" class="material-symbols-outlined md-18 m-1" style="vertical-align: middle;">account_circle</span><img src="" width="30px" id="avatarImg"> <span id="loginButton">Sign in</span></button></a>
                </i>
            </div>
        </nav>
        <nav class="navbar navbar-expand-lg" style="background-color: #B4001D;">
            <div class="container">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="material-symbols-outlined">menu</span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active text-light" aria-current="page" id="indexHeaderLink" href="./index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-light" href="#">Latest articles</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Commercial
                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a class="dropdown-item" href="#">Airbus</a></li>
                            <li><a class="dropdown-item" href="#">Boeing</a></li>
                            <li><a class="dropdown-item" href="#">Bombardier</a></li>
                            <li><a class="dropdown-item" href="#">Embraer</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#">Other manufacters</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-light" href="#">Airlines</a>
                        </li>
                    </ul>
                    <form class="d-flex" role="search">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search in AviaTalk.com" aria-label="Search" aria-describedby="button-addon2">
                            <button class="btn" type="button" id="button-addon2"><span class="material-symbols-outlined md-18 m-1" style="vertical-align: middle;">search</span> Search</button>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    </header>
    `,
};