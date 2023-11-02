const javascript = [
    {
        "category": "Programming: JavaScript",
        "question": "Which keyword is used to declare a function in JavaScript?",
        "correct_answer": "function",
        "incorrect_answers": ["class", "method", "declare"]
    },
    {
        "category": "Programming: JavaScript",
        "question": "What does the spread operator (...) do in JavaScript?",
        "correct_answer": "It expands an iterable (e.g., array, object) into individual elements.",
        "incorrect_answers": ["It creates a new array with empty values.", "It removes elements from an array.", "It merges two arrays."]
    },
    {
        "category": "Programming: JavaScript",
        "question": "How do you write a simple 'if' statement in JavaScript?",
        "correct_answer": "if (condition) { // code to execute }",
        "incorrect_answers": ["if condition: // code to execute", "if (condition) then { // code to execute }", "if {condition} // code to execute"]
    },
    {
        "category": "Programming: JavaScript",
        "question": "Which operator is used for a concise 'if-else' statement in JavaScript?",
        "correct_answer": "ternary operator (?:)",
        "incorrect_answers": ["if-else operator (if-else)", "conditional operator (&&)", "switch operator (switch)"]
    },
    {
        "category": "Programming: JavaScript",
        "question": "What is the purpose of the 'class' keyword in JavaScript?",
        "correct_answer": "It is used to define and create objects based on a blueprint (class).",
        "incorrect_answers": ["It creates a new instance of a built-in object.", "It's used for type casting.", "It defines a global variable."]
    }
]

const python = [
    {
        "category": "Programming: Python",
        "question": "What keyword is used to define a function in Python?",
        "correct_answer": "def",
        "incorrect_answers": ["function", "func", "define"]
    },
    {
        "category": "Programming: Python",
        "question": "Which module is used to work with regular expressions in Python?",
        "correct_answer": "re",
        "incorrect_answers": ["regex", "regexp", "expression"]
    },
    {
        "category": "Programming: Python",
        "question": "How do you define a for loop in Python?",
        "correct_answer": "for variable in iterable: # code to execute",
        "incorrect_answers": ["foreach variable in iterable: # code to execute", "loop (variable, iterable): # code to execute", "while (condition): # code to execute"]
    },
    {
        "category": "Programming: Python",
        "question": "What is the purpose of the 'class' keyword in Python?",
        "correct_answer": "It is used to define a blueprint for creating objects (instances).",
        "incorrect_answers": ["It creates a new instance of a class.", "It's used for type conversion.", "It defines a global variable."]
    },
    {
        "category": "Programming: Python",
        "question": "Which keyword is used to import a module in Python?",
        "correct_answer": "import",
        "incorrect_answers": ["include", "require", "use"]
    }
]
const php = [
    {
        "category": "Programming: PHP",
        "question": "What keyword is used to define a function in PHP?",
        "correct_answer": "function",
        "incorrect_answers": ["func", "def", "define"]
    },
    {
        "category": "Programming: PHP",
        "question": "Which PHP module is used to work with databases?",
        "correct_answer": "mysqli",
        "incorrect_answers": ["db", "mysql", "database"]
    },
    {
        "category": "Programming: PHP",
        "question": "How do you define a for loop in PHP?",
        "correct_answer": "for (initialization; condition; increment) { // code to execute }",
        "incorrect_answers": ["foreach (variable as iterable) { // code to execute }", "loop (variable, iterable) { // code to execute }", "while (condition) { // code to execute }"]
    },
    {
        "category": "Programming: PHP",
        "question": "What is the purpose of the 'class' keyword in PHP?",
        "correct_answer": "It is used to define a blueprint for creating objects (instances).",
        "incorrect_answers": ["It creates a new instance of a class.", "It's used for type conversion.", "It defines a global variable."]
    },
    {
        "category": "Programming: PHP",
        "question": "Which PHP function is used to include an external PHP file?",
        "correct_answer": "include",
        "incorrect_answers": ["import", "require", "use"]
    }
]

const sql = [
    {
        "category": "SQL",
        "question": "What SQL statement is used to retrieve data from a database table?",
        "correct_answer": "SELECT",
        "incorrect_answers": ["RETRIEVE", "FETCH", "GET"]
    },
    {
        "category": "SQL",
        "question": "In SQL, what keyword is used to filter results using a specific condition in a SELECT statement?",
        "correct_answer": "WHERE",
        "incorrect_answers": ["FILTER", "CONDITION", "LIMIT"]
    },
    {
        "category": "SQL",
        "question": "Which SQL command is used to insert new data into a database?",
        "correct_answer": "INSERT",
        "incorrect_answers": ["CREATE", "UPDATE", "MODIFY"]
    },
    {
        "category": "SQL",
        "question": "What is the purpose of the SQL keyword 'GROUP BY'?",
        "correct_answer": "To group rows with similar values into summary rows.",
        "incorrect_answers": ["To sort the table in ascending order.", "To join tables together.", "To delete rows from the table."]
    },
    {
        "category": "SQL",
        "question": "Which SQL statement is used to delete data from a database table?",
        "correct_answer": "DELETE",
        "incorrect_answers": ["REMOVE", "ERASE", "DROP"]
    }
]

