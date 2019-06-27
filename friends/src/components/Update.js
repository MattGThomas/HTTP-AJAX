import React from 'react'
import axios from 'axios'

class Update extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            age: '',
            email: '',
            errorMessage: null
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        
        axios.get(`http://localhost:5000/friends/${id}`)
            .then(response => {
                const { name, age, email } = response.data
                this.setState({ name, age, email })
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.response.data.error
                })
            })
    }

    changeHandle = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    editFriend = (evt) => {
        evt.preventDefault()

        const id = this.props.match.params.id
        const { name, email, age } = this.state
        const payload = { name, email, age }

        axios.put(`http://localhost:5000/friends/${id}`, payload)
            .then((response) => {
                this.setState({
                    errorMessage: null
                })
            
            this.props.updateFriends(response.data)
            this.props.history.push('/friends')
        })
        .catch((err) => {
            this.setState({
                errorMessage: err.response.data.error
            })
        })

    }

    removeFriend = (evt) => {
        evt.preventDefault()

        const id = this.props.match.params.id
        
        axios.delete(`http://localhost:5000/friends/${id}`)
            .then((response) => {
                this.setState({
                    errorMessage: null
                })
                this.props.updateFriends(response.data)
                this.props.history.push('/friends')
            })
            .catch((err) => {
                this.setState({
                    errorMessage: console.log('Error', err)
                })
            })
    }

    render() {
        const { name, email, age } = this.state

        return (
            <form onSubmit={this.editFriend}>
                <h2>Update Friend Here</h2>
                <input type='text' name='name' placeholder='Name' value={name} onChange={this.changeHandle} /> 
                <input type='text' name='age' placeholder='Age' value={age} onChange={this.changeHandle} />
                <input type='text' name='email' placeholder='Email' value={email} onChange={this.changeHandle} />

                <button type='submit'>Update!</button> 
                <button type='button' onClick={this.removeFriend}>Remove</button>
            </form>
        )
    }
}

export default Update