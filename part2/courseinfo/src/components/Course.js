const Header = ({course}) => {

    return (
      <div>
        <h1>{course}</h1>
      </div>
    )
  }
  
  const Part = ({part, exercises}) => {
    return (
      <div>
        <p>
          {part} {exercises}
        </p>
      </div>
    )
  }


  const Content = ({parts}) => {
    return (
      <div>
        {parts.map((part, i) =>
          <Part key={i + "part" + part.id} part={part.name} exercises={part.exercises}></Part>
        )}
      </div>
    )
  }
  
  const Total = ({parts}) => {
    const total = parts.map(x => x.exercises).reduce((a,b) => a+b)
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