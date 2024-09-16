# Projeto API de Autenticação

Este projeto é uma API de autenticação desenvolvida em Node.js, utilizando Express.js como framework web e MongoDB como banco de dados. A API permite o registro de usuários, autenticação e acesso a rotas protegidas.

## Funcionalidades

- Registro de usuários
- Autenticação de usuários (login)
- Rota pública de boas-vindas
- Rota privada para obter informações do usuário
- Verificação de token JWT para rotas protegidas

## Tecnologias Utilizadas

- Node.js
- Express.js
- MongoDB (com Mongoose)
- bcrypt (para hash de senhas)
- jsonwebtoken (para geração e verificação de tokens JWT)
- dotenv (para gerenciamento de variáveis de ambiente)

## Estrutura do Projeto

O projeto consiste em três arquivos principais:

1. `app.js`: Arquivo principal da aplicação
2. `package.json`: Arquivo de configuração do projeto
3. `User.js`: Modelo de usuário para o MongoDB

## Instalação

1. Clone o repositório
2. Execute `npm install` para instalar as dependências
3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```
   DB_USER=seu_usuario_mongodb
   DB_PASSWORD=sua_senha_mongodb
   SECRET=sua_chave_secreta_para_jwt
   ```
4. Execute `npm start` para iniciar o servidor

## Rotas

### Públicas

- `GET /`: Rota de boas-vindas
- `POST /auth/register`: Registro de novo usuário
- `POST /auth/login`: Autenticação de usuário

### Privadas

- `GET /user/:id`: Obter informações de um usuário específico (requer token JWT)

## Uso

### Registro de Usuário

```
POST /auth/register
Content-Type: application/json

{
  "name": "Nome do Usuário",
  "email": "usuario@email.com",
  "password": "senha123",
  "confirmpassword": "senha123"
}
```

### Login de Usuário

```
POST /auth/login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

### Acessar Rota Privada

```
GET /user/:id
Authorization: Bearer <seu_token_jwt>
```

## Segurança

- As senhas são hasheadas antes de serem armazenadas no banco de dados
- A autenticação é realizada utilizando tokens JWT
- As rotas privadas são protegidas por middleware de verificação de token

## Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento com reinicialização automática, use:

```
npm start
```

## Notas

- Certifique-se de manter suas variáveis de ambiente (`.env`) seguras e não as compartilhe publicamente
- Este projeto é uma base para autenticação e pode ser expandido com funcionalidades adicionais conforme necessário

## Contribuições

Contribuições são bem-vindas! Por favor, abra uma issue ou pull request para sugestões de melhorias ou correções.
