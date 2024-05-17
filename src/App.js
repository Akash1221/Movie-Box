import axios from 'axios';
import styled from 'styled-components';
import MovieComponent from './component/MovieComponent';
import MovieInfoComponent from './component/MovieInfoComponent';
import { useState } from 'react';

export const API_KEY = "5a7b128c"; 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: black;
  align-items: center;  
  color: white;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;

const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const SearchBox = styled.div`
  margin-top: 10px;
  display: flex;
  height: 32px;
  flex-direction: row;
  padding: 10px 10px;
  background-color: white;
  border-radius: 6px;
  margin-left: 20px;
  width: 30%;
  align-items: center;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;

const MovieList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 24px;
  justify-content: space-evenly;
`;
const Placeholder = styled.img`
width: 120px;
height: 120px;
margin: 150px;
opacity: 90%;
`;
function App() {
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const [searchQuery, updateSearchQuery] = useState("");
  const [timeOutId, updateTimeOutId] = useState();

  const fetchData = async (searchString) => {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (event) => {
    clearTimeout(timeOutId);
    updateSearchQuery(event.target.value);
    const timeout = setTimeout(() => fetchData(event.target.value), 500);
    updateTimeOutId(timeout);
  };

  return (
    <Container>
      <Header >
        <AppName>
          <MovieImage src="/production.png" />
          React Movie App
        </AppName>
        <SearchBox>
          <SearchIcon src="search-icon.svg" />
          <SearchInput 
            placeholder='Search Movie'  
            value={searchQuery} 
            onChange={onTextChange} 
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoComponent 
      selectedMovie={selectedMovie}
      onMovieSelect={onMovieSelect}/>}
      <MovieList>
        {movieList?.length
          ? movieList.map((movie, index) => (
              <MovieComponent
               key={index} 
              movie={movie} 
              onMovieSelect={onMovieSelect} />
            ))
          : (
          <Placeholder src=  "/tenor.gif"/>
          )}
      </MovieList>
    </Container>
  );
}

export default App;
