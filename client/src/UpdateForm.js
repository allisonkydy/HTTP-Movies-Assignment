import React from 'react';
import axios from 'axios';

const emptyForm = { title: '', director: '', metascore: '', stars: [] }

class UpdateForm extends React.Component {
  state = {
    movie: emptyForm
  }

  componentDidMount() {
    this.populateMovie();
  }

  componentDidUpdate(prevProps) {
    if (this.props.movies !== prevProps.movies) {
      this.populateMovie();
    }
  }

  populateMovie = () => {
    const id = this.props.match.params.id;
    const movieToEdit = this.props.movies.find(movie => `${movie.id}` === id)
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

  handleStars = (e, index) => {
    const newStars = this.state.movie.stars.map((star, i) => i === index ? e.target.value : star);
    this.setState({
      movie: {
        ...this.state.movie,
        stars: newStars
      }
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${this.state.movie.id}`, this.state.movie)
      .then(res => {
        this.props.updateMovies(res.data)
        this.setState({ movie: emptyForm })
        this.props.history.push(`/movies/${this.props.match.params.id}`)
      })
      .catch(err => console.log(err))
  }

  render() {
    console.log(this.state.movie)
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
        {this.state.movie.stars.map((star, index) => {
          return (
            <input 
              type="text"
              name="stars"
              value={star}
              onChange={(e) => this.handleStars(e, index)}
            />
          )
        })}
        <button>edit</button>
      </form>
    )
  }
}

export default UpdateForm;
