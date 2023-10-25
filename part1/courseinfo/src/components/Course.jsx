const Header = ({ course }) => <h1>{course.name}</h1>;

const Part = ({ course }) => (
    <>
        {course.parts.map((part) => (
            <p key={part.id}>
                {part.name} {part.exercises}
            </p>
        ))}
    </>
);

const Total = ({ course }) => {
    const sum = course.parts.reduce((accumulator, current) => {
        return accumulator + current.exercises;
    }, 0);
    return <strong>total of {sum} exercises</strong>;
};

const Content = ({ courses }) => (
    <>
        {courses.map((course) => (
            <div key={course.id}>
                <Header course={course} />
                <Part course={course} />
                <Total course={course} />
            </div>
        ))}
    </>
);

const Course = ({ courses }) => <Content courses={courses} />;

export default Course;
