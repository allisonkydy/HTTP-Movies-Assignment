import React from 'react';
import axios from 'axios';

const emptyForm = { title: '', director: '', metascore: '' }

class UpdateForm extends React.Component {
  state = {
    movie: emptyForm
  }

  componentDidMount() {
    this.populateMovie();
  }

  componentDidUpdate(prevProps) {
    console.log(this.props)
    if (this.props.movies !== prevProps.movies) {
      this.populateMovie();
    }
  }

  populateMovie = () => {
    const id = this.props.match.params.id;
    const movieToEdit = this.props.movies.find(movie => `${movie.id}` === id)
    console.log(movieToEdit)
    if (movieToEdit) this.setState({ movie: movieToEdit })
  }

  handleChange = e => {
    this.setState({
      movie: {
        ...this.state.movie,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${this.state.movie.id}`, this.state.movie)
      .then(res => {
        console.log(res)
        // this.setState({ movie: emptyForm })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text"
          name="title"
          value={this.state.movie.title}
          onChange={this.handleChange}
        />
        <input 
          type="text"
          name="director"
          value={this.state.movie.director}
          onChange={this.handleChange}
        />
        <input 
          type="number"
          name="metascore"
          value={this.state.movie.metascore}
          onChange={this.handleChange}
        />
        {/* <input 
          type="text"
          name="stars"
          value={this.state.movie.stars}
          onChange={this.handleChange}
        /> */}
        <button>edit</button>
      </form>
    )
  }
}

export default UpdateForm;
