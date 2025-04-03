import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Card, 
  CardContent, 
  TextField,
  List,
  ListItem,
  ListItemText,
  Box
} from '@mui/material';

const formulas = [
  { name: 'SUM', description: 'Adds all numbers in a range of cells', example: '=SUM(A1:A10)' },
  { name: 'AVERAGE', description: 'Calculates the average of numbers in a range', example: '=AVERAGE(B2:B10)' },
  { name: 'COUNT', description: 'Counts the number of cells in a range that contain numbers', example: '=COUNT(C1:C20)' },
  { name: 'MAX', description: 'Returns the largest value in a range of cells', example: '=MAX(D1:D100)' },
  { name: 'MIN', description: 'Returns the smallest value in a range of cells', example: '=MIN(E1:E100)' },
  { name: 'IF', description: 'Makes a logical comparison between a value and what you expect', example: '=IF(A2>B2,"Greater","Smaller")' },
  { name: 'VLOOKUP', description: 'Looks for a value in the leftmost column of a table and returns a value in the same row', example: '=VLOOKUP(lookup_value,table_array,col_index_num)' },
  { name: 'INDEX/MATCH', description: 'Combination of INDEX and MATCH functions for flexible lookups', example: '=INDEX(range,MATCH(lookup_value,lookup_range,0))' },
  { name: 'CONCATENATE', description: 'Joins text from multiple cells into one cell', example: '=CONCATENATE(A1," ",B1)' },
  { name: 'LEFT', description: 'Returns the specified number of characters from the start of a text string', example: '=LEFT(A1,5)' },
  { name: 'RIGHT', description: 'Returns the specified number of characters from the end of a text string', example: '=RIGHT(A1,5)' },
  { name: 'MID', description: 'Returns a specific number of characters from a text string starting at a specified position', example: '=MID(A1,2,3)' },
  { name: 'LEN', description: 'Returns the number of characters in a text string', example: '=LEN(A1)' },
  { name: 'TRIM', description: 'Removes extra spaces from text', example: '=TRIM(A1)' },
  { name: 'UPPER', description: 'Converts text to uppercase', example: '=UPPER(A1)' },
  { name: 'LOWER', description: 'Converts text to lowercase', example: '=LOWER(A1)' },
  { name: 'PROPER', description: 'Capitalizes the first letter in each word of a text string', example: '=PROPER(A1)' },
  { name: 'SUBSTITUTE', description: 'Replaces old text with new text in a text string', example: '=SUBSTITUTE(A1,"old","new")' },
  { name: 'FIND', description: 'Returns the position of one text string within another (case-sensitive)', example: '=FIND("search_text",A1)' },
  { name: 'SEARCH', description: 'Returns the position of one text string within another (not case-sensitive)', example: '=SEARCH("search_text",A1)' },
  { name: 'COUNTIF', description: 'Counts cells that meet a specified condition', example: '=COUNTIF(A1:A10,">5")' },
  { name: 'SUMIF', description: 'Adds cells that meet a specified condition', example: '=SUMIF(A1:A10,">5")' },
  { name: 'AVERAGEIF', description: 'Calculates the average of cells that meet a specified condition', example: '=AVERAGEIF(A1:A10,">5")' },
  { name: 'COUNTA', description: 'Counts cells that are not empty', example: '=COUNTA(A1:A10)' },
  { name: 'COUNTBLANK', description: 'Counts empty cells in a range', example: '=COUNTBLANK(A1:A10)' },
  { name: 'ROUND', description: 'Rounds a number to a specified number of decimal places', example: '=ROUND(A1,2)' },
  { name: 'ROUNDUP', description: 'Rounds a number up to a specified number of decimal places', example: '=ROUNDUP(A1,2)' },
  { name: 'ROUNDDOWN', description: 'Rounds a number down to a specified number of decimal places', example: '=ROUNDDOWN(A1,2)' },
  { name: 'INT', description: 'Rounds a number down to the nearest integer', example: '=INT(A1)' },
  { name: 'MOD', description: 'Returns the remainder after a number is divided by a divisor', example: '=MOD(A1,2)' },
  { name: 'POWER', description: 'Returns a number raised to a power', example: '=POWER(A1,2)' },
  { name: 'SQRT', description: 'Returns the square root of a number', example: '=SQRT(A1)' },
  { name: 'ABS', description: 'Returns the absolute value of a number', example: '=ABS(A1)' },
  { name: 'TODAY', description: 'Returns the current date', example: '=TODAY()' },
  { name: 'NOW', description: 'Returns the current date and time', example: '=NOW()' },
  { name: 'YEAR', description: 'Returns the year from a date value', example: '=YEAR(A1)' },
  { name: 'MONTH', description: 'Returns the month from a date value', example: '=MONTH(A1)' },
  { name: 'DAY', description: 'Returns the day from a date value', example: '=DAY(A1)' },
  { name: 'WEEKDAY', description: 'Returns the day of the week from a date value', example: '=WEEKDAY(A1)' },
  { name: 'NETWORKDAYS', description: 'Returns the number of working days between two dates', example: '=NETWORKDAYS(start_date,end_date)' },
  { name: 'WORKDAY', description: 'Returns a date a specified number of workdays before or after a date', example: '=WORKDAY(start_date,days)' },
  { name: 'EDATE', description: 'Returns a date a specified number of months before or after a date', example: '=EDATE(start_date,months)' },
  { name: 'EOMONTH', description: 'Returns the last day of the month', example: '=EOMONTH(start_date,months)' },
  { name: 'DATEDIF', description: 'Calculates the number of days, months, or years between two dates', example: '=DATEDIF(start_date,end_date,"Y")' },
  { name: 'HLOOKUP', description: 'Horizontal lookup that searches for a value in the top row and returns a value in the same column', example: '=HLOOKUP(lookup_value,table_array,row_index_num)' },
  { name: 'MATCH', description: 'Returns the position of a value in a range', example: '=MATCH(lookup_value,lookup_array,match_type)' },
  { name: 'CHOOSE', description: 'Returns a value from a list based on a position number', example: '=CHOOSE(index_num,value1,value2,...)' },
  { name: 'INDIRECT', description: 'Returns a cell reference specified by a text string', example: '=INDIRECT("A"&1)' },
  { name: 'OFFSET', description: 'Returns a reference to a range offset from a given reference', example: '=OFFSET(reference,rows,cols,height,width)' },
  { name: 'ROW', description: 'Returns the row number of a reference', example: '=ROW(A1)' },
  { name: 'COLUMN', description: 'Returns the column number of a reference', example: '=COLUMN(A1)' },
  { name: 'SUMPRODUCT', description: 'Multiplies corresponding components in arrays and returns sum of products', example: '=SUMPRODUCT(A1:A10,B1:B10)' },
  { name: 'RAND', description: 'Returns a random number between 0 and 1', example: '=RAND()' },
  { name: 'RANDBETWEEN', description: 'Returns a random integer between two numbers', example: '=RANDBETWEEN(1,100)' },
  { name: 'IFERROR', description: 'Returns a specified value if a formula evaluates to an error', example: '=IFERROR(value,value_if_error)' }
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFormulas = formulas.filter(formula =>
    formula.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formula.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Excel Formula Guide
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <TextField
          fullWidth
          label="Search formulas"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
        />

        <List>
          {filteredFormulas.map((formula, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {formula.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {formula.description}
                </Typography>
                <Box sx={{ 
                  backgroundColor: '#f5f5f5', 
                  p: 2, 
                  mt: 2, 
                  borderRadius: 1,
                  fontFamily: 'monospace'
                }}>
                  {formula.example}
                </Box>
              </CardContent>
            </Card>
          ))}
        </List>
      </Container>
    </div>
  );
}

export default App;
