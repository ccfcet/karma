This script as of now works for the people table, minor edits will make it functional for all tables.

Changes to be made are, to make the script dynamic, by taking data from excelsheets, and create a script that makes the excel sheets as well. 

Dynamically detects created_at, updated_at columns and fills it with python.time() module. Finds other date elements and converts them from MS Excel's 1904 representation to a proper MySQL representation.

Fill in the tablesInDatabase.txt file and also make a tablesWithAttributesKarma.json file, which comprises of the full json structure of all tables in the database.

Execution of this script is simple. Just load the excelsheet with data from the people table, under the name "Karma Data-10.xlsx" (to be made dynamic, by fetching from the tablesIndatabase file), and filling in info as mentioned, the run 

<code>python enterStudents.py</code>