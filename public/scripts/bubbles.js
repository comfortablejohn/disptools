//
// We'll just start with a single bubble element, then
// work on making a bubble group/stack

function randomNum(min, max) {
    return Math.random() * (max - min) + min;
}

var Bubble = React.createClass({
    handleClick: function() {
        $.ajax({
            url: "/clickbubble",
            data: this.props.width,
            dataType: 'json',
            success: function(data) {
                console.log(data);
            }.bind(this)
        });
    },
    render: function() {
        // make a random size for testing
        // var x = randomNum(100, 400)
        // var w = Math.round(x) + "px"
        // var h = w



        // position title deep in bubble
        // first need to get numerical value for width
        var halfW = Math.round(parseInt(this.props.width.slice(0, -2))/2) + "px"
        var titleStyle = {
            top: halfW
        }

        var bubstyle = {
            width: this.props.width,
            height: this.props.height
            // left: this.props.x,
            // top: this.props.y,
            // marginRight: halfW
        };
        return (
                <div className="grid-item bubble" onClick={this.handleClick} style={bubstyle}>
                    <div className="bubbleTitle" style={titleStyle}>
                        {this.props.width}
                    </div>
                </div>
        );
    }
});

/**
 * layout bubbles in a div so they don't interfere, but
 * appear loose.
 * First attempt will lay them out radially.
 */
var BubbleGroup = React.createClass({
    componentDidMount: function() {
        console.log("mounted");
        msnryInit(200);
    },
    render: function() {
        // make some bubbles for test data
        var bubbles = []
        var w = 0
        for (var i = 0; i < 5; i++) {
            w = Math.round(randomNum(100, 400)) + "px"
            bubbles.push(<Bubble width={w} height={w} x={w} y={w}/>)
        }
        return (
            <div className=" grid bubbleGroup">
                {bubbles}
            </div>
        );
    }
})

// excellent dynamic grid package http://masonry.desandro.com/
function msnryInit(width, gutt) {
    if (!gutt) gutt = 0;
    var elem = document.querySelector('.grid');
    var msnry = new Masonry( elem, {
      // options
      gutter: gutt,
      itemSelector: '.grid-item',
      columnWidth: width
    });
}

//
// class StaffBubble extends Bubble {
//     constructor(props) {
//         super(props);
//         this.
//     }
//
//     render() {
//
//     }
// }

ReactDOM.render(
    <div>
        <BubbleGroup />
    </div>,
    document.getElementById('bubbles')
)
