# Instituto Mão Amiga — N2 Desenvolvimento Mobile

Projeto acadêmico com aplicativo **React Native + Expo Router** e **API Java Spring Boot**, para gerenciamento de pontos de coleta/distribuição e doações.

## Estrutura

- `api/`: Spring Boot, JPA, H2 em arquivo, validação e Swagger.
- `app/`: telas e navegação do aplicativo.
- `services/`: comunicação com a API, pontos, doações e favoritos.
- `assets/`: imagens do aplicativo.

## Executar a API

Requisitos: Java 17+ e Maven. No terminal, dentro da pasta `api`:

```bash
mvn spring-boot:run
```

- API: http://localhost:8080/api/v1
- Swagger: http://localhost:8080/swagger-ui.html
- Console H2: http://localhost:8080/h2-console

## Executar o aplicativo

Use Node.js 22.13+ na série 22 (ou 24.3+ na série 24) e npm. Em outro terminal, na raiz do projeto:

```bash
npm ci
npx expo start
```

Antes de abrir o app, configure `API_BASE_URL` em [`services/api.ts`](services/api.ts) conforme o ambiente.

| Ambiente | URL da API |
| --- | --- |
| Celular com Expo Go na mesma rede Wi-Fi do computador | `http://IP_DO_COMPUTADOR:8080/api/v1` |
| Emulador padrão do Android Studio | `http://10.0.2.2:8080/api/v1` |
| Navegador no mesmo computador da API | `http://localhost:8080/api/v1` |

No celular, abra o Expo Go e leia o QR code exibido pelo Expo. No navegador, pressione `w` no terminal do Expo.

## Endpoints

Veja os exemplos de requisições e a configuração do banco no [README da API](api/README.md). As consultas paginadas começam em `page=0` e aceitam `size` e `sort`.

### Pontos

- `GET /api/v1/pontos`
- `GET /api/v1/pontos/{id}`
- `POST /api/v1/pontos`
- `PUT /api/v1/pontos/{id}`
- `DELETE /api/v1/pontos/{id}`
- `GET /api/v1/pontos/filtro?filtro=Centro&page=0&size=10`

### Doações

- `GET /api/v1/doacoes/{id}`
- `POST /api/v1/doacoes`
- `PUT /api/v1/doacoes/{id}`
- `DELETE /api/v1/doacoes/{id}`
- `GET /api/v1/doacoes/filtro?filtro=alimento&page=0&size=10`

## Evidências do Swagger

As capturas do Swagger com os retornos HTTP 200, 400 e 404 estão pendentes. Para gerar as evidências, execute os casos abaixo com a API ligada.

- **200:** `GET /api/v1/pontos`
- **400:** `POST /api/v1/pontos` com corpo `{}`
- **404:** `GET /api/v1/pontos/{id}` com um UUID inexistente, como `00000000-0000-0000-0000-000000000000`

## Acompanhamento da N2

| Item | Implementação | Conferência pendente |
| --- | --- | --- |
| [N2-1](https://github.com/luiza-mel1/mao-amiga/issues/1) | CRUD de pontos na API | Capturas do Swagger de cada operação, incluindo 400 e 404 |
| N2-2 | Busca paginada de pontos por nome ou bairro, com ordenação | Registro das três chamadas e respostas abaixo |
| N2-3 | Lista, busca e detalhe de pontos no app | Demonstração com a API em execução |
| N2-4 | Cadastro, edição e exclusão de pontos no app | Demonstração com a API em execução |
| N2-5 | CRUD de doações na API | Validação de requisições e retornos |
| N2-6 | Cadastro e histórico de doações no app | Conferir o novo registro no histórico durante a demonstração |
| N2-7 | Edição e exclusão de doação pelo app | Conferir a atualização do histórico após cada operação |
| N2-8 | Favoritos no app, instruções de execução e roteiro | Confirmar a persistência dos favoritos e apresentar o roteiro |

Para demonstrar a paginação no Swagger, execute três chamadas a `GET /api/v1/pontos/filtro` e compare `content` e `page` nas respostas.

1. `?page=0&size=10&sort=nome,asc`
2. `?page=1&size=10&sort=nome,asc`
3. `?filtro=Bueno&page=0&size=5&sort=bairro,desc`

## Roteiro de demonstração (até 3 minutos)

| Tempo | Demonstração |
| --- | --- |
| 0:00–0:50 | Na aba Pontos, buscar por bairro, cadastrar um ponto de teste, editar e excluir. |
| 0:50–1:15 | Favoritar um ponto existente e abrir a aba Favoritos. |
| 1:15–2:20 | Na aba Doações, cadastrar uma doação, abrir no histórico, editar e excluir. |
| 2:20–3:00 | No Swagger, enviar um ponto com corpo inválido (400) e buscar um UUID inexistente (404). |

## Observação

Os 25 pontos iniciais são registros ilustrativos para fins acadêmicos.

## Entrega

Repositório de entrega de Luiza Mel, para a disciplina de Desenvolvimento Mobile.
