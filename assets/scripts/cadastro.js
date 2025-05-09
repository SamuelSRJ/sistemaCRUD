document.addEventListener('DOMContentLoaded', function () {

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

});