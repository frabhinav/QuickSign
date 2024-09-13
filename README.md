# QuickSign

## Signature Canvas App

## Overview

The **Signature Canvas App** is a simple web-based application that allows users to draw signatures on a canvas, customize the background and pen settings, clear the canvas, and download or load their last saved signature. It's a great project for learning and implementing basic web technologies such as **HTML**, **CSS**, and **JavaScript**.

## Demo

You can try out the app live here: [Demo Link](https://frabhinav.github.io/QuickSign/).

## Technologies Used

This project leverages the following technologies:

- **HTML5**: Provides the basic structure of the web page and defines the canvas element where users can draw.
- **CSS3**: Used for styling the user interface, including canvas, buttons, and input fields. Flexbox is utilized to manage layouts effectively.
- **JavaScript (ES6)**: The core logic of the app is implemented in vanilla JavaScript, handling user inputs, canvas drawing, and interaction with `localStorage`.

### Detailed Breakdown of Technologies:

1. **HTML5**: 
   - The `<canvas>` element is used to create the signature area where users can draw.
   - HTML also includes form inputs to control pen width, color, and canvas background color.
   
2. **CSS3**:
   - Flexbox is used to center the elements both vertically and horizontally.
   - The CSS properties make the app responsive and provide visual feedback, such as cursor changes when interacting with the canvas.
   
3. **JavaScript (ES6)**:
   - `Canvas API`: Used for drawing on the canvas element.
   - `localStorage`: Allows saving the user's signature locally in the browser.
   - Event listeners for mouse interactions to handle drawing, changing pen settings, and loading/saving the signature.

---

## Functionalities of the App

### 1. **Drawing on the Canvas**
   - The user can draw freehand on the canvas by clicking and holding down the mouse button. Moving the mouse draws lines based on the position and movement.
   - The app utilizes the `CanvasRenderingContext2D` to handle all drawing operations.

### 2. **Change Canvas Background Color**
   - Users can choose a background color for the canvas using the color picker input labeled "Canvas Background".
   - When the user selects a color, the canvas background changes in real-time.

### 3. **Change Pen Color**
   - Users can change the pen color for drawing by selecting a color from the "Pen Color" input.
   - The pen color is updated immediately and used for all subsequent drawing operations.

### 4. **Change Pen Width**
   - The app provides an input field where the user can set the thickness of the pen from 1 to 20 pixels.

### 5. **Clear Canvas**
   - The "Clear Canvas" button allows users to reset the canvas, removing all the current drawings. This simply clears the entire canvas without affecting saved signatures.

### 6. **Save and Download Signature**
   - After creating a signature, the user can save and download it as a `.png` image file by clicking the "Save & Download" button.
   - The signature is also saved to `localStorage`, allowing the user to restore it later if needed.

### 7. **Load Last Saved Signature**
   - The "Load Last Signature" button retrieves the last signature saved in `localStorage` and displays it on the canvas.
   - This feature is useful if the user closes the browser or navigates away from the app but wants to continue working on their last saved signature.

---

## Project Structure

```plaintext
Signature-Canvas-App/
│
├── index.html        # Main HTML file defining the structure
├── style.css         # CSS file for styling the layout
├── script.js         # JavaScript file containing the app logic
└── README.md         # Documentation (this file)
```

---

## How to Run the Project Locally

To run this project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/signature-canvas-app.git
   cd signature-canvas-app
   ```

2. **Open the HTML File**:
   Open the `index.html` file in any web browser:
   ```bash
   open index.html
   ```

3. **Use the App**:
   - Draw on the canvas, modify pen width and color, and save your signature.

---

## Future Enhancements

- **Mobile Touch Support**: Add support for touch-based drawing, enabling users to draw signatures on touch screens and mobile devices.
- **Undo/Redo Functionality**: Implement the ability to undo or redo strokes to give users more control over their drawings.
- **Multiple Saved Signatures**: Allow users to save multiple signatures with unique identifiers.

---

## Contributing

Feel free to fork the repository and submit pull requests. Any contributions to improving the app or fixing bugs are welcome!

---

## Acknowledgements

- Inspiration from various drawing apps that utilize the HTML5 canvas.

---

Let me know if this works, or if you need any more changes!
