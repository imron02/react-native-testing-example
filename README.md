# React Native Testing
This is a simple project to show how testing work in React Native using 
the [React Native Testing Library](https://callstack.github.io/react-native-testing-library/).
This project consists of a mobile application (FE) and a server (BE) which can be 
downloaded here [UnitTest-Backend](https://github.com/imron02/unittest-backend-example).

### Instalation
Before start this project, make sure you already clone and running BE project which
I've mentioned above.

To run project please clone and install the dependencies.
```sh
$ git clone https://github.com/imron02/react-native-testing-example.git
$ cd react-native-testing-example
$ yarn install
```

#### Build and running for iOS
Before build and run to ios, we must install cocoapods package.
```shell
$ npx pod-install
```
After all package is installed, run this command:
```sh
$ yarn start
$ yarn ios
```

#### Build and running for Android
Before running this command, please to open emulator first or connect your android device.

Command:
```sh
$ yarn start
$ yarn android
```

### Testing
To test this project, I setup two options command.

Run test only once
```shell
$ yarn test
```

Run test with --watch option to watch files for changes and rerun tests related to changed files.
```shell
$ test:watch
```
