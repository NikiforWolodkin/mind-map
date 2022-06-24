import React, { useState } from 'react';
import { animated } from 'react-spring';
import { useDrag } from '@use-gesture/react';
import './mind-map.css'

const Tab = React.memo(function Tab(props) {
  const [text, setText] = useState(props.text);
  const [hover, setHover] = useState({display: 'none'});
  const initialPosition = { x: props.x, y: props.y };
  const [position, setPosition] = useState({ x: initialPosition.x, y: initialPosition.y });
  const bindPosition = useDrag((params) => {
    setPosition({ 
      x: initialPosition.x + params.offset[0],
      y: initialPosition.y + params.offset[1],
    });
    console.log(params.offset, params.xy)
  });

  return (
    <animated.div 
      {...bindPosition()} 
      style={{
        x: position.x,
        y: position.y,
        position: 'absolute',
      }}
      onMouseEnter={() => setHover({display: 'block'})}
      onMouseLeave={() => setHover({display: 'none'})}
    >
      <div className='tabContainer'>
        <div className='longRow'>
          <button 
            style={hover}
            onClick={() => props.addTab('', position.x, position.y - 100)}
          >
            +
          </button>
        </div>
        <button
          style={hover}
          onClick={() => props.addTab('', position.x - 300, position.y)}
        >
          +
        </button>
        <div className='tab'>
          <input
            type='text'
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>
        <button
          style={hover}
          onClick={() => props.addTab('', position.x + 300, position.y)}
        >
          +
        </button>
        <div className='longRow'>
          <button 
            style={hover}
            onClick={() => props.addTab('', position.x, position.y + 100)}
          >
            +
          </button>
        </div>
      </div>
    </animated.div>
  );
});

function Root() {
  const [tabs, setTabs] = useState([]);
  const addTab = (text, x, y) => {
    setTabs([...tabs, {
      id: "id" + Math.random().toString(16).slice(2),
      text: text,
      x: x,
      y: y,
    }])
  }

  return (
    <div className='root'>
      <button
        onClick={() => addTab('', parseInt((window.innerWidth / 2) - 130), parseInt(window.innerHeight / 2))}
        className='addBig'
      >
        +
      </button>

      <Tab 
        text='Новая диаграмма'
        x={parseInt((window.innerWidth / 2) - 130)}
        y={parseInt((window.innerHeight / 2) - 80)}
        addTab={addTab}
      />

      {tabs.map(element => 
        <Tab 
          key={element.id}
          text={element.text}
          x={element.x}
          y={element.y}
          addTab={addTab}
        />
      )}
    </div>
  );
}

export default Root;
