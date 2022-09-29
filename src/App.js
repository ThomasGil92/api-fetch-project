import { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';

// Création du style CSS avec styled-components
const Page = styled.div`
  text-align: center;
`;
const Header = styled.header`
  background-color: #303030;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const HeaderH1 = styled.h1`
  font-size: 3em;
  color: white;
`;

const Main = styled.main`
  background-color: #303030;
  color: white;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 1rem 1.5rem;
  padding: 0 100px;
`;

const MovieContainer = styled.div`
  height: 100%;
  background: #000000;
  padding: 5px 8px;
  position: relative;
`;
const MovieTitle = styled.h3`
  font-size: 1.2em;
  height: 50px;
`;
const MoviePoster = styled.img`
  height: 100px;
  position: absolute;
  left: 0;
  width: 100%;
  object-fit: cover;
`;
const MovieSynopsis = styled.p`
  margin-top: 150px;
  font-size: 0.9em;
`;

function App() {
  // Stockage des données dans le state
  const [bestMovies, setBestMovies] = useState();
  const [loading, setLoading] = useState(true);

  // Demandes des données (fetch) à la création de la page
  useEffect(() => {
    // Fonction asynchrone de fetch vers l'API
    const fetchData = async () => {
      // Récupération des datas de l'API
      const data = await fetch(
        `${process.env.REACT_APP_IMDB_API_URL}/discover/movie?with_original_language=en&sort_by=popularity.desc&primary_release_year=2021&language=fr-FR&api_key=${process.env.REACT_APP_IMDB_API_KEY}`,
      );
      // Conversion des datas en JSON
      const json = await data.json();
      // Ajout les datas au state
      setBestMovies(json.results);
      // Modification de l'état de chargement des données
      setLoading(false);
    };

    // Lancement de la fonction
    fetchData();

    // Laisser l'object de dépendance vide pour lancer le useEffect qu'au chargement de la page
  }, []);

  // Composant qui s'affiche si les données chargent
  function Loading() {
    return <p>Loading ...</p>;
  }

  // Composant qui renvoie la liste des données reçues
  function BestMoviesCatalog() {
    return (
      <Row>
        {/* Fonction qui permet de lister les objet de mon tableau de données */}
        {bestMovies.map((item) => (
          <MovieContainer key={item.id}>
            <MovieTitle>{item.title}</MovieTitle>
            <MoviePoster src={`${process.env.REACT_APP_IMDB_API_IMG_URL}${item.backdrop_path}`} />
            <MovieSynopsis>
              {item.overview.slice(0, 150)}
              <span>...</span>
            </MovieSynopsis>
          </MovieContainer>
        ))}
      </Row>
    );
  }

  // Rendu
  return (
    <Page>
      <Header>
        <HeaderH1>Mon cinéma</HeaderH1>
      </Header>
      {/* Fonction ternaire qui permet d'afficher l'état de chargelent si le
       fetch des données n'est pas terminé */}
      <Main>{loading ? <Loading /> : <BestMoviesCatalog />}</Main>
    </Page>
  );
}

export default App;
