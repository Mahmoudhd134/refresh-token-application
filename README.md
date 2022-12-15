# refresh-token-application

# [FIXED]


I have a problem I can't solve

when i refresh token it do refresh but the request faild with status 401 which I want to resend is always throw an error

put if I do the same action (which at the end will send a requset to the end point requered authenticated request) it
workd

so,

1- I login

2- after amount of time the token expired

3- get new token with refresh token(which is the http only cookie)

4- save the new token (in the localstorage or application state (I tried both))

5- resend the original request

6- a domExeption is thrown

7- tryied to go to the same end point which trow the domExeption again

8- it works

9- go to strp two again

so if I go to the same end point again after error it works

but I must go to it manually

the app throw an exeption when it trying to resend the request whene the new access token is obtained

I'm using axios 1.1.3

react 18.2.0

for the backend

asp.net core api

Uncaught (in promise) DOMException: Failed to execute 'setRequestHeader' on 'XMLHttpRequest': 'function(header, parser)
{
header = normalizeHeader(header);
if (!header)
return void 0;
const key = findKey(this, header);
if (key) {
const value = this[key];
if (!parser) {
return value;
}
if (parser === true) {
return parseTokens(value);
}
if (utils_default.isFunction(parser)) {
return parser.call(this, value, key);
}
if (utils_default.isRegExp(parser)) {
return parser.exec(value);
}
throw new TypeError("parser must be boolean|regexp|function");
}
}' is not a valid HTTP header field value.
at setRequestHeader (http://127.0.0.1:5173/node_modules/.vite/deps/axios.js?v=6cf6ceef:1209:17)
at Object.forEach (http://127.0.0.1:5173/node_modules/.vite/deps/axios.js?v=6cf6ceef:89:10)
at dispatchXhrRequest (http://127.0.0.1:5173/node_modules/.vite/deps/axios.js?v=6cf6ceef:1208:21)
at new Promise (<anonymous>)
at xhrAdapter (http://127.0.0.1:5173/node_modules/.vite/deps/axios.js?v=6cf6ceef:1112:10)
at Axios.dispatchRequest (http://127.0.0.1:5173/node_modules/.vite/deps/axios.js?v=6cf6ceef:1425:10)
at async http://127.0.0.1:5173/src/Profile.tsx?t=1667476611192:26:24
