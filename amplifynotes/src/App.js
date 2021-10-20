import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Typography, Button, Input } from 'antd';


//AWS IMPORT
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import aws_exports from './aws-exports'; // specify the location of aws-exports.js file on your project

import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';

Amplify.configure(aws_exports);

const { Title } = Typography;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return <div>
      <Title>YT Notes App</Title>
      <Input placeholder="Add a new note" />
      <Button>Add Note</Button>
    </div>
  }
}



export default App;
