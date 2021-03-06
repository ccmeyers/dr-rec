var React = require('react');

var Marker = React.createClass({
  render: function() {
    var style = this.props.$hover ? {transform: 'scale(1.1)'} : {transform: 'scale(1)'};
    var markerId = "marker-"+this.props.id;
    var markerClass = "marker "+this.props.specialtySlug

    return (
      <div style={style}>
        <svg className={markerClass} id={markerId} xmlns="http://www.w3.org/2000/svg" width="20px" height="30px" viewBox="0 0 20 30">
        <g display="none">
        	<path display="inline" d="M519.82,172.891H92.18c-3.35,0-6.109,2.729-6.109,6.1V460c0,3.38,2.76,6.11,6.109,6.11H519.82
        		c3.399,0,6.109-2.73,6.109-6.11V178.99C525.93,175.62,523.21,172.891,519.82,172.891z M512.72,298.63H99.33v-61.08h413.39V298.63
        		L512.72,298.63z"/>
        </g>
        <g display="none">
        	<path display="inline" d="M526.2,240.82c0-64.11-50.54-114.561-112.811-114.561c-50.29,0-92.83,34.65-107.399,81.46
        		c-14.58-46.81-57.12-80.25-107.41-80.25c-62.29,0-112.78,49.011-112.78,113.15c0,32.36,12.9,55.229,33.65,79.69h-0.3L306.1,512.74
        		l186.92-192.42h-0.489C513.29,295.84,526.2,273.16,526.2,240.82z"/>
        </g>
        <path fill="#4E00FF" d="M10,0C4.48,0,0,4.48,0,10s10,20,10,20s10-14.48,10-20S15.52,0,10,0z M10,15.21c-2.76,0-5-2.239-5-5
        	c0-2.76,2.24-5,5-5s5,2.24,5,5C15,12.971,12.76,15.21,10,15.21z"/>
        <g display="none">
        	<polygon display="inline" points="526.21,209.57 526.21,99.49 526.21,99.47 416.12,99.47 416.12,99.47 159.2,99.47 159.2,209.57
        		311.94,209.57 85.79,435.72 189.6,539.53 416.12,313.02 416.12,466.48 526.21,466.48 	"/>
        </g>
        <g display="none">
        	<polygon display="inline" points="379.51,99.84 232.7,99.84 330.58,246.65 85.891,246.65 85.891,393.439 330.57,393.439
        		232.7,540.26 379.51,540.26 526.32,320.029 	"/>
        </g>
        </svg>
      </div>
    )
  }
});

module.exports = Marker;
