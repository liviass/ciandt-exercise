# Top5 Radio

A aplicação desenvolvida é uma implementação do exercício do processo seletivo da CI&T.

O objetivo era implementar uma aplicação web que permita que ouvintes de uma radio local escolham seu top 5 de músicas preferidas e enviem para a rádio.
As músicas mais votadas serão escolhidas para tocar na rádio no horário nobre.

A tela inicial é composta de uma pequena mensagem para o ouvinte e um botão para que ele navegue para a tela de votação.

Na tela de votação, temos um formulário onde o mesmo poderá inserir seu nickname e escolher as músicas do seu top 5 dentre o conjunto disponibilizado no enunciado do exercício.

Temos uma terceira tela, sem link para ela dentro da aplicação, na qual um funcionário da rádio poderá visualizar as 5 músicas mais votadas e uma lista com os nicknames dos ouvintes e a quantidade de músicas votadas por eles no top5.

## Getting Started

Para executar a aplicação em sua máquina local, siga as instruções abaixo.

### Prerequisites

Pressupõe-se que você já possua o Docker e o Docker Compose instalado em sua máquina.

Caso não possua, siga as instruções dos sites oficiais:

* [Docker](https://docs.docker.com/install/)
* [Docker Compose](docs.docker.com/compose/install)

### Installing

Após clonar o repositório para sua máquina, certifique-se de que o Docker está rodando em sua máquina.

Para inicializar a aplicação, execute o comando abaixo de dentro do diretório raiz do projeto (onde está o arquivo *docker-compose.yml*)

```
sudo docker-compose up
```

Esse comando cria as três instâncias dos containers para o banco de dados, o front-end e o back-end da aplicação.

Ao final da inicialização das instâncias, espera-se que a aplicação esteja acessível em ```http://localhost:8080```.

A tela com o resultado da votação estará acessível em ```http://localhost:8080/results```.

## Deployment

Atualmente somente as configurações para um ambiente de desenvolvimento estão disponíveis.

Seriam necessários ajustes como:
- Implementação de medidas de segurança para evitar acessos não permitidos no banco;
- Implementação/Configuração de um servidor de conteúdo estático como o Nginx para o front-end;
- Implementação de testes automatizados para evitar falhas durante deploy contínuo;
- Etc.

## Built With
* [React JS](https://reactjs.org/docs)
* [React Router](https://reacttraining.com/react-router/)
* [Redux](https://redux.js.org/)
* [Material UI](https://material-ui.com)
* [Webpack](https://webpack.js.org/)
* [Node.js](https://nodejs.org)
* [Express](https://expressjs.com)
* [Express Cors](https://expressjs.com/en/resources/middleware/cors.html)
* [MongoDB](https://www.mongodb.com/cloud)
* [Mongoose](https://mongoosejs.com/docs/)
* [Docker](https://docs.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

## Acknowledgments
    * Ícone usado no favicon é do [Smashicons](https://www.flaticon.com/authors/smashicons) from [Flaticon](https://www.flaticon.com/)