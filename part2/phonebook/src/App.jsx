import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons' 
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)
  const [className, setClassName] = useState(null)

  useEffect(() => {
      personService
        .getAll()
          .then(initialPersons => {
          setPersons(initialPersons)
          setPersonsToDisplay(initialPersons)
        })
  }, [])
 
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
      const message = `${newName} is already added to phonebook, replace the old number with a new one?`
      if (window.confirm(message)) {
        const changedPerson = { ...checkNameObject, name: {newName}}

        personService.update(changedPerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== checkNameObject.id ? person : returnedPerson)),
            setPersonsToDisplay(persons.map(person => person.id !== checkNameObject.id ? person : returnedPerson))
            setNewName('')
            setNewPhoneNumber('')
            setMessage(`Successfully updated ${returnedPerson.name}'s number to ${returnedPerson.number}`)
            setClassName("success"),
            setTimeout(() => {
              setMessage(null)
              setClassName(null)
            }, 5000)
          })
          .catch(error => {
            setMessage(`Could not update the information. Information of ${newName} has already been removed from server.`)
            setClassName("error")
            setTimeout(() => {
              setMessage(null)
              setClassName(null)
            }, 10000)
            setPersons(persons.filter((person) => person.id !== changedPerson.id)),
            setPersonsToDisplay(persons.filter((person) => person.id !== changedPerson.id))
          })
      } 
      setNewName('')
      setNewPhoneNumber('')
    } else if (checkNumberObj !== undefined) {
      const message = `Phone number ${newPhoneNumber} is already added to phonebook`
      alert(message)
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setPersonsToDisplay(personsToDisplay.concat(returnedPerson))
          setNewName('')
          setNewPhoneNumber('')
          setMessage(`added ${returnedPerson.name}`)
          setClassName("success"),
          setTimeout(() => {
            setMessage(null)
            setClassName(null)
          }, 5000)
        })
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

  const handleDelete = (id) => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(id)
        .then(setPersons(persons.filter((person) => person.id !== id)),
          setPersonsToDisplay(persons.filter((person) => person.id !== id)),
          setMessage(`Succesfully deleted ${person.name}`),
          setClassName("success"),
          setTimeout(() => {
            setMessage(null)
            setClassName(null)
          }, 5000)
        )
        .catch(error => {
          setMessage(`Information of ${person.name} has already been removed from server`)
          setClassName("error")
          setPersons(persons.filter((person) => person.id !== id)),
          setPersonsToDisplay(persons.filter((person) => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} className={className}/>
      <Filter onChange={handleFilter} value={filterName} />
      <h2>Add a new</h2>
      <PersonForm onSubmit={addPerson}
        name={{value: newName, onChange: handleNameChange}}
        number={{value: newPhoneNumber, onChange: handlePhoneNumberChange}} />
      <h2>Numbers</h2>
      <Persons persons={personsToDisplay}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App