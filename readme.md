# kkb-fetch-builder

Frontend network request library based on builder design pattern and fetch api

## install

```bash
# npm
$ npm install kkb-fetch-builder

# yarn
$ yarn add kkb-fetch-builder
```

## import

import `ApiBuilder` from `kkb-fetch-builder`.   
then pass base url in constructor 

```ts
// api.ts

import ApiBuilder from "kkb-fetch-builder";

const api = new ApiBuilder("http://example.com:3000")
```

## set endpoint and send request

call `endpoint()` method and pass detail url in parameter.   
this request is sent with `get` method default.

method call sequence is doesn't matter.   
but, `send()` method is have to be end of the chaining. 
```ts
// get request
export const getSomethings = async () => await api.endpoint("/something").send();

// post request
export const addSomething = async () => await api.endpoint("/something").post().send();

// put request
export const modifySomething = async () => await api.endpoint("/something").put().send();

// patch request
export const patchSomething = async () => await api.endpoint("/something").patch().send();

// delete request
export const deleteSomething = async () => await api.endpoint("/something").delete().send();

```

## set body and headers
you can also set body content and header.
pass argument like how `body` and `header` of fetch api option filled.
```ts

export const requestWithPayload = async () =>
    await api
        .endpoint("/something")
        .post()
        .header({
            /* header options object here */
        })
        .jsonBody({
            /* 
                body object here. it serialize automatically in the method.
                also not neccessary to explicity content-type: application/json in hedaer method
            */
        })
        .send()
```

## add query string paremeter

```ts
export const requestWithQuery = async () =>
    await api
        .endpoint("/something")
        .queries(
            ["key1=value", "key2=value", ..., ]
        )
        .send()
```

That's it!







