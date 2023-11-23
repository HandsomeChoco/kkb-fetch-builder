# kkb-fetch-builder

Frontend network request library based on builder design pattern and fetch api.   
currently it doesn't working with script embedded in HTML file.

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
you can specify method type with call `get(), post(), put(), patch(), delete()` methods.
also each method can receive path parameter 

> * default method is `get`, when you don't specify method type. but also you can explicity method type to `get`.
> * method call sequence doesn't matter. but, `send()` have to be end of the chaining. 

```ts
// get request to http://example.com:3000/something/
export const getSomething = async () => await api.endpoint("/something").send();

// post request
export const addSomething = async () => await api.endpoint("/something").post().send();

// put request
export const modifySomething = async () => await api.endpoint("/something").put().send();

// patch request
export const patchSomething = async () => await api.endpoint("/something").patch().send();

// delete request
export const deleteSomething = async () => await api.endpoint("/something").delete().send();

```

## Set body and headers
Pass same argument how `body` and `header` of fetch api option object is filled.

> You don't need to serialize parameter of `jsonBody` method and 'Content-Type': 'application/json' in header object.

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
                body object here. 
            */
        })
        .send()
```

## add query string paremeter

```ts
// get request to http://localhost:3000/something/1?key1=value&key2=value

export const getSomethingWithQuery = async () =>
    await api
        .endpoint("/something")
        .get("1")
        .queries(
            ["key1=value", "key2=value", ..., ]
        )
        .send()
```

That's it!







