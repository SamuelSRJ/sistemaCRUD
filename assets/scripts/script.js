document.addEventListener('DOMContentLoaded', function () {
    if (document.body.classList.contains('index')) {

        function efetuarLogin() {
            if(document.getElementById('email').value == "" || document.getElementById('password').value == "") {
                alert('Preencha todos os campos!');
            } else if(document.getElementById('email').value === 'admin' && document.getElementById('password').value === 'coxinha12') {
                window.location.href = '../pages/home.html';
            } else {
                // alert('Usuário ou senha inválidos');
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
});