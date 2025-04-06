from fastapi import FastAPI, HTTPException, Depends
from typing import List, Optional
from datetime import date

#class models
class Book():
    id: int
    titel: str
    author: str
    isbn: str
    borrowed: bool

class User():
    id: int
    name: str
    email: str
    password: str
    borrowed_books: List[Book] = []

    def __init__(self, id: int, name: str, email: str, password: str):
        self.id = id
        self.name = name
        self.email = email
        self.password = password
    
    def add_book(self, isbn: str, title: str, author: str):
        book = Book(id=len(library.books) + 1, title=title, author=author, isbn=isbn, borrowed=False)
        library.books.append(book)

    def remove_book(self, isbn: str):
        library.books = [book for book in library.books if book.isbn != isbn]

    def borrow_book(self, book: Book):
        if book in library.books and not book.borrowed:
            book.borrowed = True
            self.borrowed_books.append(book)
        else:
            raise HTTPException(status_code=400, detail="Book is not available")

    def return_book(self, book: Book):
        if book in self.borrowed_books:
            book.borrowed = False
            self.borrowed_books.remove(book)

    
#Librarain Class currently unused
class Librarian(User):
    def add_book(self, isbn: str, title: str, author: str):
        book = Book(id=len(library.books) + 1, title=title, author=author, isbn=isbn, borrowed=False)
        library.books.append(book)

    def remove_book(self, isbn: str):
        library.books = [book for book in library.books if book.isbn != isbn]

#Customer Class currently unused
class Customer(User):
    borrowed_books: List[Book] = []
    
    def __init__(self):
        super().__init__()

    def borrow_book(self, book: Book):
        if book in library.books and not book.borrowed:
            book.borrowed = True
            self.borrowed_books.append(book)
        else:
            raise HTTPException(status_code=400, detail="Book is not available")

    def return_book(self, book: Book):
        if book in self.borrowed_books:
            book.borrowed = False
            self.borrowed_books.remove(book)

class Library():
    books: List[Book] = []
    users: List[User] = []
    #customers: List[Customer] = []
    #librarians: List[Librarian] = []

    def add_book(self, isbn: str, title: str, author: str):
        book = Book(id=len(self.books) + 1, title=title, author=author, isbn=isbn, borrowed=False)
        self.books.append(book)

    def add_User(self, name, email, password):
        user = User.__init__(id=len(self.users), name=name, email=email, password=password)
        self.users.append(user)

    #def add_Customer(self, name, email, password):
        #customer = Customer().__init__()

    #def add_Librarian(self):
        #pass

    def search_Book(self):
        pass


class Lend():
    book: Book
    customer: Customer
    borrowDate: date
    dueDate: date
    turnBack: bool

    def __init__(self, book: Book, customer: Customer):
        self.book = book
        self.customer = book
        self.borrowDate = date.today()
        self.dueDate = date.today() + 14
        self.turnBack = False

library = Library()