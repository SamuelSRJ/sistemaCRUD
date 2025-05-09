document.addEventListener('DOMContentLoaded', function () {

    // FUNÇÕES GLOBAIS
    // Validação de token
    function checkAuthentication() {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '../index.html';
        }
    }

    // Configuração do botão de logout
    function setupLogoutButton() {
        const btnLogout = document.getElementById('btnLogout');
        if (btnLogout) {
            btnLogout.addEventListener('click', function() {
                localStorage.removeItem('token');
                localStorage.removeItem('userName');
                window.location.href = '../index.html';
            });
        }
    }

    checkAuthentication();

    setupLogoutButton();

});