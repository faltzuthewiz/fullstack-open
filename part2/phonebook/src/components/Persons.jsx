import personService from '.././services/persons'

const Person = ({person, onDelete}) => {
  return (
    <tbody>
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={onDelete}>delete ID {person.id}</button></td>
    </tr>
    </tbody>
    )
}

const Persons = ({persons, onDelete}) => {

 

    return (
      <>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Number</th>
        </tr>
        </thead>
        {persons.map(person =>
        <Person key={person.name}
        person={person}
        onDelete={() => onDelete(person.id)} />
      )}
      </table>
      </>
    )
  }
  
  export default Persons