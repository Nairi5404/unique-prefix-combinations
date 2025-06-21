# Combination Generator API

This project is a Node.js and MySQL-based REST API that generates valid combinations from a list of items and stores them in a MySQL database.
Items starting with the same letter (prefix) cannot be in the same combination.

## Features

- Accepts a list of item types and desired combination length.
- Generates all valid combinations based on rules.
- Stores items, combinations, and responses in separate tables.
- Uses MySQL transactions to ensure consistency.

- ## API Endpoint
  
### POST /generate

#### Request Body
```json
{
  "items": [1, 2, 1],
  "length": 2
}
```

### Getting Started

1. Clone the repository:
   ```bash
    git clone https://github.com/Nairi5404/unique-prefix-combinations.git
    cd unique-prefix-combinations
   ```
2. Install dependencies:
   ```bash
    npm install
   ```
4. Set up .env file:
   ```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=combinations_db
    PORT=3000
   ```
4: Start the server:
```bash
    npm start
```









