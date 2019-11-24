import xlrd
import datetime
import time
import mysql.connector

db_connection = mysql.connector.connect(
  	host="localhost",
  	user="root",
  	passwd="password",
  	database="karma"
  	)

loc = ("Karma Data-10.xlsx")
studentsData = xlrd.open_workbook(loc)
basicDataSheet = studentsData.sheet_by_index(0)
outputFileStudentsData = open("studentsDataSQLfile.txt","w+")
# print(basicDataSheet.cell_value(0,0))
# print(basicDataSheet.ncols)
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
	# print(list)
	year = list[0]
	month = list[1]
	date = list[2]
	format_list[4]="{0}-{1}-{2}".format(year,month,date)
	finalListToQuery = colNameList+format_list
	# print(finalListToQuery)
	outputFileStudentsData.write("INSERT INTO `people`(`{}`, `{}`, `{}`, `{}`, `{}`, `{}`, `{}`, `{}`) VALUES ('{}','{}','{}','{}','{}','{}','{}','{}')\n".format(*finalListToQuery))
db_cursor = db_connection.cursor()
studentsDataFileSQL = open("studentsDataSQLFile.txt","r")
for query in studentsDataFileSQL:
	db_cursor.execute(query)
	db_connection.commit()
