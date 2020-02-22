# NativeScript theme switcher with Webpack

This project is an example implementation of the [nativescript-themes plugin](https://www.npmjs.com/package/nativescript-themes/v/2.0.1) with [Webpack](https://webpack.js.org/). 

The application will should look like the following on your mobile device: <br>
<p align="center">
<img src="https://i.imgur.com/j6117Pb.gif" width="250"/>
</p>

## Build with
This project is build with the following technologies

- [Angular](https://angular.io/) - The web framework used
- [Webpack](https://webpack.js.org/) - The project's module bundler
- [NativeScript](https://www.nativescript.org/) - The framework used to run the application on mobile devices
- [TypeScript](https://www.typescriptlang.org/) - The programming language used
- [Scss](https://sass-lang.com/) - The styling language used

## Getting started
In order to get the application up and running you need do the following steps: 

### 1) Installation
The first step in getting the application setup is installing all the project's dependencies. To do this run: 
```bash
npm install
```

### 2) Running the application
After you have installed the dependencies you can run the application via the command below. 
Do note that in order for this to work you need to have a mobile device connected or an emulator setup! 
```bash
tns run android
```

This project was not created with the `--shared` flag. Due to this you can only develop on a mobile device or emulator and not in your browser.
The reason for this is that the theme switcher doesn't work in the browser.

### 3) Debugging the application
You can also debug the application via the command below:
```bash
tns debug android
```

With this command Console messages and errors will appear in the terminal. Do note that this command will also provide a link 
that will enable debugging in the chrome inspector (see the command output for the link).

## Webpack implementation
The most important part of this application is the `CopyWebpackPlugin` configuration. With this configuration we can add theme files to our build folder, which we can use to change themes within the application. 
The configuration looks as follows:
```typescript
const sass = require("node-sass");

......

new CopyWebpackPlugin([
    {
        from: {glob: "styles/themes/*.scss"},
        to: 'assets/themes/[name].css',
        transform(content, path) {
            const result = sass.renderSync({file: path});
            return result.css.toString();
        },
    },
    { from: { glob: "fonts/**" } },
    { from: { glob: "**/*.jpg" } },
    { from: { glob: "**/*.png" } },
], { ignore: [`${relative(appPath, appResourcesFullPath)}/**`] }),
```

### What does this configuration do? 
First we are telling the copy plugin to copy all theme files that have the `.scss` extension to our build folder `assets/themes/` (this matches the `THEME_PATH` property in our `ThemeService`). The name (`[name].css`) will be replaced by the plugin with the original name. 

The transform function uses `node-sass` to convert the scss styling into css, since scss cannot be used directly in the browser. 

## Versioning
We use [SemVer](https://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/RobinvanTienhoven/nativescript-themeswitch/tags)
 
## Licence 
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT)
