# API Base SaaS

Este é o backend do projeto API Base SaaS, desenvolvido com **Node.js**, **TypeScript**, **Fastify** e **Prisma**.

## Estrutura do Projeto

### Principais Diretórios

- **`prisma/`**: Contém o esquema do banco de dados e as migrações.
- **`src/application/`**: Contém a lógica de negócios, middlewares, controladores, casos de uso e configurações.
- **`src/factories/`**: Contém as fábricas para instanciar controladores e casos de uso.
- **`src/server/`**: Configuração do servidor Fastify e rotas.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **TypeScript**: Superset do JavaScript com tipagem estática.
- **Fastify**: Framework web rápido e eficiente.
- **Prisma**: ORM para manipulação do banco de dados.
- **Zod**: Validação de esquemas.
- **bcryptjs**: Hashing de senhas.
- **dotenv**: Gerenciamento de variáveis de ambiente.

## Configuração do Ambiente

1. Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente:

```env
DATABASE_URL="postgresql://johndoe:password@localhost:5432/mydatabase?schema=public"
BCRYPT_SALT="your-salt"
JWT_SECRET="your-secret"
```

2. Suba o banco de dados PostgreSQL com o Docker:

```bash
docker-compose up -d
```

3. Execute as migrações do banco de dados:

```bash
npx prisma migrate dev
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento.
- `npm run build`: Compila o projeto para a pasta dist.
- `npm start`: Inicia o servidor a partir do código compilado.

## Rotas Disponíveis

### Autenticação

- `POST /sign-up`: Criação de uma nova conta.
- `POST /sign-in`: Login e geração de tokens.
- `POST /refresh-token`: Atualização do token de acesso.

### Teste de Middlewares

- `GET /test-middleware`: Testa o middleware de autenticação.
- `GET /test-middleware-authorization`: Testa os middlewares de autenticação e autorização.

## Contribuição

1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
```bash
git checkout -b minha-feature
```
3. Faça commit das suas alterações:
```bash
git commit -m 'Minha nova feature'
```
4. Envie para o repositório remoto:
```bash
git push origin minha-feature
```
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais informações.
