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
    
    // PÁGINA INDEX
    if (document.body.classList.contains('index')) {

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
    }

    // PÁGINA DE CADASTRO
    if (document.body.classList.contains('cadastro')) {
        function cadastrar() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const password = document.getElementById('password').value;
            const passwordconf = document.getElementById('passwordconf').value;

            if(name === "" || email === "" || telefone === "" || password === "" || passwordconf === "") {
                document.getElementById('warning-fields').classList.remove('d-none');
                document.getElementById('warning-passwordconf').classList.add('d-none');
            } else if(password !== passwordconf) {
                document.getElementById('warning-fields').classList.add('d-none');
                document.getElementById('warning-passwordconf').classList.remove('d-none');
            } else {
                // Esconde os avisos
                document.getElementById('warning-fields').classList.add('d-none');
                document.getElementById('warning-passwordconf').classList.add('d-none');

                // Envia os dados para o backend
                fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        name: name, 
                        email: email, 
                        telefone: telefone,
                        password: password
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if(data.message && data.message.includes("cadastrado")) {
                        document.getElementById('warning-success').classList.remove('d-none');
                        alert("Cadastro realizado com sucesso!");
                        window.location.href = '../index.html';
                    } else {
                        alert("Erro ao cadastrar: " + (data.message || data.mensagem || "Tente novamente"));
                    }
                })
                .catch(error => {
                    console.error("Erro na requisição:", error);
                    alert("Erro de conexão com o servidor.");
                })
            }
        }

        document.getElementById('btnCadastrar').addEventListener('click', cadastrar);
        document.getElementById('passwordconf').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                cadastrar();
            }
        });
    }

    // PÁGINA HOME
    if(document.body.classList.contains('home')) {
        checkAuthentication();

        const userName = localStorage.getItem('userName');
        document.getElementById('welcomeMessage').innerText = `Olá, ${userName}`;

        setupLogoutButton();
    }

    // PÁGINA DASHBOARD
    if(document.body.classList.contains('dashboard')) {
        checkAuthentication();

        setupLogoutButton();
    }

    // PÁGINA CLIENTES
    if(document.body.classList.contains('clientes')) {
        checkAuthentication();

        setupLogoutButton();

        const modalCadastroCliente = document.getElementById('modalCadastroCliente');

        modalCadastroCliente.addEventListener('hidden.bs.modal', function () {
            modalCadastroCliente.querySelectorAll('input').forEach(input => input.value = '');
            document.getElementById('warning-fields').classList.add('d-none'); // Esconde alerta se aparecer
        });

        function cadastrarCliente() {
            const nomefantasia = document.getElementById('txtNomeFantasia').value;
            const cnpj = document.getElementById('txtCNPJCliente').value;
            const emailadmin = document.getElementById('txtEmailCliente').value;

            if(nomefantasia === ""|| cnpj === "" || emailadmin === "") {
                document.getElementById('warning-fields').classList.remove('d-none');
                console.log("Preencha todos os campos obrigatórios.");
            }

        }

        document.getElementById('btnCadastrarCliente').addEventListener('click', cadastrarCliente);
    }

    // PÁGINA USUÁRIOS
    if(document.body.classList.contains('usuarios')) {
        checkAuthentication();

        setupLogoutButton();
    }

    // PÁGINA ASSINATURAS
    if(document.body.classList.contains('assinatura')) {
        checkAuthentication();

        setupLogoutButton();
    }
});