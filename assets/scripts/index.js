document.addEventListener('DOMContentLoaded', function () {

	function efetuarLogin() {
        if(document.getElementById('email').value == "" || document.getElementById('password').value == "") {
            document.getElementById('warning-message').classList.remove('d-none');
            document.getElementById('error-message').classList.add('d-none');
        } else {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            .then(response => {
                console.log("Status da resposta:", response.status);
                return response.json();
            })
            .then(data => {
                console.log("Resposta da API:", data);
            
                if(data.success) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userName', data.name);
                    window.location.href = '/pages/home.html';
                } else {
                    console.error("Erro de autenticação:", data.erro);
                    document.getElementById('warning-message').classList.add('d-none');
                    document.getElementById('error-message').classList.remove('d-none');
                    document.getElementById('username').value = "";
                    document.getElementById('password').value = "";
                    document.getElementById('username').focus();
                }
            })
            .catch(error => {
                console.error('Erro ao fazer login:', error);
            });
        }
    }

    document.getElementById('btnLogin').addEventListener('click', efetuarLogin)
    document.getElementById('password').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            efetuarLogin();
        }
    });

});