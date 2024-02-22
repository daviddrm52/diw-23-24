//Component for the footer
export default {
    name: "footer-posts",
    template: `
    <footer style="background-color: #B4001D;">
        <div class="container">
            <div class="d-flex flex-wrap justify-content-between align-items-center py-3">
                <p class="col-md-4 mb-0 text-light">© 2023 AviaTalk.com</p>
                <a href="./index.html" id="indexLogoFooterLink" class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                    <img src="./img/base_logo.png" alt="AviaTalk.com" width="130px">
                </a>
                <ul class="nav col-md-4 justify-content-end">
                <li class="nav-item"><a href="./index.html" id="indexFooterLink" class="nav-link px-2 text-light">Home</a></li>
                <li class="nav-item"><a href="#" class="nav-link px-2 text-light">Latest Articles</a></li>
                <li class="nav-item"><a href="#" class="nav-link px-2 text-light">Comercial</a></li>
                <li class="nav-item"><a href="#" class="nav-link px-2 text-light">Airlines</a></li>
                <li class="nav-item"><a href="https://dingusland.biz/" class="nav-link px-2 text-light">About</a></li>
                </ul>
            </div>
        </div>
    </footer>
    `,
};