# Password-generator
# Password Generator Website

This is a simple password generator website created using HTML, CSS, and JavaScript. It allows users to generate passwords with custom criteria such as length, inclusion of lowercase letters, uppercase letters, and symbols.

## Features

- **Custom Password Length:** Users can specify the length of the generated password using a number input field.
- **Include Lowercase Letters:** Users can choose whether to include lowercase letters in the generated password by checking a checkbox.
- **Include Uppercase Letters:** Similarly, users can choose whether to include uppercase letters.
- **Include Symbols:** Users can also choose whether to include symbols such as !@#$%^&*()-_+=/? in the generated password.

## Usage

1. Enter the desired password length in the designated input field.
2. Check or uncheck the checkboxes to include or exclude lowercase letters, uppercase letters, and symbols as per your preference.
3. Click the "Generate Password" button.
4. The generated password will appear in the text input field below the button.

## How it Works

- When the "Generate Password" button is clicked, it triggers a JavaScript function (`generatePassword()`) which collects the user input (password length and selected options).
- Based on the selected options, the function constructs a character set containing the appropriate characters (lowercase letters, uppercase letters, and symbols).
- It then generates a password of the specified length by randomly selecting characters from the constructed character set.
- Finally, the generated password is displayed in the text input field for the user to copy.

## Development Notes

- The HTML structure is designed to be simple and intuitive, with clear labels and input fields.
- CSS styling is used to enhance the visual presentation of the website, making it more user-friendly.
- JavaScript is utilized to handle user input and generate passwords dynamically based on the selected criteria.
- The code is organized and commented for readability and maintainability.

Feel free to use and modify this password generator website according to your needs!
