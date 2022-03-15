# please find something to change here

First of all you need to install all develoment dependencies:  
```
> yarn
```

## development build from source

Will watch any relevant change in the source folder (tests included) and will run the tests all the times.

Run
```
> yarn start
```
a test folder will be created in the root; all source file are watched and will trigger the unminified build of the `dist/index.js` and a development server will serve ssome demos on [http://localhost:3001](http://localhost:3001).

While this watched build is running it is also possible to lauch a couple of tests riunning  
```
> yarn test
```


## distribution build
```
> yarn build 
```
this will not go in watch mode and will output the minified version of `dist/index.js`
