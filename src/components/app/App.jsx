import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import '../../style/style.scss'
import decoration from '../../resources/img/vision.png';
import { Component } from "react";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import React from "react";

class App extends Component {
    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }
    

    render() {
        return (
            <div className="app">
                <AppHeader/>
                
                <main>
                    <ErrorBoundary>
                        <RandomChar/>
                    </ErrorBoundary>

                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onCharSelected={this.onCharSelected}/>
                        </ErrorBoundary>

                        <ErrorBoundary>
                            <CharInfo selectedChar={this.state.selectedChar}/>
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }

}

// const Card = () => {
//     return (
//         <div style={{
//             'display' : 'flex',
//             'background' : 'grey',
//             'width' : 'fit-content',
//             'flexWrap' : 'wrap'
//         }}>
//             <Counter 
//                 renderCountMessage={counter => (
//                     <CounterMessage counter={counter} />
//                 )}

//                 renderTextMessage={text => (
//                     <TextMessage text={text} />
//                 )}
//             />
//         </div>
//     )
// }

// class Counter extends Component {
//     state = {
//         count: 0,
//         text: ''
//     }

//     increment = () => {
//         this.setState(({count}) => ({
//             count: count + 1
//         }))
//     }

//     decrement = () => {
//         this.setState(({count}) => ({
//             count: count - 1
//         }))
//     }

//     handelText = (e) => {
//         this.setState(() => {
//             return {
//                 text: e.target.value
//             }
//         })
//     }

    
//     render() {
//         return (
//             <div>
//                 {this.props.renderCountMessage(this.state.count)}
//                 {this.props.renderTextMessage(this.state.text)}
//                 <input 
//                     value={this.state.text}
//                     onChange={this.handelText}/>
//                 <button onClick={this.increment}>incr</button>
//                 <button onClick={this.decrement}>decr</button>
//             </div>
//         )
//     }
// }

// const CounterMessage = ({counter}) => {
//     return (
//         <div style={{
//             'margin' : '10px',
//             'padding' : '10px',
//             'border' : '2px solid black',
//             'width' : 'fit-content',
//             'background' : 'white'
//         }}>
//             {counter}
//         </div>
//     )
// }


// const TextMessage = ({text}) => {
//     return (
//         <div style={{
//             'margin' : '10px',
//             'padding' : '10px',
//             'border' : '2px solid black',
//             'width' : 'fit-content',
//             'background' : 'white'
//         }}>
//             {text}
//         </div>
//     )
// }




// const Test = (props) => {
//     return (
//         <div className="container">
//             <div>
//                 {props.left}
//             </div>
//             <div>
//                 {
//                     React.Children.map(props.right, child => {
//                         return React.cloneElement(child, {className: 'childrens'})
//                     })
//                 }
//             </div>
//         </div>
//     )
// }

export default App;