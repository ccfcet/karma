import xlrd
import datetime
import time
import mysql.connector
import json

#inport database configuration from the config file
with open("../../src/lib/data/config/config.json","r") as configFile:
	configDataJSON = json.load(configFile)

# Establish a connection with the database
db_connection = mysql.connector.connect(
  	host="localhost",
  	user=configDataJSON['sequelize']['development']['username'],
  	passwd=configDataJSON['sequelize']['development']['password'],
  	database=configDataJSON['sequelize']['development']['database']
  	)
db_cursor = db_connection.cursor()

#Create tables and relations if they already dont exist
tableCreationScript = open("executeTableCreationScript.sql","r")
for query in tableCreationScript:
	db_cursor.execute(query)
	db_connection.commit()
tableCreationScript.close()

#taking file from the location
loc = ("Karma Data-10.xlsx")
studentsData = xlrd.open_workbook(loc)
basicDataSheet = studentsData.sheet_by_index(0)
outputFileStudentsData = open("studentsDataSQLfile.txt","w+")

#adding columns of the table as specified in the excelsheet
colNameList = []
for colName in range(basicDataSheet.ncols):
	colNameList.append(basicDataSheet.cell_value(0,colName))
	print(colNameList[colName])
colNameList.append("created_at")
colNameList.append("updated_at")

for i in range(1,basicDataSheet.nrows):
	format_list = []
	for j in range(basicDataSheet.ncols):
		format_list.append(basicDataSheet.cell_value(i,j))
	ts = time.time()
	st = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')
	format_list.append(st)
	format_list.append(st)
	list = xlrd.xldate_as_tuple(format_list[4], 0)
	year = list[0]
	month = list[1]
	date = list[2]
	format_list[4]="{0}-{1}-{2}".format(year,month,date)
	finalListToQuery = colNameList+format_list
	outputFileStudentsData.write("INSERT INTO `people`(`{}`, `{}`, `{}`, `{}`, `{}`, `{}`, `{}`, `{}`) VALUES ('{}','{}','{}','{}','{}','{}','{}','{}')\n".format(*finalListToQuery))
studentsDataFileSQL = open("studentsDataSQLFile.txt","r")
for query in studentsDataFileSQL:
	db_cursor.execute(query)
	db_connection.commit()
studentsDataFileSQL.close()