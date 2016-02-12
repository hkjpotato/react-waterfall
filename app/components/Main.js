import React from 'react';
import ReactDOM from 'react-dom';
import {Motion, spring, StaggeredMotion, TransitionMotion} from 'react-motion';

const springConfig = {stiffness: 300, damping: 40};
const springConfig_shadow = {stiffness: 300, damping: 40};


const Waterfall = React.createClass({
  getInitialState() {
    return {
      data: this.props.data,
      initTop: 900,
      finalTop: this.props.finalTop
    };
  },
  render() {
    const {data} = this.state;
    const {initTop} = this.state;
    const defaultStyles =data.map((d, i) => ({
      marginTop: initTop,
      shadow: 20
    }));
    return (
        <StaggeredMotion
          defaultStyles={defaultStyles}
          styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
            return i === 0
              ? {marginTop: spring(this.state.finalTop, springConfig), shadow: spring(2, springConfig_shadow)}
              : {marginTop: spring(prevInterpolatedStyles[i - 1].marginTop, springConfig), shadow: spring(prevInterpolatedStyles[i - 1].shadow, springConfig_shadow)}
          })}>
          {(interpolatingStyles) => {
            return (
            <div className={"waterfall"}>
              {interpolatingStyles.map((style, i) =>
                (<div className="waterfall-item" key={i} style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid', 
                  width: 600,
                  height: 150, 
                  marginTop: style.marginTop, 
                  boxShadow:`rgba(0, 0, 0, 0.1) 0px ${style.shadow}px ${2 * style.shadow}px 0px`,
                }}></div>))
              }
            </div>);
          }
          }
        </StaggeredMotion>
    );
  },
});


const Demo = React.createClass({
  getInitialState() {
    return {
      data: [1,2,3,4],
      itemNum: 1
    };
  },
  componentDidMount() {
    $(window).scroll(() => {
      if($(window).scrollTop() + $(window).height() == $(document).height()) {
        console.log("to bottom");
        this.setState({
          itemNum: this.state.itemNum + 1,
        });
      }
    });
  },
  render() {
    var data = this.state.data;
    var items = [];
    for (var i = 0; i < this.state.itemNum; i++) {
      items.push(<Waterfall data={data} finalTop={10} key={i}/>);
    }
    return (
      <div>
        <h2>React Waterfall</h2>
        {items}
      </div>
    );
  },
});

ReactDOM.render(<Demo />, document.querySelector('#waterfall-container'));