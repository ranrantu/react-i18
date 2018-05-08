import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {languageMap, translate, middleware} from '../src/core/translate';
import TranslateWrapper from '../src/core/TranslateWrapper';
import {Provider} from "../src/core/context";
import '../src/core/translateTag.jsx';

// 控制字符反转
// middleware.afterRender = (content) => {
//     return content.split('').reverse().join('');
// }

class App extends Component {
    constructor(...args) {
        super(...args);
    }

    componentWillMount() {
        this.fetchTranslateList();
    }

    fetchTranslateList() {
        // 模拟请求获得翻译列表 1s后开始翻译
        setTimeout(() => {
            languageMap["en"] = {
                '你好': 'Hello',
                '国际化': 'intl',
            };
            this.setState({});
        }, 1000)
    }

    render() {
        return <Provider value={{
            language: 'en'
        }}>
            <div data-translate>
                你好
                <TranslateWrapper>
                    <span>你好
                        <span>你好</span>
                    </span>
                </TranslateWrapper>
            </div>
        </Provider>
    }
}

ReactDom.render(<App/>, document.body.appendChild(document.createElement('div')));