import React,{Component} from 'react';
import {languageMap,translate} from "./translate";
import {Consumer} from "./context";

const createElement = React.createElement;

class Translate extends React.Component {
    constructor(...args){
        super(...args);
    }

    render() {
        return translate(this.props.text,'en');
    }
}

class InputTrans extends Component {

    render() {
        let props = Object.assign({}, this.props);
        if (this.props.language && props.placeholder) {
            if (languageMap[this.props.language]) {
                if (/[^\u4e00-\u9fa5]/g.test(props.placeholder)) {
                    props.placeholder = props.placeholder.replace(/([\u4e00-\u9fa5]+)/g, (match) => {
                        return languageMap[this.props.language][match] ? languageMap[this.props.language][match] : match
                    })
                } else {
                    languageMap[this.props.language][props.placeholder] && (props.placeholder = languageMap[this.props.language][props.placeholder]);
                }
            }
        }
        return <input {...props} ref="input" data-translated onInput={e => {this.value = e.target.value; this.props.onInput && this.props.onInput(e);}}>{this.props.children}</input>
    }
}

React.createElement = (...args) => {
    let children = args.slice(2);

    children = children.map(child => {
        if (typeof child === 'string' && args[1] && args[1]['data-translate']) {
            return <Consumer>
                {context => <Translate text={child} language={context.language}/>}
            </Consumer>
        }
        return child;
    });

    return createElement(args[0], args[1], ...children);
};
