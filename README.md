# catalogo-arbores-senlleiras

# Reglas Realtime Database Firebase
{
  "rules": {
    ".read": "now < 1645657200000",  // 2022-2-24
    ".write": "now < 1645657200000",  // 2022-2-24
  }
}

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
