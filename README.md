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

- [N2-1 — sete prints do CRUD de pontos](https://github.com/luiza-mel1/mao-amiga/issues/1#issuecomment-6959307999), com os retornos HTTP 200, 201, 204, 400 e 404.
- [N2-2 — três consultas com paginação, filtro e ordenação](https://github.com/luiza-mel1/mao-amiga/issues/2#issuecomment-6959483870), com as respostas completas da API anexadas.

## Acompanhamento da N2

| Item | Evidência ou conferência |
| --- | --- |
| N2-1 | Prints do CRUD de pontos publicados no link acima. |
| N2-2 | Consultas e respostas de paginação publicadas no link acima. |
| N2-3 | Demonstrar lista, busca e detalhe de pontos com a API ligada. |
| N2-4 | Demonstrar cadastro, edição e exclusão de pontos no app. |
| N2-5 | Validar o CRUD de doações na API. |
| N2-6 | Cadastrar uma doação e conferir se aparece no histórico. |
| N2-7 | Editar e excluir uma doação pelo histórico. |
| N2-8 | Confirmar a persistência dos favoritos e apresentar o roteiro. |

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
