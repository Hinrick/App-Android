import React, { Component, createContext } from 'react';
import produce from 'immer';

const myContext = createContext();

export default class Provider extends Component {
  setBalance = (count) => {
    this.setState(state => produce(this.state, (draftState) => {
      draftState.balanceStore.count = count;
    }));
  }

  setQuiz = (quizs) => {
    this.setState(state => produce(this.state, (draftState) => {
      draftState.quizStore.quizs = quizs;
    }));
  }

  state = {
    balanceStore: {
      count: 0,
      setBalance: this.setBalance
    },
    quizStore: {
      quizs: [],
      setQuiz: this.setQuiz
    },
  }

  render() {
    return (
      <myContext.Provider value={this.state}>
        {this.props.children}
      </myContext.Provider>
    );
  }
}

export const Consumer = (...stores) => (ComposedComponent) => {
  class ConsumerComponent extends Component {
    render() {
      return (
        <myContext.Consumer>
          { (context) => {
            if (stores.length === 0) return <ComposedComponent context={context} />;

            const newContext = Object.keys(context).reduce((acc, key) => {
              if (stores.includes(key)) return {...acc, [key]: context[key]};
                return acc;
            }, {});

            return <ComposedComponent context={newContext} {...this.props}/>;
           }
          }
        </myContext.Consumer>
      );
    }
  }
  return ConsumerComponent;
};