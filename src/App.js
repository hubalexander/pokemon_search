import './App.css';
import React,{useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  
const [search, setSearch] = useState('');
const [creatures, setCreatures] = useState([]);
const [filteredCreatures, setFilteredCreatures] = useState([]);
const [selectedCreatures, setSelectedCreatures] = useState([]);


useEffect(() => {
  axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((response) => {
          setCreatures(response.data.results);
      });
}, []);

useEffect(() => {
  setFilteredCreatures(
      creatures.filter((creature) =>
          creature.name.toLowerCase().includes(search.toLowerCase())
      )
  );
}, [search, creatures]);

  return (
    
    <div  className="container">
    
        <button className="RemoveListButton" onClick={()=>{setSelectedCreatures([])}}>Remove list</button>  
    
        <button className="RemoveSearchButton" onClick={()=>{setSearch('')}}>Empty search</button>    
    
        <div>
            <input className="searchBox" type="text"  placeholder="Search for a Pokémon by name" value={search} style={{marginTop:10}}
            onChange={(e) => {setSearch(e.target.value)}}/>      
        </div>

        {search ? (
            <div className="ResultList">
                
                    {filteredCreatures.slice(0,10).map((value)=>{
                    return <div key={Math.random().toString(36).substr(2, 9)} tabIndex="0">
      
            <div  className="SearchSuggestion"  onClick={()=>{
              setSelectedCreatures((previousArray) => ([...previousArray, value.name + "@" + Date().slice(16,25)]))}}>{value.name}</div>
    
            </div>
            })}
          </div> ) : null}

          {selectedCreatures ? (
          <div className="SavedList"> {selectedCreatures}</div>
          ) : null}
          
      </div>
    );
}

export default App;
