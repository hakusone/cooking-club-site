import React from 'react';
import ReactDOM from 'react-dom';
import elements from './elements.json';
import SolidByMelt from './SolidByMelt';

let contents = <div><h1>Chemical Elements</h1>
        <SolidByMelt elements={elements} low2High={true}/>
        <SolidByMelt elements={elements} low2High={false}/>
    </div>;

ReactDOM.render(
  contents,
  document.getElementById('root')
);
