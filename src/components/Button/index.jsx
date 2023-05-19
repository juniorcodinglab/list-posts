import './style.css';

import { Component } from "react";

export class Button extends Component {
    
    render() {
        const {text, showMore, disabled} = this.props;

        return (
            <button
                onClick={showMore}
                disabled={disabled}>
                {text}
            </button>
        )
    }
}