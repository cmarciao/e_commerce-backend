<p align="center">
 <a href="#-sobre-o-projeto">Sobre</a> •
 <a href="#-funcionalidades">Funcionalidades</a> •
 <a href="#-rotas">Rotas</a> • 
 <a href="#-como-executar-o-projeto">Como executar</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-autor">Autor</a>
</p>

## 💻 Sobre o projeto

📃 E-commerce - É uma mini plataforma online de compras, onde você pode escolher seus produtos e "compra-los".

---

## ⚙️ Funcionalidades

- [x] Criar um usuário
  - [x] nome do usuário
  - [x] email do usuário
  - [x] senha do usuário
- [x] Adicionar um produto ao carrinho 
- [x] Editar um produto no carrinho
- [x] Remover um produto do carrinho
- [x] Ver seu carrinho de compras
- [x] Finalizar um carrinho de compras
- [x] Ver seu histórico de compras

---

## 🌐 Rotas
1. **users**
 - 1. **post /users** → Criar um novo usuário.
2. **auth**
  - 1. **post /** → Fazer login
  - 2. **get /me** → Pegar informações do usuário autenticado
3. **products**
 - 1. **get /proddcts** → Listar todos os produtos
 - 2. **post /products** → Criar um novo produto
4. **carts**
 - 1. **get /carts ** → Pegar as informações do carrinho do usuário autenticado
 - 2. **patch /carts/add-products** → Adicionar novos produtos no carrinho
 - 3. **patch /carts/remove-products** → Remover a quantidade de um produto no carrinho
 - 4. **patch /carts/remove-cart-items** → Remover um determinado produto do carrinho
 - 5. **patch /carts/confirm** → Confirmar compra do carrinho
5. **sales**
 - 1. **get /sales** → Listar histórico de compras


## 🚀 Como executar o projeto

1. Este projeto usa o PostgresSQL como Banco de Dados, então você precisa configurar o seu banco:
   1. No arquivo src/database/index.ts é onde é feita a configuração do PostgresSQL.
   2. Você pode mudar as configurações de acordo com a sua necessidade.
   3. Ou você pode subir um ambiente Docker na porta 5432, e rodar os camandos SQLs que estão dentro de src/database/schema.sql

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

#### 🎲 Rodando o Backend (servidor)
```bash

# Clone este repositório
$ git clone https://github.com/cmarciao/e-commerce-backend

# Acesse a pasta do projeto no seu terminal/cmd
$ cd e-commerce-backend

# Instale as dependências
$ yarn

# Execute a aplicação em modo de desenvolvimento
$ yarn dev

# A aplicação será aberta na porta:3333 - acesse http://localhost:3333

```

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### [](https://github.com/tgmarinho/Ecoleta#server-nodejs--typescript)**Server**  ([NodeJS](https://nodejs.org/en/)  +  [TypeScript](https://www.typescriptlang.org/))

-   **[Express](https://expressjs.com/)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[ts-node-dev](https://github.com/wclr/ts-node-dev)**
-   **[bcrypt](https://github.com/kelektiv/node.bcrypt.js)**
-   **[pg](https://node-postgres.com/)**
-   **[ExpressJS Async Errors](https://github.com/davidbanham/express-async-errors)**
-   **[JSON Web Token](https://github.com/auth0/node-jsonwebtoken)**
-   **[Dot Env](https://github.com/motdotla/dotenv)

> Veja o arquivo [package.json](https://github.com/cmarciao/e-commerce-backend/blob/main/package.json)

#### **Utilitários**

-   Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**
-   Teste de API:  **[Insomnia](https://insomnia.rest/)**

---

## 🦸 Autor

<img src="https://avatars.githubusercontent.com/u/79059115?v=4" width="100px;" alt=""/>
<br />
<sub><b>Cássio Marcião</b></sub>
<br />

[![Linkedin Badge](https://img.shields.io/badge/-Cássio-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/cássio-marcião-743049209/)](https://www.linkedin.com/in/cássio-marcião-743049209/) 
[![Gmail Badge](https://img.shields.io/badge/-marciaocassio@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:marciaocassio@gmail.com)](mailto:marciaocassio@gmail.com)
