let source = 'dist';
if(+process.env.JS_VERSION === 6){
    source = 'src';
    require('babel-register');
}
const runTest = require('ava');
const FA = require(`../${source}/Automata/FA/FA`).default;
const fullAlphabetDeletion = require(`../${source}/operations/fullAlphabetDeletionFA`).default;
const Alphabet = require(`../${source}/Automata/Alphabet`).default;


let plain1 = {
    states: [{name: 'q0'}, {name: 'q1'}],
    alphabet: ['a', 'b', 'c'],
    rules: [
        {
            from: {state: {name: 'q0'}},
            to: {state: {name: 'q0'}},
            symbol: 'b',
        },
        {
            from: {state: {name: 'q0'}},
            to: {state: {name: 'q1'}},
            symbol: 'a',
        },
        {
            from: {state: {name: 'q1'}},
            to: {state: {name: 'q1'}},
            symbol: 'c',
        },
    ],
    finalStates: [{name: 'q1'}],
    initialState: {name: 'q0'}
};



runTest('simple', test => {
    let automata = fullAlphabetDeletion(new FA(plain1), new Alphabet(...['a']));
    test.true(automata.accepts('bc'));
    test.true(automata.accepts('bbbc'));
    test.true(automata.accepts('bcccc'));
    test.true(automata.accepts('c'));
    test.true(automata.accepts(''));

    test.false(automata.accepts('bac'));


    automata = fullAlphabetDeletion(new FA(plain1), new Alphabet(...['b']));
    test.true(automata.accepts('ac'));
    test.true(automata.accepts('acccc'));
    test.true(automata.accepts('a'));

    test.false(automata.accepts('c'));
    test.false(automata.accepts('bac'));

    automata = fullAlphabetDeletion(new FA(plain1), new Alphabet(...['c']));
    test.true(automata.accepts('ba'));
    test.true(automata.accepts('bbbba'));
    test.true(automata.accepts('a'));
    test.false(automata.accepts('b'));
    test.false(automata.accepts('bac'));
});
