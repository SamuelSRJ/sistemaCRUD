document.addEventListener('DOMContentLoaded', function () {

    const modalCadastroCliente = document.getElementById('modalCadastroCliente');

    modalCadastroCliente.addEventListener('hidden.bs.modal', function () {
        modalCadastroCliente.querySelectorAll('input').forEach(input => input.value = '');
        document.getElementById('warning-fields').classList.add('d-none'); // Esconde alerta se aparecer
    });

    // === CADASTRO DE CLIENTES ===
    function cadastrarCliente() {
        const nomefantasia = document.getElementById('txtNomeFantasia').value;
        const cnpj = document.getElementById('txtCNPJCliente').value;
        const emailadmin = document.getElementById('txtEmailCliente').value;
        if(nomefantasia === ""|| cnpj === "" || emailadmin === "") {
            document.getElementById('warning-fields').classList.remove('d-none');
            console.log("Preencha todos os campos obrigatórios.");
        } else {
            // Esconde os avisos
            document.getElementById('warning-fields').classList.add('d-none');
            // Envia os dados para o backend
            fetch('http://localhost:3000/api/cadastrocliente', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nomefantasia: nomefantasia,
                    cnpj: cnpj,
                    email: emailadmin
                })
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    // alert("Cadastro realizado com sucesso!");
                    console.log("Cadastro realizado com sucesso!");
                    const bootstrapModal = bootstrap.Modal.getInstance(modalCadastroCliente);
                    bootstrapModal.hide();
                } else {
                    console.error("Erro ao cadastrar cliente:", data.message || data.message);
                }
            })
            .catch(error => {
                console.error("Erro na requisição:", error);
            })
        }
    }

    document.getElementById('btnCadastrarCliente').addEventListener('click', cadastrarCliente);

    // === LOAD DE CLIENTES ===
    async function carregarClientes() {
        try {
            const response = await fetch('http://localhost:3000/api/clientes');
            const clientes = await response.json();
            const tabela = document.getElementById('listaClientes');
            tabela.innerHTML = ''; // Limpa qualquer conteúdo anterio
            clientes.forEach(cliente => {
                const linha = document.createElement('tr')
                const statusBadge = cliente.status === 'Ativo'
                    ? '<span class="badge bg-success">Ativo</span>'
                    : cliente.status === 'Inativo'
                        ? '<span class="badge bg-danger">Inativo</span>'
                        : '<span class="badge bg-primary"> Aguardando ativação</span>'
                linha.innerHTML = `
                    <td>${cliente.id}</td>
                    <td>${cliente.nome_fantasia}</td>
                    <td>${cliente.cnpj}</td>
                    <td>${cliente.telefone}</td>
                    <td class="justify-content-center">${statusBadge}</td>
                    <td>
                        <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#modalDetalheCliente">
                            <i class="fas fa-circle-info"></i>
                        </buttton>
                    </td>        
                `;
                tabela.appendChild(linha);
                carregarClientes();
            });
        } catch (error) {
            console.error('Erro ao carregar clientes: ', error);
        }
    }

    // Chama a função quando a página for carregada
    carregarClientes();
});