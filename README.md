🎬 filmesseriesapp 📱
Bem-vindo ao Movie App, um aplicativo desenvolvido com React Native para você explorar filmes de maneira divertida e interativa! 🌟

💡 Descrição
Este é um aplicativo de filmes integrado à API do The Movie Database (TMDb). Ele permite que você:

Explore filmes populares e recentes.
Veja detalhes completos sobre os filmes, como elenco, diretores e trailers.
Marque seus filmes favoritos e os armazene localmente.
Experimente o modo escuro para uma navegação mais confortável à noite.
Filtre filmes por gênero e explore o conteúdo de acordo com seus interesses.
Navegue em diferentes idiomas, incluindo português, inglês e espanhol.

🛠️ Tecnologias Utilizadas
React Native: Framework para desenvolvimento do app.
TMDb API: Utilizada para obter informações sobre filmes, trailers, elenco e mais.
React Navigation: Biblioteca para navegação entre telas.
Axios: Para realizar requisições HTTP à API.
AsyncStorage: Para armazenar os favoritos no dispositivo.
YouTube Iframe API: Exibe trailers diretamente no aplicativo.

🚀 Como Iniciar
1. Pré-requisitos
Antes de começar, certifique-se de ter o ambiente de desenvolvimento configurado para React Native. Siga as instruções do React Native - Environment Setup até a etapa "Creating a new application".

2. Clonando o Repositório
Clone este repositório para seu computador:

git clone https://github.com/Ivo-Aragao/filmesseriesapp.git
cd <nome_do_repositório>

3. Instalando as Dependências
No diretório do projeto, instale as dependências necessárias:

npm install

4. Iniciando o App
Para Android
Para iniciar o aplicativo em um emulador Android:

# Usando npm
npm run android

# OU usando Yarn
yarn android
Para iOS
Para iniciar o aplicativo em um simulador iOS:

# Usando npm
npm run ios

# OU usando Yarn
yarn ios
Isso deve abrir o aplicativo no seu emulador/simulador. Caso tenha problemas com o emulador, verifique as configurações no guia de configuração do React Native.

📂 Estrutura do Projeto
Aqui está uma visão geral da estrutura de arquivos do projeto:

src/
├── components/              # Componentes reutilizáveis (e.g., MovieItem, MovieModal)
├── context/                 # Contexto de configurações globais (e.g., SettingsContext)
├── screens/                 # Telas principais (e.g., HomeScreen, MovieList)
├── services/                # Funções de serviço (e.g., tmdbApi)
├── styles/                  # Arquivos de estilos para componentes e telas
├── api/                     # Funções relacionadas à API TMDb
└── App.js                   # Arquivo principal para inicialização do app
🎬 Componentes
MovieItem
Exibe as informações básicas de um filme, como título e imagem do pôster.

MovieModal
Componente responsável por mostrar os detalhes completos do filme, incluindo sinopse, elenco, direção e trailer.

MovieCard
Exibe os filmes de forma interativa. Utilizado na tela inicial e nas listas de filmes.

GenreButton
Botões para filtrar filmes por gênero.

FilmItem
Componente para exibir filmes com mais interatividade, como a possibilidade de marcar como favorito.

🖥️ Telas
HomeScreen
Tela inicial onde são exibidos os filmes populares e recentes. O usuário pode selecionar um filme para ver mais detalhes.

GenresScreen
Tela para filtrar filmes por gênero.

MovieList
Tela de lista de filmes, com a opção de ver detalhes ou adicionar a favoritos.

🎨 Estilos
O estilo do aplicativo é baseado em uma interface simples e limpa, com suporte ao modo escuro. As telas têm estilos específicos para garantir uma boa experiência em diferentes dispositivos.

Exemplo de Arquivo de Estilos:
homeStyles.js - Estilos para a tela inicial.
genresStyles.js - Estilos para a tela de gêneros.

🙋‍♂️ Criadores
Este projeto foi desenvolvido por:

Ivo Aragão - Desenvolvedor
Joacir Filho - Desenvolvedor

💬 Contribuições
Gostou do projeto? Contribua! Faça um fork, adicione melhorias ou corrija problemas e envie um pull request. Toda contribuição é bem-vinda! 😄

📜 Licença
Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para mais detalhes.