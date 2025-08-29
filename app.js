const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()


// Serve static files
app.use(express.static(path.join(__dirname, 'public')))


// Middleware
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});


// Navbar and Footer partials
function renderPage(filePath, res, activePage, cssFile, headerH1, headerP){
  // Header partial (will be modified)
  let header = fs.readFileSync(path.join(__dirname, 'public', 'HTML', 'partials', 'header.html'), 'utf-8');
  // Footer partial
  const footer = fs.readFileSync(path.join(__dirname, 'public', 'HTML', 'partials', 'footer.html'), 'utf-8');
  // The contents from the individual html files
  const content = fs.readFileSync(filePath, 'utf-8');

  // Removes the <li> link for the current page from the navbar
  const regex = new RegExp(`<li>.*id="${activePage}-link".*</li>`, 'i');
  // Regex Explanation:
    // <li> matches the opening <li> tag
    // .* matches any characters (0 or more) inside the <li>
    // id="${activePage}-link" → matches the id attribute corresponding to the current page (like "menu-link")
    // .* matches the rest of the content inside the <li> until the closing tag
    // </li> matches the closing </li> tag
    // 'i' flag makes the match case-insensitive (so <LI> or <li> both work)
  //
  header = header.replace(regex, '');

  // Replaces placeholder with the correct CSS file
  header = header.replace('{{CSS_LINK}}', `<link rel="stylesheet" href="/CSS/${cssFile}">`);

  // Replaces placeholders with correct header details
  header = header.replace('{{HEADER_H1}}', headerH1);
  header = header.replace('{{HEADER_P}}', headerP);

  // Sandwiches everything together
  res.send(header + content + footer);
}


// Webpage routes
app.get('/', (req, res) => {
  renderPage(path.join(__dirname, 'public', 'HTML', 'index.html'), res, 'home', 'home.css', 'Home', 'Welcome to Mocha Glaze! We offer many types of donuts for anyone to enjoy.');
});

app.get('/menu', (req, res) => {
  renderPage(path.join(__dirname, 'public', 'HTML', 'menu.html'), res, 'menu', 'menu.css', 'Menu', 'Mocha Glaze only offers two things: Coffee and Donuts. Though it may not seem like much, we are a master of both worlds.');
});

app.get('/history', (req, res) => {
  renderPage(path.join(__dirname, 'public', 'HTML', 'history.html'), res, 'history', 'history.css', 'History', 'What led to the creation of Mocha Glaze?');
});

app.get('/location', (req, res) => {
  renderPage(path.join(__dirname, 'public', 'HTML', 'location.html'), res, 'location', 'location.css', 'Location', 'Where can you find us?');
});

app.get('/contact', (req, res) => {
  renderPage(path.join(__dirname, 'public', 'HTML', 'contact.html'), res, 'contact', 'contact.css', 'Contact', 'Contact us if you want.');
});


// 404 Error
app.use((req, res, next) => {
  res.status(404).send("Sorry, we couldn't find that page!");
});


// General Error handler
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).send('Something broke!'); // Generic error response
});


// Start server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000')
})