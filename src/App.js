import React, {useState, useEffect} from "react";

import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=> {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: 123,
      url: "https://github.com/josepholiveira",
      title: `Novo projeto ${Date.now()}`,
      techs: ["React", "Node.js"],
    })

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {

    const newState = repositories;
    
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    console.log(repositoryIndex);
    
    if(repositoryIndex < 0){
      console.log('Repositorio não existe');
      return;
    }

    await api.delete('repositories/' + id);

    console.log(repositories);

    const newRepositories = repositories.filter(repository => repository.id !== id);
    setRepositories(newRepositories);
    console.log(repositories);

    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {repositories.map(repository => (
            
            <li key={repository.id} >{repository.title}
              <button  onClick={() => handleRemoveRepository(repository.id)}>
              Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
