import { Component, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

const LS_KEY = 'Todos';

// ===========ХУКИ===============

export const Todos = () => {
  const [todos, setTodos] = useState(() =>
    JSON.parse(localStorage.getItem(LS_KEY) ?? [])
  );

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = value => {
    const todo = { text: value, id: nanoid() };
    setTodos(state => {
      console.log(state);
      return [...state, todo];
    });
  };

  const deleteTodo = id => {
    console.log(id);
    setTodos(state => state.filter(todo => todo.id !== id));
  };

  return (
    <>
      <SearchForm onSubmit={addTodo} />
      <Grid>
        {todos.map(({ text, id }, index) => (
          <GridItem GridItem key={id}>
            <Todo
              todo={text}
              numberTodo={index + 1}
              id={id}
              deleteTodo={deleteTodo}
            />
          </GridItem>
        ))}
      </Grid>
      ;
    </>
  );
};


// ==============КЛАСИ==============

// export class oldTodos extends Component {
//   state = { todos: [] };

//   componentDidMount = () => {
//     const todos = JSON.parse(localStorage.getItem(LS_KEY));
//     this.setState({ todos: todos });
//   };

//   componentDidUpdate() {
//     localStorage.setItem(LS_KEY, JSON.stringify(this.state.todos));
//   }

//   addTodo = value => {
//     const todo = { text: value, id: nanoid() };
//     this.setState(prevState => ({ todos: [...prevState.todos, todo] }));
//   };

//   deleteTodo = id => {
//     console.log(id);
//     this.setState(prevState => ({
//       todos: prevState.todos.filter(todo => todo.id !== id),
//     }));
//   };

//   render() {
//     const { todos } = this.state;
//     console.log(todos);

//     return (
//       <>
//         <SearchForm onSubmit={this.addTodo} />
//         <Grid>
//           {todos.map(({ text, id }, index) => (
//             <GridItem GridItem key={id}>
//               <Todo
//                 todo={text}
//                 numberTodo={index + 1}
//                 id={id}
//                 deleteTodo={this.deleteTodo}
//               />
//             </GridItem>
//           ))}
//         </Grid>
//         ;
//       </>
//     );
//   }
// }
