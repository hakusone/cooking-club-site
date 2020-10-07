import React, {Component} from 'react';

class SolidByMelt extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let elements = this.props.elements;
    let low2High = this.props.low2High;

    let solids = elements.filter(element => element.phase == 'solid');

    solids.sort(function(a, b) {
      return a.melting_point - b.melting_point;
    });

    if (!low2High) {
      solids.reverse();
    }

    let items = solids.map(function(solid) {
      return <li>{solid.name}, melting point: {solid.melting_point}</li>;
    });

    let title = <h2>Solid Elements by Melting Point</h2>
    let sortOrder = low2High ? 'Low to High' : 'High to Low';
    let subtitle = <h3>{solids.length} Elements sorted from {sortOrder}</h3>
    return <section>
      {title}
      {subtitle}
      <ul>
        {items}
      </ul>
    </section>;
  }
}


export default SolidByMelt;
