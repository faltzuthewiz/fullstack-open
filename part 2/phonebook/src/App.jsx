import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  const [filterName, setFilterName] = useState('')
  const [personsToDisplay, setPersonsToDisplay] = useState(persons)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newPhoneNumber
    }

    const checkNameObject = persons.find(o => o.name === newName)
    const checkNumberObj = persons.find(o => o.number === newPhoneNumber)
    
    if (checkNameObject !== undefined) {
      const message = `${newName} is already added to phonebook`
      alert(message)
    } else if (checkNumberObj !== undefined) {
      const message = `Phone number ${newPhoneNumber} is already added to phonebook`
      alert(message)
    } else {
      setPersons(persons.concat(personObject))
      setPersonsToDisplay(persons.concat(personObject))
      setNewName('')
      setNewPhoneNumber('')
    }
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleFilter = (event) => {
    const keyword = event.target.value

    if (keyword !== '') {
      const results = persons.filter((person) => {
        return person.name.toLowerCase().includes(keyword.toLowerCase())
      }) 
      setPersonsToDisplay(results)
    } else {
      setPersonsToDisplay(persons)
    }

    setFilterName(keyword)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter onChange={handleFilter} value={filterName} />
      <h2>Add a new</h2>
      <PersonForm onSubmit={addPerson}
        name={{value: newName, onChange: handleNameChange}}
        number={{value: newPhoneNumber, onChange: handlePhoneNumberChange}} />
      <h2>Numbers</h2>
      <Persons persons={personsToDisplay} />
    </div>
  )
}

export default App