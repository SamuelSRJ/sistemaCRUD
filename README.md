# Sistema CRUD - IFTRUE
![logohome](https://github.com/user-attachments/assets/86bed189-97b0-4605-84ae-26dcd7a2409d)

Sistema web completo para gestão de usuários, clientes e assinaturas, desenvolvido como projeto de estudo e portfólio.

## 📚 Descrição

O **Sistema CRUD Iftrue** é uma aplicação fullstack que permite o cadastro, autenticação e gerenciamento de usuários, clientes e assinaturas. O sistema possui autenticação JWT, integração com banco de dados MySQL, interface responsiva e segue boas práticas de desenvolvimento web.

## 🚀 Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3 (Bootstrap), JavaScript
- **Backend:** Node.js, Express.js
- **Banco de Dados:** MySQL
- **Autenticação:** JWT
- **Outros:** bcrypt, dotenv, cors

## 📂 Estrutura do Projeto

```
├── index.html
├── package.json
├── .gitignore
├── assets/
│   ├── images/
│   ├── scripts/
│   └── styles/
├── backend/
│   ├── app.js
│   ├── .env
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   └── routes/
└── pages/
    ├── assinatura.html
    ├── cadastro.html
    ├── clientes.html
    ├── dashboard.html
    ├── home.html
    └── usuarios.html
```

## ⚙️ Como Executar

### 1. Clone o repositório

```sh
git clone https://github.com/SamuelSRJ/sistemaCRUD.git
cd sistemaCRUD
```

### 2. Instale as dependências do backend

```sh
cd backend
npm install
```

### 3. Configure o banco de dados

- Crie um banco MySQL e configure as variáveis no arquivo `.env`:

```
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=nome_do_banco
JWT_SECRET=sua_chave_secreta
```

- Crie as tabelas `usuarios` e `clientes` conforme os campos utilizados no código.

### 4. Inicie o backend

```sh
node app.js
```

O backend estará disponível em `http://localhost:3000`.

### 5. Execute o frontend

Abra o arquivo `index.html` no navegador ou utilize uma extensão de servidor local (ex: Live Server no VSCode).

## 🛠️ Funcionalidades

- **Login:** Autenticação de usuários com JWT.
- **Cadastro de Usuário:** Registro de novos usuários.
- **Gestão de Clientes:** Cadastro, listagem e visualização de clientes.
- **Gestão de Assinaturas:** Cadastro e listagem de assinaturas.
- **Dashboard:** Visualização de métricas (em desenvolvimento).
- **Logout:** Encerramento seguro da sessão.

## 📸 Screenshots

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/669f76ee-c8e3-48bc-b625-9661f846523f" width="400" alt="Tela 1"/></td>
    <td><img src="https://github.com/user-attachments/assets/685744f4-d5e9-4885-ad9b-508399a18b05" width="400" alt="Tela 2"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/f446948f-de99-40e8-a064-569047434a95" width="400" alt="Tela 3"/></td>
    <td><img src="https://github.com/user-attachments/assets/5816c774-a8fb-4fd0-be95-106ccd04e0fd" width="400" alt="Tela 4"/></td>
  </tr>
</table>



## 👤 Autor

Samuel de Souza  
[GitHub](https://github.com/SamuelSRJ)

---

Projeto desenvolvido para fins de estudo e portfólio.
