import { useState, useEffect } from 'react';
import './App.css';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';

const App = () => {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setRobots(users));
  }, []);

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  const filteredRobots = robots.filter((robot) =>
    robot.name.toLowerCase().includes(searchfield.toLocaleLowerCase())
  );
  return !robots.length ? ( //robots.length === 0
    <>
      <p>Loading...</p>;
    </>
  ) : (
    <>
      <div className='tc'>
        <h1 className='f1'>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    </>
  );
};

export default App;
