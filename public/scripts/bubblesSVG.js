//
// We'll just start with a single bubble element, then
// work on making a bubble group/stack

function randomNum(min, max) {
    return Math.random() * (max - min) + min;
}

// simply appends "px" string to a number suitable for html/svg/etc
function numToPix(num) {
    return num + "px";
}

// returns rounded int of str with format Xpx where X is a number
function pixToNum(str) {
    return Math.round(parseInt(str.slice(0, -2)))
}

function checkCollisions() {
    var circles = $(".svgcircle").get();
    // if (circles) console.log(circles);
    for (var i = 0; i < circles.length; i++) {
        console.log(circles[i]);
        circles[i].attributes.cx.value="50px"
    }
}

var SVGCircle = React.createClass({
    newPos: function(x, y) {
        this.setState({
            cx: x,
            cy: y
        })
    },
    getInitialState: function() {
        return {
            cx: this.props.cx,
            cy: this.props.cy
        };
    },
    render: function() {
        var className = "svgcircle";

        // calculate title size and positioning based on size of circle
        var cx = pixToNum(this.state.cx);
        var cy = pixToNum(this.state.cy);

        return (
            <g id={this.props.index}>
                <circle onClick={this.props.onClick} className={className} cx={cx} cy={cy} r={this.props.r} filter={this.props.filter}/>
                <text className="svgtitle" x={cx} y={cy}>
                    {this.props.text}
                </text>
            </g>
        );
    }
});

var GoButton = React.createClass({
    render: function() {
        return (
            <input type="button" id="goButton" onClick={this.props.onClick} value={this.props.val} />
        )
    }
})

var CircleGroup = React.createClass({
    clickCircle: function(event) {
        console.log(event._targetInst._currentElement.props.r)
    },
    // checkCollisions: function() {
    //     // if (!this.state.circles) {
    //     //     this.setState({
    //     //         circles: []
    //     //     })
    //     // }
    //     // console.log(this.state.circles.length);
    //     // for (var i = 0; i < this.state.circles.length; i++) {
    //     //     console.log(this.state.circles[i])
    //         // this.state.circles[i].type().setState({
    //         //     cx: 50,
    //         //     cy: 100
    //         // })
    //         // this.state.circles[i].newPos(50, 100);
    //     }
    //     // this.state.circles.forEach(function(circ) {
    //     //     console.log("checking collision for: " + circ.props.text);
    //     //     // circ.props.cx = "50px";
    //     //     console.log(circ);
    //     //     circ.newPos(50, 100);
    //     // });
    // },
    // addCircle: function(r) {
    //     console.log("Pressed");
    //
    //     // var cx = Math.round(randomNum(10, 300))
    //     // var cy = Math.round(randomNum(10, 300))
    //     // var r = Math.round(randomNum(20, 100))
    //     var cx = r*2;
    //     var cy = cx;
    //     var newcircs = [];
    //     var circ = <SVGCircle onClick={this.clickCircle} cx={numToPix(cx)} cy={numToPix(cy)} r={numToPix(r)}/>;
    //
    //     if (this.state) {
    //         newcircs = this.state.circles;
    //     }
    //
    //     newcircs.push(circ)
    //
    //     if (this.state) {
    //         this.setState({
    //             circles: newcircs
    //         });
    //     }
    // },
    clearCircs: function() {
        this.setState({
            circles: []
        });
    },
    componentDidMount: function() {
        // this.checkCollisions();
        checkCollisions();
    },
    getInitialState: function() {
        // var cx = 200
        // var cy = 200
        // var r = cx/4
        // var circs = [<SVGCircle cx={numToPix(cx)} cy={numToPix(cy)} r={numToPix(r)} />]
        var circs = [];
        var staffRad = 50;
        var linkRad = 10;
        this.props.circData.forEach(function(circ) {
            var r = 0;
            if (circ.type == "staff") {
                r = staffRad;
            } else if (circ.type == "link") {
                r = linkRad;
            }

            var c = <SVGCircle onClick={this.clickCircle} text={circ.text} cx={numToPix(0)} cy={numToPix(0)} r={numToPix(r)}/>;
            circs.push(c)
        }.bind(this));
        return {
            circles: circs
        }
    },
    render: function() {
        checkCollisions();
        return (
            <div className="circlegroup">
                // <GoButton onClick={this.addCircle} val="GO"/>
                // <GoButton onClick={this.clearCircs} val="clear"/>
                <svg width={numToPix(this.props.width)} height={numToPix(this.props.height)} viewBox={"0 0 " + this.props.width + " " + this.props.height} version="1.1" xmlns="http://www.w3.org/2000/svg">
                    {this.state.circles}
                </svg>
            </div>
        )
    }
});


var pageElements = [
    {type: "staff", imgurl: "imgs/face.jpg", text: "Monto"},
    {type: "link", url: "/grid", text: "Grids"}
]

// <filter id=filter="url(#dropShadow)" cx={numToPix(boxwidth/2)} cy={numToPix(boxheight/2)} r={numToPix(boxwidth/4)}/>

// "dropShadow">
//   <feGaussianBlur in="SourceAlpha" stdDeviation="9" />
//   <feOffset dx="1" dy="0.3" />
//   <feMerge>
//       <feMergeNode />
//       <feMergeNode in="SourceGraphic" />
//   </feMerge>
// </filter>
// <SVGCircle
ReactDOM.render(
    <div>
        <CircleGroup width={400} height={400} circData={pageElements}/>
    </div>,
    document.getElementById('circles')
)
