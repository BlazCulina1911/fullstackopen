const Header = (props) => {

    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    )
  }
  
  const Part = (props) => {
    return (
      <div>
        <p>
          {props.part} {props.exercises}
        </p>
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        {props.parts.map(part =>
          <Part key={part.key} part={part.name} exercises={part.exercises}></Part>
        )}
      </div>
    )
  }
  
  const Total = (props) => {
    const total = props.parts.map(x => x.exercises).reduce((a,b) => a+b)
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

  export default Course