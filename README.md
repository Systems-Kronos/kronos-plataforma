# kronos-plataforma

## Índice
- [📓 Sobre](#-sobre)
- [🚀 Tecnologias](#-tecnologias)
- [✨ Funcionalidades](#-funcionalidades)
- [⚙️ Instalação](#-instalação)
- [🧱 Estrutura do Projeto](#-estrutura-do-projeto)
- [📄 Licença](#-licença)
- [💻 Autores](#-autores)

</br>

## 📓 Sobre
Kronos-plataforma é a interface web (front-end) compementar ao aplicativo **Kronos**. Uma aplicação desenvolvida para gerenciar equipes, reports e tarefas, fornecendo um painel administrativo com acesso seguro para administradores e gestores. O projeto foi criado com foco em performance (Vite), modularidade (componentes reutilizáveis) e integração com APIs RESTful.

</br>

## 🚀 Tecnologias
- Front-end:
  - React (19.1.1)
  - React DOM (19.1.1)
  - React Router DOM (7.8.2)
  - MUI Material (7.3.2)
  - MUI Icons (7.3.2)
  - Emotion React (11.14.0)
  - Emotion Styled (11.14.1)
  - Axios (1.12.2)

- Ferramentas e Build:
  - Vite (7.1.2)
  - ESLint (9.33.0)
  - Node.js & npm

</br>

## ✨ Funcionalidades
- Acesso restrito a gestores e administradores;
- Dashboard com visão geral da equipe através de gráficos dinâmicos;
- Gerenciamento de membros da equipe;
- Controle de ausências da equipe;
- Controle de reports e tarefas;
- Criação de tarefas;
- Notícias atuais sobre o mundo da indústria;

</br>

## ⚙️ Instalação
É necessário ter o Node.js (versão 18 ou superior) e o npm instalados.
```
# clonar o repositório
git clone https://github.com/Systems-Kronos/kronos-plataforma.git

# entrar no diretório
cd kronos-plataforma

# instalar dependências  
npm install

# rodar  
npm run kronos

# o projeto será inicado em: http://localhost:5173/
```

</br>

## 🧱 Estrutura do Projeto
```
kronos-plataforma
├── /public                 # Arquivos públicos
├── /src                    # Código-fonte principal
  └── /components           # Componentes reutilizáveis
  └── /pages                # Páginas principais da aplicação
  └── /service              # Comunicação com APIs
  └── App.jsx               # Componente raiz
  └── main.jsx              # Ponto de entrada da aplicação
  └── style.css             # Estilos globais
├── index.html              # Ponto de entrada da aplicação web
├── vite.config.js          # Configurações do Vite
├── package.json            # Dependências e scripts
└── README.md               # Documentação do projeto
```

</br>

## 📄 Licença
Este projeto está licenciado sob a licença MIT — veja o arquivo LICENSE para mais detalhes.

</br>

## 💻 Autores
- [Yasmin Barbosa](https://github.com/yassbarbosa)
- [Camilla Moreno](https://github.com/CamillaMoreno)
