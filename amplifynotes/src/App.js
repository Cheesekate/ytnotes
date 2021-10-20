import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Typography, Button, Input, message, Card } from 'antd';


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
      id: "",
      notes: [],
      value: "",
      displayAdd: true,
      displayUpdate: false
    };
    //binds the function to the current content of the app
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleUpdate = this.handleUpdate.bind(this);
  }

  //calling list notes
  async componentDidMount() {
    this.listNotes()
  }


  //call this everytime a user inputs data. stores the value from input into state
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  //list all of the notes as queries in the DB
  //going to get data- called notes, stored in state array- 
  //when we get in back in notes- it's a nested object 
  //call this when it mounts- as soon as page loads.
  async listNotes() {
    const notes = await API.graphql(graphqlOperation(queries.listNotes));
    this.setState({ notes: notes.data.listNotes.items });
  }

  //handle submit takes an event- button click - only allows one save per click, note is object saved as note in schema
  //no need for an ID because AWS does it for me, await is where I calling the api to create the mutation
  //setting the notebook back to blank
  async handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const note = { "note": this.state.value }
    try {
      await API.graphql(graphqlOperation(mutations.createNote, { input: note }))
      message.success('Note Added')
      this.setState({ value: "" });

    } catch (err) {
      console.log(err)
    }
    // this.listNotes();
    this.setState({ value: "" });
  }
  //select the current note that a user clicks- bind- takes as variable takes as id variable in state, stores note id, then the value is stored as note.note
  selectNote(note) {
    this.setState({ id: note.id, value: note.note, displayAdd: false, displayUpdate: true });
  }

  //takes the ID and then creates object then deletes note from mutations
  async handleDelete(id) {
    const noteId = { "id": id };
    await API.graphql(graphqlOperation(mutations.deleteNote, { input: noteId }));
    this.listNotes();
  }

  render() {
    //create variable called data loops through all of notes have in state
    //the key on the item 
    const data = [].concat(this.state.notes)
      .map((item, i) =>
        <Card>
          <span key={item.i} onClick={this.selectNote.bind(this, item)}>{item.note}</span>
          <Button type="primary" onClick={this.handleDelete.bind(this, item.id)} >Delete</Button>
        </Card>
      )

    return <div>
      <Title>YT Notes App</Title>
      <Input placeholder="Add a new note" onChange={this.handleChange} />
      <Button onClick={this.handleSubmit.bind(this)}>Add Note</Button>
      <hr />
      {data}
    </div>
  }
}


export default withAuthenticator(App, { includeGreetings: true });
// export default App;
