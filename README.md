<p align="center">
  <img alt="Formação Node.js" src="https://storage.googleapis.com/star-lab/novo-site/formacoes/nodejs/node-icon.svg" width="100px" />
</p>

# Fundamentos de API REST Node.js com Express
 
API REST com Node.js utilizando Express, TypeScript, Schema Validation com ZOD, Query Builder com Knex.js e Banco de dados SQL com SQLite.

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)

# 🚀 Fundamentos de API REST com Express & TypeScript

> Projeto focado na construção de APIs escaláveis, tipadas e seguras, migrando da lógica "Vanilla Node" para o ecossistema profissional com **Express** e validação de dados com **Zod**.

## 💻 Sobre o Projeto

Diferente do projeto anterior feito com Node.js puro, esta aplicação utiliza o **Express.js** para gerenciar roteamento e middlewares de forma eficiente. O grande diferencial aqui é a integração com **TypeScript**, garantindo que o código seja previsível e livre de erros comuns de tipagem durante o desenvolvimento.

Além disso, o projeto implementa práticas avançadas de engenharia de software:
- **Validação de Dados:** Uso do **Zod** para garantir que os dados de entrada (`req.body`) sigam estritamente as regras de negócio.
- **Tratamento de Erros Centralizado:** Um middleware global que captura erros da aplicação (`AppError`) e erros de validação, devolvendo respostas padronizadas ao frontend.
- **Tipagem Customizada:** Extensão das definições de tipo do Express (`@types/express`) para injetar propriedades customizadas no objeto `Request`.

## 🛠 Tech Stack

- **Node.js** (Runtime)
- **TypeScript** (Superset JS)
- **Express** (Framework Web)
- **Zod** (Schema Validation)
- **TSX** (Execução de TypeScript)

## ⚙️ Arquitetura e Conceitos Implementados

### 1. Controllers & Rotas
Separação clara de responsabilidades. As rotas (`products.routes.ts`) apenas apontam para os métodos, enquanto os Controllers (`products.controller.ts`) lidam com a lógica.

### 2. Validação com Zod 💎
Em vez de dezenas de `if/else` para validar dados, utilizei schemas declarativos.
*Exemplo real do projeto (`products-controller.ts`):*

```typescript
const bodySchema = z.object({
  name: z.string()
    .trim()
    .min(6, 'Name must be 6 or more characters'),
  price: z.number()
    .positive('Price must be positive!')
})

// O Zod faz o parse e lança erro automático se falhar
const { name, price } = bodySchema.parse(req.body)
```

### 3. Global Error Handling ⚠️

Em vez de usar `try/catch` em todos os lugares, a aplicação possui um "funil" em `server.ts` que intercepta qualquer erro:

```typescript
app.use((error: Error, req: Request, res: Response, _: NextFunction) => {
    // Erros de regra de negócio (ex: "Produto não encontrado")
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message })
    }

    // Erros de validação do Zod (ex: "Preço inválido")
    if (error instanceof ZodError) {
        return res.status(400).json({ 
            message: 'Validation Error!',
            issues: z.flattenError(error)
        })
    }

    // Erro interno (Bug)
    res.status(500).json({ message: error.message })
})
```

### 4. Type Declaration (`.d.ts`)

Aprendizado sobre como sobrescrever tipos de bibliotecas externas. Foi criado o arquivo `request.d.ts` para permitir que o `req.user_id` fosse reconhecido pelo TypeScript dentro dos middlewares.

## 🔌 Endpoints

### Produtos (`/products`)

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| **GET** | `/products` | Lista produtos (Simulação de paginação via Query Params). |
| **POST** | `/products` | Cria um produto com validação estrita de schema. |

#### Exemplo de Payload (POST)

```json
{
  "name": "Teclado Mecânico",
  "price": 250.00
}
```
> Se enviar o preço negativo ou nome curto, a API retorna erro 400 detalhado.

## 🚀 Como Executar

### Pré-requisitos
- Node.js v18+
- Gerenciador de pacotes (NPM/Yarn/PNPM)

### Passo a passo

```bash
# Clone o repositório
$ git clone [https://github.com/alexfrsm13/fundamentos-api-rest-express.git](https://github.com/alexfrsm13/fundamentos-api-rest-express.git)

# Instale as dependências
$ npm install

# Execute o projeto (modo dev com watch)
$ npm run dev
```

## 🧠 Aprendizados

A migração para **Express + TypeScript** trouxe clareza sobre conceitos fundamentais:

- **Middlewares:** Como funcionam o `next()`, a diferença entre middlewares globais vs locais e o padrão *Chain of Responsibility*.
- **Tipagem Estática:** O poder do Intellisense ajudando a descobrir métodos e propriedades dentro dos objetos `req` e `res`, evitando erros em tempo de desenvolvimento.
- **Zod:** Como validar dados de entrada de forma declarativa, segura e reutilizável.
- **HTTP Status:** Uso semântico correto de status codes como `201` (Created), `400` (Bad Request) e `500` (Internal Server Error).

## 🦸 Autor

Feito com 💜 por **Alex**.

[![Linkedin Badge](https://img.shields.io/badge/-LinkedIn-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/alex-fernando-0542aa279/)]([alex-fernando-0542aa279](https://www.linkedin.com/in/alex-fernando-0542aa279/))

## 📝 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.


```
MIT License

Copyright (c) 2026 Alex Fernando

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```