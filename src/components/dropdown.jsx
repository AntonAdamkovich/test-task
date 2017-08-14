import React from 'react';
import PropTypes from 'prop-types';

export default class Dropdown extends React.Component {
    static propTypes = {
        defaultHeader: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.string).isRequired,
        cb: PropTypes.func.isRequired,
    }

    static defaultProps = {
        defaultHeader: '',
    }

    constructor(props) {
        super(props);
        this.state = {
            header: props.defaultHeader,
        };
    }
    handleClick = (event) => {
        const newHeader = event.target.innerHTML;
        this.props.cb(newHeader);
        this.setState(() => ({ header: newHeader }));
    }

    render() {
        const currentHeader = this.state.header || this.props.items[0];
        const items = this.props.items.filter(item => item !== currentHeader)
            .map(item => (<li onClick={this.handleClick} key={item}>{item}</li>));
        return (
            <div className="dropdown-wrapper">
                <span>{currentHeader}</span>
                <ul className="dropdown">
                    {items}
                </ul>
            </div>
        );
    }
}
