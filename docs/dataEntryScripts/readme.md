# Idea
This script as of now works for the people table, minor edits will make it functional for all tables.

Changes to be made are, to make the script dynamic, by taking data from excelsheets, and create a script that makes the excel sheets as well. 

Dynamically detects created_at, updated_at columns and fills it with python.time() module. Finds other date elements and converts them from MS Excel's 1904 representation to a proper MySQL representation.
### Setup
Fill in the tablesInDatabase.txt file and also make a tablesWithAttributesKarma.json file, which comprises of the full json structure of all tables in the database.

### Usage
Execution of this script is simple.
<code>pip3 install xlrd mysql.connector xlwt</code>
to install the pip packages, required for it to function 
> Load the excelsheet with data from the people table, under the name "Karma Data-10.xlsx" (to be made dynamic, by  fetching from the tablesIndatabase file)
> Fill in info as mentioned, the run 
<code>python enterStudents.py</code>

### Usage when fully functional

- Install pip3 packages.
- run <code> python importFromExcelsheetToDatabase.py
- If you have not created the database, select create database in the script, after editing MySQL config in the config.json file.
- Upon running the create database option (script), it will creata a database karma with all the tables and constraints in place.
- Next, select the create excelsheet option, which will create an excelsheet, corresponding to the tables and attributes of the karma database. Each table appears as a sheet.
- Input the required data into the tables, as mentioned in the sheet, meaning input clean data.
- Now select the option to run the update database query, which executes the data in the excel file to sync with the database, enabling easy entry of data into the dabatase for someone with little or no SQL experience.