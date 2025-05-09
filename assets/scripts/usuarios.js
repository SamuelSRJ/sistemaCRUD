document.addEventListener('DOMContentLoaded', function () {

    // === LOAD DE USUÁRIOS ===
    // async function carregarUsuarios() {
    //     try {
    //         const response = await fetch('http://localhost:3000/api/clientes');
    //         const usuarios = await response.json();
    //         const tabela = document.getElementById('listaUsuarios');
    //         tabela.innerHTML = ''; // Limpa qualquer conteúdo anterio
    //         usuarios.forEach(usuario => {
    //             const linha = document.createElement('tr')
    //             linha.innerHTML = `
    //                 <td>${usuario.id}</td>
    //                 <td>${usuario.nome}</td>
    //                 <td>${usuario.email}</td>
    //                 <td>${usuario.empresa}</td>
    //                 <td>
    //                     <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#modalDetalheCliente">
    //                         <i class="fas fa-circle-info"></i>
    //                     </buttton>
    //                 </td>        
    //             `;
    //             tabela.appendChild(linha);
    //             carregarUsuarios();
    //         });
    //     } catch (error) {
    //         console.error('Erro ao carregar usuários: ', error);
    //     }
    // }

    // // Chama a função quando a página for carregada
    // carregarUsuarios();

});