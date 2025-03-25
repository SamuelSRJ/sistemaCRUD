document.addEventListener('DOMContentLoaded', function () {
    // PÁGINA INDEX
    if (document.body.classList.contains('index')) {

        function efetuarLogin() {
            if(document.getElementById('email').value == "" || document.getElementById('password').value == "") {
                document.getElementById('warning-message').classList.remove('d-none');
                document.getElementById('error-message').classList.add('d-none');
            } else if(document.getElementById('email').value === 'admin' && document.getElementById('password').value === 'admin') {
                window.location.href = '../pages/home.html';
            } else {
                // alert('Usuário ou senha inválidos');
                document.getElementById('warning-message').classList.add('d-none');
                document.getElementById('error-message').classList.remove('d-none');
                document.getElementById('email').value = "";
                document.getElementById('password').value = "";
                document.getElementById('email').focus();
            }
        }

        document.getElementById('btnLogin').addEventListener('click', efetuarLogin)
        document.getElementById('password').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                efetuarLogin();
            }
        });
    }

    // PÁGINA DE CADASTRO
    if (document.body.classList.contains('cadastro')) {
        
    }

    // PÁGINA HOME
    if(document.body.classList.contains('home')) {
        
    }
});