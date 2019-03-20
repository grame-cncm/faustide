// Create your own language definition here
// You can safely look at other samples without losing modifications.
// Modifications are not saved on browser refresh/close though -- copy often!
return {
    // Set defaultToken to invalid to see what you do not tokenize yet
    // defaultToken: 'invalid',
  
    defaultToken: 'invalid',
      tokenPostfix: '.dsp',
  
    keywords: [
      'import', 'component', 'declare', 'library', 'environment', 'int', 'float', 
      'letrec', 'with', 'class', 'process', 'effect', 'inputs', 'outputs'
    ],
  
    sysFunctions: [
      'mem', 'prefix', 'rdtable', 'rwtable', 
      'select2', 'select3', 'ffunction', 'fconstant', 'fvariable', 
      'button', 'checkbox', 'vslider', 'hslider', 'nentry', 
      'vgroup', 'hgroup', 'tgroup', 'vbargraph', 'hbargraph', 'attach', 
      'acos', 'asin', 'atan', 'atan2', 'cos', 'sin', 'tan', 'exp', 
      'log', 'log10', 'pow', 'sqrt', 'abs', 'min', 'max', 'fmod', 
      'remainder', 'floor', 'ceil', 'rint', 
      'seq', 'par', 'sum', 'prod'
    ],
  
    compOperators: [
      '~', ',', ':', '<:', ':>'
    ],
  
    operators: [
      '=',
      '+', '-', '*', '/', '%', '^', 
      '&', '|', 'xor', '<<', '>>',
      '>', '<', '==', '<=', '>=', '!=',
      '@', '\''
    ],
  
    // we include these common regular expressions
    symbols:  /[=><!~?:&|+\-*\/\^%]+/,
  
    // C# style strings
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  
    // The main tokenizer for our languages
    tokenizer: {
      root: [
        // identifiers and keywords
        [/!|_/, 'keyword'], // Wire
        [/[a-z_$][\w$]*/, { cases: {
          '@sysFunctions': 'constant',
          '@keywords': 'keyword',
          '@default': 'identifier'
        } }],
        [/[A-Z][\w\$]*/, 'type.identifier' ],  // to show class names nicely
  
        // whitespace
        { include: '@whitespace' },
  
        // delimiters and operators
        [/[{}()\[\]]/, '@brackets'],
        [/~|,|<:|:>|:/, 'delimiter'],
        [/[<>](?!@symbols)/, '@brackets'],
        [/=|\+|\-|\*|\/|%|\^|&|\||xor|<<|>>|>|<|==|<=|>=|!=|@|'/, { cases: {
          '@operators': 'delimiter',
          '@default'  : '' 
        } }],
  
        // numbers
        [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
        [/0[xX][0-9a-fA-F]+/, 'number.hex'],
        [/\d+/, 'number'],
  
        // delimiter: after number because of .\d floats
        [/[;.]/, 'delimiter'],
  
        // strings
        [/"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
        [/"/,  { token: 'string.quote', bracket: '@open', next: '@string' } ],
  
      ],
  
      comment: [
        [/[^\/*]+/, 'comment' ],
        [/\/\*/,    'comment', '@push' ],    // nested comment
        ["\\*/",    'comment', '@pop'  ],
        [/[\/*]/,   'comment' ]
      ],
  
      string: [
        [/[^\\"]+/,  'string'],
        [/@escapes/, 'string.escape'],
        [/\\./,      'string.escape.invalid'],
        [/"/,        { token: 'string.quote', bracket: '@close', next: '@pop' } ]
      ],
  
      whitespace: [
        [/[ \t\r\n]+/, 'white'],
        [/\/\*/,       'comment', '@comment' ],
        [/\/\/.*$/,    'comment'],
      ],
    },
  };
  