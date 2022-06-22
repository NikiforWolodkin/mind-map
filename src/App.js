import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';

function Tab(props) {
  const position = useSpring({ x: 0, y: 0 });
  const bindPosition = useDrag((params) => {
    position.x.set(params.offset[0]);
    position.y.set(params.offset[1]);
  });

  return (
    <animated.div {...bindPosition()} style={{
      x: position.x,
      y: position.y,
    }}>
      Lorem ipsum
    </animated.div>
  );
}

function App() {
  const [tabs, setTabs] = useState([]);

  return (
    <div>
      <button onClick={
        () => setTabs([...tabs, "id" + Math.random().toString(16).slice(2)])
      }>Add tab</button>

      {tabs.map(element => (
        <Tab key={element} />
      ))}
    </div>
  );
}

export default App;