const c = [
    {
        "category": "Programming: C++",
        "question": "What is the primary function of the 'main' function in C++?",
        "correct_answer": "It is the entry point of a C++ program, where execution begins.",
        "incorrect_answers": ["It is used to define classes in C++.", "It is a function for mathematical calculations.", "It is responsible for I/O operations."]
    },
    {
        "category": "Programming: C++",
        "question": "Which keyword is used to declare a class in C++?",
        "correct_answer": "class",
        "incorrect_answers": ["define", "structure", "object"]
    },
    {
        "category": "Programming: C++",
        "question": "What is the purpose of the 'new' keyword in C++?",
        "correct_answer": "It is used to dynamically allocate memory for objects or variables.",
        "incorrect_answers": ["It is used to create a new instance of a class.", "It is a type-casting operator.", "It defines a constant value."]
    },
    {
        "category": "Programming: C++",
        "question": "What is the C++ 'if' statement used for?",
        "correct_answer": "To make decisions and execute code conditionally based on a Boolean expression.",
        "incorrect_answers": ["To define macros.", "To create loops.", "To perform mathematical calculations."]
    },
    {
        "category": "Programming: C++",
        "question": "Which C++ operator is used to access the member variables and functions of an object?",
        "correct_answer": "dot (.) operator",
        "incorrect_answers": ["arrow (->) operator", "colon (::) operator", "percentage (%) operator"]
    }
]

const css = [
    {
        "category": "Web Development: CSS",
        "question": "What does CSS stand for?",
        "correct_answer": "Cascading Style Sheets",
        "incorrect_answers": ["Computer Style Sheets", "Colorful Style Sheets", "Creative Style Sheets"]
    },
    {
        "category": "Web Development: CSS",
        "question": "Which CSS property is used to change the background color of an element?",
        "correct_answer": "background-color",
        "incorrect_answers": ["color", "text-color", "background"]
    },
    {
        "category": "Web Development: CSS",
        "question": "In CSS, which selector is used to select all elements?",
        "correct_answer": "* (asterisk)",
        "incorrect_answers": ["> (greater-than sign)", "+ (plus sign)", "# (hash)"]
    },
    {
        "category": "Web Development: CSS",
        "question": "What is the CSS property used to change the font size of text?",
        "correct_answer": "font-size",
        "incorrect_answers": ["text-size", "size", "font-style"]
    },
    {
        "category": "Web Development: CSS",
        "question": "Which CSS property is used to create drop shadows on elements?",
        "correct_answer": "box-shadow",
        "incorrect_answers": ["text-shadow", "shadow-effect", "element-shadow"]
    }
]

const go = [
    {
        "category": "Programming: Go",
        "question": "Who created the Go programming language?",
        "correct_answer": "Google",
        "incorrect_answers": ["Apple", "Microsoft", "Amazon"]
    },
    {
        "category": "Programming: Go",
        "question": "In Go, what is the main function called that serves as the entry point of a Go program?",
        "correct_answer": "main",
        "incorrect_answers": ["start", "entry", "init"]
    },
    {
        "category": "Programming: Go",
        "question": "What is the purpose of the 'goroutine' in Go?",
        "correct_answer": "It's used for concurrent execution of functions or methods.",
        "incorrect_answers": ["It defines a new data type.", "It's a data structure for storing key-value pairs.", "It's used to manage memory allocation."]
    },
    {
        "category": "Programming: Go",
        "question": "In Go, what is the keyword used to declare a variable?",
        "correct_answer": "var",
        "incorrect_answers": ["int", "let", "define"]
    },
    {
        "category": "Programming: Go",
        "question": "What is Go's approach to handling errors in the language?",
        "correct_answer": "Using multiple return values, including error objects.",
        "incorrect_answers": ["Using exceptions and try-catch blocks.", "Using assertion statements.", "Using global error handling functions."]
    }
]

const java = [
    {
        "category": "Programming: Java",
        "question": "Who is the creator of the Java programming language?",
        "correct_answer": "James Gosling",
        "incorrect_answers": ["Mark Zuckerberg", "Bill Gates", "Linus Torvalds"]
    },
    {
        "category": "Programming: Java",
        "question": "In Java, which keyword is used to define a class?",
        "correct_answer": "class",
        "incorrect_answers": ["define", "type", "create"]
    },
    {
        "category": "Programming: Java",
        "question": "What is the purpose of the 'public static void main(String[] args)' method in Java?",
        "correct_answer": "It serves as the entry point of a Java program.",
        "incorrect_answers": ["It's used to print messages to the console.", "It defines a new class constructor.", "It handles exceptions in the program."]
    },
    {
        "category": "Programming: Java",
        "question": "In Java, which data type is used for storing whole numbers?",
        "correct_answer": "int",
        "incorrect_answers": ["string", "float", "boolean"]
    },
    {
        "category": "Programming: Java",
        "question": "What is Java's approach to memory management?",
        "correct_answer": "Automatic garbage collection",
        "incorrect_answers": ["Manual memory allocation", "Dynamic memory management", "Static memory management"]
    }
]
