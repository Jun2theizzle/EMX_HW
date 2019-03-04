'use strict';

module.exports.emx = async (event, context) => {
  let body = "";

  const q = event.queryStringParameters.q;
  if (q == 'Ping') {
    body = 'OK';
  }
  if (q == 'Source') {
    body = 'https://github.com/Jun2theizzle/EMX_HW';
  }

  if (q == 'Referrer') {
    body = 'Angellist';
  }

  if (q == 'Status') {
    body = 'yes';
  }

  if (q == 'Puzzle') {
    body = doPuzzle(event.queryStringParameters.d);
  }

  if (q == 'Position') {
    body = 'Software Engineer';
  }

  if (q == 'Email Address') {
    body = 'junnobaka@gmail.com';
  }

  if (q == 'Years') {
    body = '4';
  }

  if (q == 'Phone') {
    body = '312-927-0882';
  }

  if (q == 'Degree') {
    body = 'Bachelors of Computer Science from University of Illinos at Urbana-Champaign';
  }

  if (q == 'Name') {
    body = 'Johnny Cheng';
  }

  if (q == 'Resume') {
    body = 'https://github.com/Jun2theizzle/EMX_HW/blob/master/Johnny%20Cheng%20Resume%20Current%20-%20Google%20Docs.pdf';
  }

  return {
    statusCode: 200,
    body: body
  };

};

function doPuzzle(queryString) {
  let fixed = queryString.replace('Please solve this puzzle:\n ABCD\n', '');
  const input = fixed.split('\n');
  const A = input[0];
  const B = input[1];
  const C = input[2];
  const D = input[3];

  const uniques = [getUnique(A), getUnique(B), getUnique(C), getUnique(D)];

  const table = getInitialTable();
  // find the unique ones for each row
  // for reach row if not '=' initialize all to that symbol

  for(let i = 0; i < 4; i++) {
    const unique = uniques[i];
    if(unique.symbol == '=') {
      table[i][0] = getOpposite(table[0][i]);
      table[i][1] = getOpposite(table[1][i]);
      table[i][2] = getOpposite(table[2][i]);
      table[i][3] = getOpposite(table[3][i]);
    }
    else {
      table[i][unique.position] = unique.symbol;
      table[unique.position][i] = getOpposite(unique.symbol);

      for (let j = 0; j < 4; j++) {
        if (table[i][j] == '-') {
          table[i][j] = unique.symbol;
        }
      }

      table[0][i] = getOpposite(table[i][0]);
      table[1][i] = getOpposite(table[i][1]);
      table[2][i] = getOpposite(table[i][2]);
      table[3][i] = getOpposite(table[i][3]);
    }
  }

  const res = concatTable(table);
  return res;
}

function concatTable(table) {
  return ' ABCD\n' + 
        `A${table[0].join('')}\n` + 
        `B${table[1].join('')}\n` + 
        `C${table[2].join('')}\n` + 
        `D${table[3].join('')}\n`;
}

function getUnique(input) {
  for (let i = 1; i < input.length; i++) {
    if (input[i] != '-') {
      return {
        position: i - 1,
        symbol: input[i]
      }
    }
  }
  return {};
}

function getOpposite(symbol) {
  if(symbol == '>') {
    return '<'
  }
  if(symbol == '<') {
    return '>';
  }

  if(symbol == '='){
    return '=';
  }

  return '-';
}

function getInitialTable() {
  return [
    ['=', '-', '-', '-'],
    ['-', '=', '-', '-'],
    ['-', '-', '=', '-'],
    ['-', '-', '-', '=']    
  ]
}