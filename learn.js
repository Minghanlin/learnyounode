// PART 1
//console.log("HELLO WORLD");

// PART 2
// var a = process.argv.slice(2);
// var sum = 0;
//
// for (var i in a) {
//   sum += +(a[i]);
//
// }
//
// console.log(sum);

// PART 3
// var fs = require('fs');
//
// file = fs.readFileSync(process.argv[2]);
// contents = file.toString();
//
// console.log(contents.split('\n').length - 1);
//

// PART 4
// var fs = require('fs'),
//     filename = process.argv[2];
//
//
// var countLines = function (err, data) {
//
//    if (err) { throw err; }
//    console.log(data.split('\n').length - 1);
// };
//
// fs.readFile(filename, 'utf8', countLines);

// PART 5
// var fs = require('fs');
//
// var args = process.argv.slice(2, 4),
//     path = args[0],
//     filter = args[1];
//
// var ext = new RegExp('\\.' + filter + '$');
//
//
// var matching = function (d) {
//
//     return ext.test(d);
// };
//
//
// var printFiltered = function (err, list) {
//
//     list.sort()
//         .filter(matching)
//         .forEach(function (f) {
//
//             console.log(f);
//         });
// };
//
// fs.readdir(path, printFiltered);


// PART 6
// var match = require('filter'),
//     path = process.argv[2],
//     filter = process.argv[3];
//
//
// match(path, filter, function (err, list) {
//
//     if (err) {
//         return console.error(err);
//     }
//
//     list.forEach(function (dir) {
//
//         console.log(dir);
//     });
// });

// PART 7
// var http = require('http'),
//     url = process.argv[2];
//
//
// var done = function (response) {
//
//     response.setEncoding('utf8');
//     response.on('error', console.error);
//     response.on('data', console.log);
// };
//
//
// http.get(url, done);

// PART 8
// var http = require('http'),
//     url = process.argv[2];
//
//
// var done = function (response) {
//
//     var data = '';
//     response.setEncoding('utf8');
//     response.on('error', console.error);
//     response.on('data', function (d) {
//
//         data += d;
//     });
//     response.on('end', function () {
//
//         console.log(data.length);
//         console.log(data);
//     });
// };
//
//
// http.get(url, done);

// PART 9
// var http = require('http'),
//     urls = process.argv.slice(2),
//     results = {},
//     count = 0;
//
//
// var print = function (results) {
//
//     for (var i = 0; i < 3; ++i) {
//         console.log(results[i]);
//     }
// };
//
//
// var task = function (i) {
//
//     http.get(urls[i], function (resp) {
//
//         var data = '';
//         resp.setEncoding('utf8');
//         resp.on('error', console.error);
//         resp.on('data', function (d) {
//
//             data += d;
//         });
//
//         resp.on('end', function () {
//
//             results[i] = data;
//             count += 1;
//             if (count === 3) {
//                 print(results);
//             }
//         });
//     });
// };
//
//
// for (var i = 0; i < 3; ++i) {
//     task(i);
// }

// PART 10
// var net = require('net'),
//     strftime = require('strftime'),
//     port = process.argv[2];
//
//
// var feed = function (socket) {
//
//     return socket.end(strftime('%Y-%m-%d %H:%M'));
// };
//
//
// net.createServer(feed).listen(port);

// PART 11
// var fs = require('fs'),
//     http = require('http'),
//     port = process.argv[2],
//     file = process.argv[3];
//
//
// var connect = function (req, res) {
//
//     res.writeHead(200, { 'content-type': 'text/plain' });
//     return fs.createReadStream(file).pipe(res);
// };
//
// http.createServer(connect).listen(port);

// PART 12
// var map = require('through2-map'),
//     http = require('http'),
//     port = process.argv[2];
//
//
// var upcase = function (chunk) {
//
//     return chunk.toString().toUpperCase();
// };
//
//
// var connect = function (req, res) {
//
//     if (req.method === 'POST') {
//         return req.pipe(map(upcase)).pipe(res);
//     }
// };
//
// http.createServer(connect).listen(port);

// PART 13
var http = require('http'),
    url = require('url'),
    port = process.argv[2];


var connect = function (req, res) {

    var parsed = url.parse(req.url, true),
        date = new Date(parsed.query.iso),
        result = '';

    if (/api\/parsetime/.test(req.url)) {

        result = {
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds()
        };

    } else if (/api\/unixtime/.test(req.url)) {

        result = {
            unixtime: date.getTime()
        };
    }

    res.writeHead(200, {
        'Content-Type': 'application/json'
    });

    return res.end(JSON.stringify(result));
};

http.createServer(connect).listen(port);
