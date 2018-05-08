import React, {Component} from 'react';
import {translate} from './translate';
import {Consumer} from "./context";

class TranslateWrapper extends Component {
    constructor(...args) {
        super(...args);
    }

    renderElement = (target) => {
        const child = target.props.children;
        if (typeof child === 'string') {
            return translate(child,this.props.language);
        }
        target = child && child.map(item => {
            if (typeof item === 'string') {
                return translate(item,this.props.language);
            }
            return this.renderElement(item);
        });
        return target;
    }

    render() {
        let children = this.props.children;
        children = this.renderElement(children);
        return <div>
            {children}
        </div>;
    }
}

export default props => (
    <Consumer>
        {context => <TranslateWrapper {...props} language={context.language}/>}
    </Consumer>
)
