from fastapi import FastAPI, HTTPException, Depends
from typing import List, Optional
from datetime import date
from models import *

app = FastAPI()
library = Library()

@app.get("/books", response_model=List[Book])
def get_books():
    return library.books

@app.post("/books")
def add_book(book: Book, user: User = Depends()):
    user.add_book(book.isbn, book.title, book.author)
    return {"message": "Book added successfully"}

@app.delete("/books/{isbn}")
def remove_book(isbn: str, user: User = Depends()):
    user.remove_book(isbn)
    return {"message": "Book removed successfully"}

@app.get("/search", response_model=List[Book])
def search_books(title: Optional[str] = None, author: Optional[str] = None, isbn: Optional[str] = None, borrowed: Optional[bool] = None):
    return library.search_books(title, author, isbn, borrowed)

@app.get("/mybooks")
def get_mybooks(user: User):
    pass