# eruda-loader

Simple to use a tool to inject the eruda module into your bundle.

## Features
* inject eruda code into the files that you need
* extend eruda with plugins
* config eruda with the "tool" option

## How to use

### Simple use

Install the eruda and eruda-loader packages
```javascript
npm install --save-dev eruda eruda-loader
```

Add eruda loader to the webpack config
```javascript
{
  module: {
    rules: [
      {
        test: /entry-name\.js/,
        use: 'eruda-loader'
      }
    ]
  }
}
```

In this case eruda will be injected into the files matching to the `/entry-name\.js/` pattern. An injected eruda instance also will be initialized automatically when the output bundle is executed.

> **_NOTE:_** The eruda-loader works only if the webpack is run in the "development" mode. 

### Tool configuration

Eruda-loader support the same option "tool" as the original eruda module.

```javascript
{
  module: {
    rules: [
      {
        test: /entry-name\.js/,
        use: {
          loader: 'eruda-loader',
          options: {
            tool: ['console', 'elements', 'snippets']
          }
        }
      }
    ]
  }
}
```

### Eruda plugins

To add eruda plugins you should install them and pass an array of their names to the option "plugin".
```console
npm install --save-dev eruda-dom eruda-code
```
```javascript
{
  module: {
    rules: [
      {
        test: /entry-name\.js/,
        use: {
          loader: 'eruda-loader',
          options: {
            plugin: ['eruda-dom', 'eruda-code']
          }
        }
      }
    ]
  }
}
```

> **_NOTE:_** Current version of the eruda-loader doesn't support the plugins "eruda-benchmark" and "eruda-geolocation". It is related with specific behaviour of these plugins and we hope to fix these problems in the future.
