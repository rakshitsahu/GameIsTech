const JSSoup = require('jssoup').default
var soup = new JSSoup('<html><head>hello</head></html>');
var tag = soup.findAll('html')

console.log(tag[0].contents)