/* filepath: /home/student/portofolio/tetris-optimizer-js.js */
class TetrisOptimizer {
  constructor() {
    this.colors = [
      "#FF5252", "#FF9800", "#FFEB3B", "#66BB6A",
      "#26C6DA", "#5C6BC0", "#AB47BC", "#EC407A",
      "#78909C", "#8D6E63", "#4DD0E1", "#AED581"
    ];
  }

  // Parse tetromino input (similar to GetTetrominos in Go)
  parseTetrominos(input) {
    const tetrominos = [];
    const lines = input.trim().split('\n');
    let currentTetromino = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line === '') {
        if (currentTetromino.length > 0) {
          tetrominos.push(currentTetromino);
          currentTetromino = [];
        }
      } else {
        currentTetromino.push(line.split(''));
        if (currentTetromino.length === 4 && (i === lines.length - 1 || lines[i+1] === '')) {
          tetrominos.push(currentTetromino);
          currentTetromino = [];
        }
      }
    }
    
    if (currentTetromino.length > 0) {
      tetrominos.push(currentTetromino);
    }
    
    return tetrominos;
  }
  
  // Validate tetrominos (similar to isValidTetromino in Go)
  validateTetrominos(tetrominos) {
    const validTetrominos = [];
    
    for (const tetromino of tetrominos) {
      const result = this.validateTetromino(tetromino);
      if (!result.valid) {
        return { valid: false, tetrominos: [] };
      }
      validTetrominos.push(result.tetromino);
    }
    
    return { valid: true, tetrominos: validTetrominos };
  }
  
  validateTetromino(tetromino) {
    if (tetromino.length === 0 || tetromino.length > 4) {
      return { valid: false, tetromino: null };
    }
    
    let blocks = 0;
    let links = 0;
    const validTetromino = [];
    
    for (let i = 0; i < tetromino.length; i++) {
      const row = tetromino[i];
      if (row.length !== 4) {
        return { valid: false, tetromino: null };
      }
      
      let hasHash = false;
      const newRow = [...row];
      
      for (let j = 0; j < row.length; j++) {
        if (row[j] === '#') {
          hasHash = true;
          blocks++;
          
          // Check vertical connection
          if (i > 0 && j < tetromino[i-1].length && tetromino[i-1][j] === '#') {
            links++;
          }
          
          // Check horizontal connection
          if (j > 0 && row[j-1] === '#') {
            links++;
          }
        } else if (row[j] !== '.') {
          return { valid: false, tetromino: null };
        }
      }
      
      if (hasHash) {
        validTetromino.push(newRow);
      }
    }
    
    if (blocks !== 4 || links < 3) {
      return { valid: false, tetromino: null };
    }
    
    return { valid: true, tetromino: validTetromino };
  }
  
  // Remove empty columns (similar to RemoveEmptyColumns in Go)
  removeEmptyColumns(tetrominos) {
    const formattedTetrominos = [];
    
    for (const tetromino of tetrominos) {
      formattedTetrominos.push(this.removeEmptyColumnsFromTetromino(tetromino));
    }
    
    return formattedTetrominos;
  }
  
  removeEmptyColumnsFromTetromino(tetromino) {
    const colCounts = Array(tetromino[0].length).fill(0);
    
    // Count non-empty cells in each column
    for (const row of tetromino) {
      for (let j = 0; j < row.length; j++) {
        if (row[j] !== '.') {
          colCounts[j]++;
        }
      }
    }
    
    // Remove empty columns
    const formattedTetromino = [];
    for (const row of tetromino) {
      const newRow = [];
      for (let j = 0; j < row.length; j++) {
        if (colCounts[j] > 0) {
          newRow.push(row[j]);
        }
      }
      formattedTetromino.push(newRow);
    }
    
    return formattedTetromino;
  }
  
  // Create a square grid (similar to CreateSquare in Go)
  createSquare(size) {
    const grid = [];
    for (let i = 0; i < size; i++) {
      grid.push(Array(size).fill(null));
    }
    return grid;
  }
  
  // Calculate minimum square size (similar to CreateMultipleSquares in Go)
  calculateMinSize(numTetrominos) {
    // Each tetromino has 4 blocks, so we need at least n*4 cells
    const totalBlocks = numTetrominos * 4;
    
    // Find the smallest square that can fit all blocks
    let size = 2;
    while (size * size < totalBlocks) {
      size++;
    }
    
    return size;
  }
  
  // Solve the puzzle (similar to Solve in Go)
  solve(input) {
    // Parse input
    const tetrominos = this.parseTetrominos(input);
    
    // Validate tetrominos
    const validationResult = this.validateTetrominos(tetrominos);
    if (!validationResult.valid) {
      return { success: false, error: "Invalid tetrominos" };
    }
    
    // Format tetrominos (remove empty columns)
    const formattedTetrominos = this.removeEmptyColumns(validationResult.tetrominos);
    
    // Sort tetrominos by size (largest first) to optimize placement
    formattedTetrominos.sort((a, b) => 
      (b.length * b[0].length) - (a.length * a[0].length)
    );
    
    // Try solving with increasing grid sizes
    let size = this.calculateMinSize(formattedTetrominos.length);
    const maxSize = size + 3; // Limit attempts to prevent infinite loops
    
    while (size <= maxSize) {
      console.log(`Trying with grid size ${size}x${size}`);
      
      const grid = this.createSquare(size);
      const solution = this.backtrack(grid, formattedTetrominos, 0, size);
      
      if (solution.success) {
        return {
          success: true,
          grid: solution.grid,
          size: size,
          piecesCount: formattedTetrominos.length
        };
      }
      
      size++;
    }
    
    return { success: false, error: "No solution found" };
  }
  
  // Backtracking algorithm (similar to backtrack in Go)
  backtrack(grid, tetrominos, index, size) {
    // Base case: all tetrominos placed
    if (index >= tetrominos.length) {
      return { success: true, grid: grid };
    }
    
    // Try placing current tetromino at each position
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (this.canPlace(grid, tetrominos[index], x, y, size)) {
          // Place tetromino
          this.place(grid, tetrominos[index], x, y, String.fromCharCode(65 + index));
          
          // Recursively try to place remaining tetrominos
          const result = this.backtrack(grid, tetrominos, index + 1, size);
          if (result.success) {
            return result;
          }
          
          // Backtrack: remove tetromino
          this.remove(grid, tetrominos[index], x, y);
        }
      }
    }
    
    return { success: false };
  }
  
  // Check if tetromino can be placed at position (similar to canPlaceTetromino in Go)
  canPlace(grid, tetromino, x, y, size) {
    for (let i = 0; i < tetromino.length; i++) {
      for (let j = 0; j < tetromino[i].length; j++) {
        if (tetromino[i][j] === '#') {
          const newY = y + i;
          const newX = x + j;
          
          // Check if out of bounds or cell already occupied
          if (newY >= size || newX >= size || grid[newY][newX] !== null) {
            return false;
          }
        }
      }
    }
    return true;
  }
  
  // Place tetromino on grid (similar to placeTetromino in Go)
  place(grid, tetromino, x, y, letter) {
    for (let i = 0; i < tetromino.length; i++) {
      for (let j = 0; j < tetromino[i].length; j++) {
        if (tetromino[i][j] === '#') {
          grid[y + i][x + j] = letter;
        }
      }
    }
  }
  
  // Remove tetromino from grid (similar to removeTetromino in Go)
  remove(grid, tetromino, x, y) {
    for (let i = 0; i < tetromino.length; i++) {
      for (let j = 0; j < tetromino[i].length; j++) {
        if (tetromino[i][j] === '#') {
          grid[y + i][x + j] = null;
        }
      }
    }
  }
}