import mysql.connector
import os

def convertToBinaryData(filename):
    # Convert digital data to binary format
    with open(filename, 'rb') as file:
        binaryData = file.read()
    return binaryData


def updateBLOB(name, photo):
    try:
        connection = mysql.connector.connect(host='us-cdbr-east-05.cleardb.net',
                                             database='heroku_f13ed75351ba510',
                                             user='bc7884781ae97a',
                                             password='775b6e8e')

        cursor = connection.cursor()
        sql_insert_blob_query = """ Update scooter set scooter_image = %s where scooter_name = %s """

        empPicture = convertToBinaryData(photo)

        # Convert data into tuple format
        update_blob_tuple = (empPicture, name)
        result = cursor.execute(sql_insert_blob_query, update_blob_tuple)
        connection.commit()

    except mysql.connector.Error as error:
        print("Failed updating BLOB data into MySQL table {}".format(error))

    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print(name,"is updated")



def batch_update(path):
    for fname in os.listdir(path):
        if(fname.endswith('.jpeg')):
            new_fname = fname.replace(".jpeg","")
            if(new_fname == "2021 Kymco 金牌 125"):
                updateBLOB(new_fname,path+fname)
                break
           
     

batch_update("./img/scooter/")


