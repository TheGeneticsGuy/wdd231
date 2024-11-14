
// Footer
document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;


// HAMBURGER BUTTON LOGIC
const icons = document.querySelectorAll('.icon-menu');
const nav = document.querySelector(".navigation");

icons.forEach(hamburger => {
    hamburger.addEventListener('click', (event) => {
        nav.classList.toggle("open");
        hamburger.classList.toggle("open");
    });
});

// Store the grid
const courseGrid = document.querySelector("#course-grid");

// Reset the grid
function resetCourseGrid() { courseGrid.innerHTML = "" };

// Builds the cours buttons
function render_courses(filtered_classes) {
    resetCourseGrid();
    let num_credits = 0;
    let total_credits = 0;

    filtered_classes.forEach(course => {
        let course_button = document.createElement("button");

        course_button.textContent = `${course.subject} ${course.number}`;

        // Adding some logic on coloring of the button
        course_button.style.backgroundColor = course.completed ? "#6e3c3b" : "grey";

        // Adding a class to style the button
        course_button.classList.add("course-button");

        // Adding click event listener for later
        course_button.addEventListener("click", () => {

            console.log(`Selected course: ${course.title}`);

        });

        if (course.completed) {
            num_credits += course.credits;
        }
        total_credits += course.credits;

        // Assuming you have a grid container with id "courseGrid"
        document.getElementById("course-grid").appendChild(course_button);
    });

    // Set the Credits
    document.getElementById("credits").innerHTML = num_credits;
    document.getElementById("credits_total").innerHTML = total_credits;
}

const all_courses = document.querySelector("#all");
const cse_courses = document.querySelector("#cse");
const wdd_courses = document.querySelector("#wdd");

all_courses.addEventListener("click", () => {
    render_courses(courses);
});

cse_courses.addEventListener("click", () => {
    let cse = courses.filter(course => course.subject == 'CSE');
    render_courses(cse);
});

wdd_courses.addEventListener("click", () => {
    let wdd = courses.filter(course => course.subject == 'WDD');
    render_courses(wdd);
});

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]
let established = false;
// Register my button waypoint logic
function EstablishMenuWaypoint(id_name) {
    let buttons = ["home", "chamber", "git", "linkedin"];

    for (i = 0; i < buttons.length; i++) {

        if (!established) {
            established = true;
            const button = document.querySelector("#" + buttons[i]);

            button.addEventListener("click", () => {
                EstablishMenuWaypoint(id_name);
            });
        }

        if (buttons[i] != id_name) {
            document.getElementById(buttons[i]).style.color = "#fff";
        } else if (id_name == "home" || id_name == "chamber") {
            document.getElementById(id_name).style.color = "#ea0000"
        }
    }
}

// Initial loading
render_courses(courses);
EstablishMenuWaypoint("home");