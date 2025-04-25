# AI Task Agent

This is a simple AI-powered command-line agent built for the Workik AI internship assignment. The agent can take a natural language task from the user, generate corresponding Python code using a free AI model (via [OpenRouter](https://openrouter.ai)), and execute it locally.

---

##  Features

- Accepts any simple task from the user
- Uses OpenRouter (GPT-3.5 Turbo or similar) to generate Python code
- Shows the generated code before execution
- Runs the code locally and displays the output
- Basic error handling for API and execution issues

---

### Technologies Used
- Node.js
-  Axios
-  OpenRouter AI (Free GPT API)
-  Python (to run generated code)

---

#  How to Run

### 1. Clone the Repository
```bash
git clone https://github.com/Chinmaya-Chidamber/ai-agent.git
cd ai-agent
```

### 2. Install Dependencies

```npm install```

### 3. Setup Environment Variables
Create a .env file in the root directory and add your OpenRouter API key:

```OPENROUTER_API_KEY=your_api_key_here```

### 4. Run the Agent
```node agent.js```


### Example:
> What task should the agent perform? create a basic calculator that performs addition,subtraction,multiplication,division and handles the error if divides by 0

Generating code...


Suggested Python code:



Do you want to save and execute it? [y/n]: y

```
try:
    num1 = float(input("Enter first number: "))
    num2 = float(input("Enter second number: "))
    operation = input("Enter the operation (+, -, *, /): ")

    if operation == '+':
        result = num1 + num2
    elif operation == '-':
        result = num1 - num2
    elif operation == '*':
        result = num1 * num2
    elif operation == '/':
        if num2 == 0:
            result = "Error! Division by zero."
        else:
            result = num1 / num2
    else:
        result = "Invalid operation."

    print("Result: ", result)

except ValueError:
    print("Error! Please enter valid numbers.")
except Exception as e:
    print("An error occurred:", e)
```

Do you want to save and execute it? [y/n]:
Code saved to task.py. Running it now...



### Future Improvements:

- Add task planning and approval step before execution
- Implement retry mechanism based on user feedback
- Build a VSCode Extension for bonus points
- Enable multiple language support (JavaScript, C, etc.)
- Improve security and sandboxing for executing code

### License
This project is built as part of the Workik AI Internship Assignment — April 2025.

