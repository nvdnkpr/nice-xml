// Generated by CoffeeScript 1.6.3
var COMMON_CHAR_RANGE, Lexer, NAME_CHAR_RANGE, Range, SPACE_CHAR_RANGE, START_CHAR_RANGE, STATES, Token, isCommonChar, isNameChar, isSpace, isStartChar;

Range = require('./range');

SPACE_CHAR_RANGE = Range.union('\x20', '\x09', '\x0d', '\x0a');

COMMON_CHAR_RANGE = Range.union(new Range('\x01', '\ud7ff'), new Range('\ue000', '\ufffd'));

START_CHAR_RANGE = Range.union(':', '_', new Range('A', 'Z'), new Range('a', 'z'), new Range('\xc0', '\xd6'), new Range('\xd8', '\xf6'), new Range('\u00f8', '\u02ff'), new Range('\u0370', '\u037d'), new Range('\u037f', '\u1fff'), new Range('\u200c', '\u200d'), new Range('\u2070', '\u218f'), new Range('\u2c00', '\u2fef'), new Range('\u3001', '\ud7ff'), new Range('\uf900', '\ufdcf'), new Range('\ufdf0', '\ufffd'));

NAME_CHAR_RANGE = START_CHAR_RANGE.union('-', '.', '\xb7', new Range('0', '9'), new Range('\u0300', '\u036f'), new Range('\u203f', '\u2040'));

STATES = {
  START: 0,
  OPEN_BRACKET: 1,
  EXCLAMATION: 2,
  PI_START: 3,
  QUESTION: 4,
  PI_END: 5,
  PI_TARGET: 10,
  PI_CONTENT: 11
};

isSpace = function(value) {
  return SPACE_CHAR_RANGE.has(value);
};

isCommonChar = function(value) {
  return COMMON_CHAR_RANGE.has(value);
};

isStartChar = function(value) {
  return START_CHAR_RANGE.has(value);
};

isNameChar = function(value) {
  return NAME_CHAR_RANGE.has(value);
};

Token = (function() {
  Token.TYPES = {
    COMMENT_START: 1,
    CDATA_START: 2
  };

  Token.NAMES = {
    '1': 'COMMENT_START',
    '2': 'CDATA_START'
  };

  function Token(type, value) {
    this._type = type;
    this._value = value;
  }

  Token.prototype.toString = function() {
    return 'Token type ' + this._type;
  };

  return Token;

})();

Lexer = (function() {
  function Lexer() {
    this._state = STATES.START;
  }

  Lexer.prototype.run = function(text) {
    var char, index, state;
    index = 0;
    while (index < text.length) {
      char = text[index];
      switch (state) {
        case STATES.START:
          if (text[index] === '<') {
            state = STATES.OPEN_BRACKET;
          }
          break;
        case STATES.OPEN_BRACKET:
          if (current === '!') {
            state = STATES.EXCLAMATION;
          } else if (current === '?') {
            state = STATES.PI_TARGET;
            console.log('PI_START');
          } else if (isStartChar(current)) {
            state = STATES.NAME_REST;
          } else {
            console.log('Expected \'!\' or \'?\' but found \'' + text[index] + '\'');
            return;
          }
          break;
        case STATE.EXCLAMATION:
          if (index + 2 <= text.length && text.slice(index, index + 2) === '--') {
            console.log('COMMENT_START');
          } else if (index + 7 <= text.length && text.slice(index, index + 7) === '[CDATA[') {
            console.log('CDATA_START');
          } else {
            console.log('Expected Comment or CharData start');
            return;
          }
      }
      index++;
    }
    return void 0;
  };

  return Lexer;

})();

module.exports = {
  isStartChar: isStartChar,
  isNameChar: isNameChar
};
