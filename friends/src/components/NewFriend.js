import React from 'react'
import axios from 'axios'

class NewFriend extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            age: '',
            errorMessage: null
        }
    }

    changeHandle = (evt) => {
        this.setState({
            [evt.target.name] : evt.target.value
        })
    }

    addFriend = (evt) => {
        evt.preventDefault();

        const { name, age, email } = this.state
        const payload = { name, age, email }

        axios.post('http://localhost:5000/friends', payload)
            .then((response) => {
                this.setState({
                    errorMessage: null
                })
                this.props.updateFriends(response.data)
                this.props.history.push('/friends')
                // Routes back to the friends page after a new friend has been added
            })
            .catch((err) => {
                console.log('Error', err)
            })
    }


    render() {

        const { name, age, email } = this.state

        return (
            <form onSubmit={this.addFriend} className='addFriend'>
                <h1 className='addFriend-Header'>Add A New Friend Here</h1>
                
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    value={name} 
                    onChange={this.changeHandle}
                />
                <input 
                    type="text" 
                    name="age" 
                    placeholder="Age" 
                    value={age} 
                    onChange={this.changeHandle}
                />
                <input 
                    type="text" 
                    name="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={this.changeHandle}
                />

                <button type='submit'><strong>Add</strong></button>
            </form>
        )
    }
}

export default NewFriend;