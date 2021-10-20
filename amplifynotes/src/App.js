import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Typography } from 'antd';


//AWS IMPORT
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import aws_exports from './aws-exports'; // specify the location of aws-exports.js file on your project

import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';

Amplify.configure(aws_exports);



const { Title } = Typography;


function App() {
  return (
    <Title>YT Notes App</Title>

  );
}

export default App;
