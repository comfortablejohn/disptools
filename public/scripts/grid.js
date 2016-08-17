/*
 *
 *  Dynamically render a grid of boxes with image + info content.
 *
 *  UI Heirarchy:
 *
 *  GRID
 *    |
 *    |- - - BOX
 *    |       |
 *    |       |- - INFOBOX
 *    |       |
 *    |       |
 *    |       |- - IMGBOX
 */

var Grid = React.createClass({
    render: function() {
        var rows = []

        this.props.data.forEach( function(box) {
            var row = <Box data={box} />
            rows.push(row);
        }.bind(this));

        return (
            <div className="grid">
                {rows}
            </div>
        );
    }
});

var Box = React.createClass({
    render: function() {
        console.log(this.props.data.info);
        return (
            <div className="box">
                <ImgBox imgurl={this.props.data.imgurl} />
                <InfoBox info={this.props.data.info} />
            </div>
        );
    }
});

var InfoBox = React.createClass({
    render: function() {
        var rows = [];
        var price = this.props.info.price ? this.props.info.price : null;

        if (this.props.info.desc) {
            rows.push(this.props.info.desc);
        }
        return (
            <div className="infoBox">
                <div className="info">
                    <p className="price">{price}</p>
                    <h3 className="suburb">{this.props.info.suburb}</h3>
                </div>
                <div className="desc">
                    <em>{rows}</em>
                </div>
            </div>
        )
    }
});

var ImgBox = React.createClass({
    render: function() {
        var imgstyle = {
            width: '350px'
        };
        return (
            <img src={this.props.imgurl} style={imgstyle} />
        );
    }
});

var data = [
    {imgurl: "https://static.wixstatic.com/media/4e3c0b_20da0f9b0670494bad73047eb0ffc7ce.jpg/v1/fill/w_385,h_260,al_c,q_80,usm_0.66_1.00_0.01/4e3c0b_20da0f9b0670494bad73047eb0ffc7ce.jpg", info: {price: "$4,000,000", suburb: "Myaree", desc: "Commercial"}},
    {imgurl: "https://static.wixstatic.com/media/4e3c0b_69d6157f41a549629f8d6b5ae21af2fc.jpeg/v1/fill/w_387,h_260,al_c,q_80,usm_0.66_1.00_0.01/4e3c0b_69d6157f41a549629f8d6b5ae21af2fc.jpeg", info: {price: "$5,000,000", suburb: "Canning", desc: "Commercial"}},
    {imgurl: "https://static.wixstatic.com/media/4e3c0b_7f2e8148109540b0b9196a38dd00d163~mv2.jpg/v1/fill/w_395,h_291,al_c,q_80,usm_0.66_1.00_0.01/4e3c0b_7f2e8148109540b0b9196a38dd00d163~mv2.jpg", info: {price: "$1,000,000", suburb: "Bunbury", desc: "Residential"}},
    {imgurl: "https://static.wixstatic.com/media/4e3c0b_7f0f7892a4044f0e93af525806d6a7a3.jpg/v1/fill/w_385,h_260,al_c,q_80,usm_0.66_1.00_0.01/4e3c0b_7f0f7892a4044f0e93af525806d6a7a3.jpg", info: {price: "$800,000", suburb: "Perth", desc: "Commercial"}},
    {imgurl: "https://static.wixstatic.com/media/4e3c0b_3c94b074ab9c4c2ebea6d0dbd23c2301.jpg/v1/fill/w_413,h_305,al_c,q_80,usm_0.66_1.00_0.01/4e3c0b_3c94b074ab9c4c2ebea6d0dbd23c2301.jpg", info: {price: "$2,800,000", suburb: "Jandakot", desc: "Residential"}}
]

ReactDOM.render(
        <Grid data={data}/>,
        document.getElementById('grid')
);
