![task](https://github.com/user-attachments/assets/2f5fa733-2a69-44a4-b86d-33e43122b6a6)

# Task Manager - API com Node.js e Mongoose ✔️

<!-- ![Static Badge](https://img.shields.io/badge/click-blue%20%20aqui-red) -->
<!--
![Static Badge](https://img.shields.io/badge/click-blue__oi-red) -->

O Task Manager é uma API desenvolvida com Node.js e Mongoose, projetada para gerenciar tarefas de usuários de forma eficiente. A aplicação inclui recursos essenciais para criação, atualização, exclusão e listagem de tarefas, além de funcionalidades avançadas para segurança e escalabilidade.

## Principais Funcionalidades

✅ CRUD de Tarefas: Criação, leitura, atualização e exclusão de tarefas.  
✅ Autenticação e Segurança: Implementação de autenticação baseada em tokens (JWT) para garantir acesso seguro.  
✅ Ordenação, Paginação e Filtros: Recursos para facilitar a organização e busca de tarefas.  
✅ Upload de Arquivos: Suporte para anexar arquivos às tarefas.  
✅ Envio de E-mails: Notificações por e-mail integradas ao sistema.  
✅ Testes Automatizados: Cobertura de testes para garantir a confiabilidade da API.

A API é ideal para aplicações que necessitam de um sistema robusto de gerenciamento de tarefas, oferecendo uma base sólida para expansão e personalização conforme as necessidades do projeto.

## Rotas do Projeto

O projeto task-manager oferece rotas para serviços de cadastro, gerenciamento de dados pessoais e manipulação de tarefas. As rotas marcadas com 🌐 são públicas, enquanto as marcadas com 🔒 são privadas, sendo necessário o cadastro prévio para acessá-las.

### Rotas de acesso 🚀

- **POST:** /users/signup 🌐 (pública) - Cadastra um novo usuário.
- **POST:** /users/login 🌐 (pública) - Autentica um usuário e fornece um token.
- **POST:** /users/logout 🔒 - Encerra a sessão do usuário atual.
- **POST:** /users/logoutAll 🔒 - Encerra todas as sessões do usuário em todos os dispositivos.

### Rotas de acesso aos dados do Usuário 👤

- **GET** /users/profile 🔒 - Obtém o perfil do usuário autenticado.
- **PATCH** /users/profile 🔒 - Atualiza os dados do usuário autenticado.
- **DELETE** /users/profile 🔒 - Exclui a conta do usuário autenticado.
- **POST** /users/profile/photo 🔒 - Adiciona uma imagem de perfil ao usuário autenticado.
- **DELETE** /users/profile/photo 🔒 - Remove a imagem de perfil do usuário autenticado.

### Rotas de manipulação de tarefas

- **GET:** /task/ 🔒 - Lista todas as tarefas do usuário autenticado.
- **GET:** /task/:id 🔒 - Obtém os detalhes de uma tarefa específica.
- **POST:** /task/ 🔒 - Cria uma nova tarefa.
- **PATCH:** /task/:id 🔒 - Atualiza os dados de uma tarefa específica.
- **DELETE:** /task/:id 🔒 - Exclui uma tarefa específica.
