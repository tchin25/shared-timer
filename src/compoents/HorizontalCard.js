import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './HorizontalCard.scss'

class HorizontalCard extends Component {
    constructor(props) {
        super(props);
    }

    getStyles = () => {
        return {
            card: {width: this.props.width},
            img: {width: this.props.width},
        }
    }

    render() {
        return (
            <div className="card" style={this.getStyles().card}>
                <img src={this.props.img} alt="Avatar" className="card__img" style={this.getStyles().img}/>
                <div className="container">
                    <h4 className="card__title"><b>{this.props.title}</b></h4> 
                    <p className="card__body">{this.props.body}</p> 
                </div>
            </div>
        );
    };
}

Card.defaultProps = {
    width: '20 em',
    title: 'John Doe',
    body: 'Architect & Engineer',
    img: 'https://www.w3schools.com/howto/img_avatar.png'
}

Card.propTypes = {
    width: PropTypes.string
}

export default Card