import './css/Search.css';
import './css/Button.css';
import React,{useState, useEffect} from 'react';
import axios from 'axios';

function App() {

//Hooks
const [search, setSearch] = useState('');
const [creatures, setCreatures] = useState([]);
const [filteredCreatures, setFilteredCreatures] = useState([]);
const [selectedCreatures, setSelectedCreatures] = useState([]);

//Fetches the JSON data from the Pokémon API. 
useEffect(() => {
  axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((response) => {
          setCreatures(response.data.results);
      });
}, []);

//Filters the fetched data based on the input in the search box. 
useEffect(() => {
  setFilteredCreatures(
      creatures.filter((creature) =>
          creature.name.toLowerCase().includes(search.toLowerCase())
      )
  );
}, [search, creatures]);

  //Rendering 
  return (
    <div  className="container">
    
        <button className="removeListButton" onClick={()=>{setSelectedCreatures([])}}>Remove list</button>  
        <button className="removeSearchButton" onClick={()=>{setSearch('')}}>Empty search</button>    
    
        <div>
            <input className="searchBox" type="text"  placeholder="Search for a Pokémon by name" value={search} style={{marginTop:10}}
            onChange={(e) => {setSearch(e.target.value)}}/>      
        </div>

        {search ? (
            <div className="resultList">
                
                    {filteredCreatures.slice(0,10).map((value)=>{
                    return <div key={Math.random().toString(36).substr(2, 9)} tabIndex="0">
      
            <div  className="searchSuggestion"  onClick={()=>{
              setSelectedCreatures((previousArray) => ([...previousArray, value.name + "@" + Date().slice(16,25)]))}}>{value.name}</div>
    
            </div>
            })}
          </div> ) : null}

          {selectedCreatures ? (
          <div className="savedList"> {selectedCreatures}</div>
          ) : null}
          
      </div>
    );
}



export default App;
