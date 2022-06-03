# ShoppingCart Client App built in React 18.1.0

The client api serve the purpose of getting the product list from the Shopping Cart API  https://github.com/netdevaustralia/ShoppingCartAPI. It also has the integration with third party api for the currency conversion.

# Configurations

All the releavant configuration like Urls and api key is located in the Configuration file of the project and should be updated in the same file if required. 

# Project structure
This is designed on components based and all the components are inside the src/components folder. The interfaces are bascially same structure as the response object from backend server. Making changes to the properties of the interfaces would require them to change on the backend api as well.

# Running Locally

In order to see the functionlity you need to run the backend api together and if required change the port in the config file. The backend code is available at https://github.com/netdevaustralia/ShoppingCartAPI

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
