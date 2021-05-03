from typing import Optional
from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
import json
import mysql.connector
app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:4200",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/produits")
def fetch_produits():
    mydb = mysql.connector.connect(host="localhost", user="root", password="", database="goodeats")
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * from produits")
    row_headers=[x[0] for x in mycursor.description]
    myresult = mycursor.fetchall()
    json_data=[]
    for result in myresult:
        json_data.append(dict(zip(row_headers,result)))
    return json_data

@app.get("/produits/{id}")
def single_product(id: int):
    mydb = mysql.connector.connect(host="localhost", user="root", password="", database="goodeats")
    mycursor = mydb.cursor()
    mycursor.execute(f"SELECT * from produits where id={id}")
    row_headers=[x[0] for x in mycursor.description]
    myresult = mycursor.fetchall()
    json_data=[]
    for result in myresult:
        json_data.append(dict(zip(row_headers,result)))
    return json_data

@app.post("/ajouter")
async def ajouter(request: Request):
    mydb = mysql.connector.connect(host="localhost", user="root", password="", database="goodeats")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    try:
        mycursor.execute(f"INSERT INTO `produits` (`id`, `nom`, `descrip`, `img`, `prix`) VALUES (NULL, '{body['nom']}', '{body['descrip']}', '{body['img']}', '{body['prix']}')")
        mydb.commit()
        return {"OK"}
    except:
        mydb.rollback()
        return {"Non"}

@app.put("/modifier")
async def modifier(request: Request):
    mydb = mysql.connector.connect(host="localhost", user="root", password="", database="goodeats")
    mycursor = mydb.cursor()
    body = json.loads(await request.body())
    try:
        mycursor.execute(f"UPDATE `produits` SET nom='{body['nom']}', descrip='{body['descrip']}', prix='{body['prix']}' where id={body['id']}")
        mydb.commit()
        return {"Updated"}
    except:
        mydb.rollback()
        return {"Non"}

@app.delete("/supprimer/{id}")
def delete_product(id: int):
    mydb = mysql.connector.connect(host="localhost", user="root", password="", database="goodeats")
    mycursor = mydb.cursor()
    #body = json.loads(await request.body())
    mycursor.execute(f"DELETE FROM `produits` where id = {id}")
    mydb.commit()
    return "Produit supprimé"