import json
import xlwt
import xlrd
# createExcelSheetsFile = open("tablesInDatabase.txt","r")

with open("karma.json") as createExcelSheetsFile:
	databaseTablesWithAttributesJSON = json.load(createExcelSheetsFile)
wb = xlwt.Workbook() #creates a new xlsx file

for table in databaseTablesWithAttributesJSON:
	# print(table['name'])
	sheetName = table['name']
	while(len(sheetName)>31):
		sheetName = (sheetName[sheetName.find('_')+1:])
	print(sheetName)
	# if sheetName in wb.sheet_names():
	# 	currentSheet = wb.sheet_by_name(sheetName)
	# else:
	currentSheet = wb.add_sheet(sheetName)
	k=0
	for item in table['data']:
		currentSheet.write(0,k,item)
		k+=1
wb.save('karmaData.xls')

	# newSheet = wb.add_sheet(table)
# wb.save("dataSheet.xlsx")