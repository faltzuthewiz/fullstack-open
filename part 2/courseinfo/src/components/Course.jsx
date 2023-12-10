const Header = ({ name }) => {
    return (
      <div>
        <h2>{name}</h2>
      </div>
    )  
  }
  
  const Part = ({ name, exercises }) => {
    return (
      <div>
        <li>{name} {exercises}</li>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    console.log("Content props: ", parts)
    
    return (
      <div>
        <ul>
          {parts.map(part =>
            <Part key={part.id} name={part.name} exercises={part.exercises} />
          )}
        </ul>
      </div>
    )
  }
  
  const Total = ({ total }) => {
    return (
      <div>
        <p><strong>Total of {total} exercises</strong></p>
      </div>
    ) 
  }
  
  const Course = (props) => {
    const { course } = props
    console.log("this is the course ", course)
  
    const total = course.parts.reduce((s, p) => {
      return s + p.exercises
    }, 0)
  
    return (
      <>
      <Header name={course.name} />
      <Content parts={course.parts}/>
      <Total total={total} />
      </>
    )
  }

  export default Course