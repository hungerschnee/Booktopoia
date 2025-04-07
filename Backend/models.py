from fastapi import FastAPI, HTTPException, Depends
from typing import List, Optional
from datetime import date

#class models
class Book():
    isbn: str
    title: str
    pages: str
    author: str
    genre: str
    publisher: str
    description: str
    picture: str

    def __init__(self, title: str, author: str, isbn: str):
        self.title = title
        self.author = author
        self.isbn = isbn
        self.borrowed = False

class Exemplar():
    id: str
    book: Book
    condition: str
    borrowed: bool


class User():
    id: int
    first_name: str
    last_name: str
    adresse: str
    tel_Nr: str
    email: str
    password: str
    library: 'Library' = None

    def __init__(self, id: int, name: str, email: str, password: str):
        self.id = id
        self.name = name
        self.email = email
        self.password = password

    def borrow_exemplar(self, exemplar: Exemplar):
        if exemplar.borrowed:
            print("Exemplar ist bereits ausgeliehen.")
            return None
        exemplar.borrowed = True
        lend = Lend(exemplar, self)
        self.library.lendings.append(lend)
        return lend

    def return_exemplar(self, exemplar: Exemplar):
        for lend in self.library.lendings:
            if lend.exemplar == exemplar and lend.user == self and not lend.returned:
                lend.return_exemplar()
                print("Exemplar wurde zurückgegeben.")
                return True
        print("Keine passende Ausleihe gefunden.")
        return False

    
#Librarain Class currently unused
'''
#class Librarian(User):
    def add_book(self, isbn: str, title: str, author: str):
        book = Book(id=len(library.books) + 1, title=title, author=author, isbn=isbn, borrowed=False)
        library.books.append(book)

    def remove_book(self, isbn: str):
        library.books = [book for book in library.books if book.isbn != isbn]
'''
#Customer Class currently unused
'''
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
'''

class Lend():
    id: str
    exemplar: Exemplar
    user: User
    borrowDate: date
    dueDate: date
    turnBack: bool

    def __init__(self, exemplar: Exemplar, customer: User):
        self.exemplar = Exemplar
        self.user = User
        self.borrowDate = date.today()
        self.dueDate = date.today() + 14
        self.turnBack = False

class Library():
    books: List[Book] = []
    exemplars: List[Exemplar] = []
    users: List[User] = []
    #customers: List[Customer] = []
    #librarians: List[Librarian] = []
    lendings: List[Lend] = []


    def add_book(self, book: Book):
        book.id = len(self.books) + 1
        self.books.append(book)

    def add_exemplar(self, exemplar: Exemplar):
        # Füge Exemplar zur Liste der Exemplare hinzu
        self.exemplars.append(exemplar)

    def delete_book_by_isbn(self, isbn: str) -> bool:
        matching = [e for e in self.exemplars if e.book.isbn == isbn]

        if not matching:
            print(f"Kein Buch mit ISBN {isbn} gefunden.")
            return False

        self.exemplars = [e for e in self.exemplars if e.book.isbn != isbn]
        print(f"{len(matching)} Exemplar(e) des Buchs mit ISBN {isbn} wurden gelöscht.")
        return True

    def delete_exemplar_by_id(self, exemplar_id: str):
        self.exemplars = [e for e in self.exemplars if e.exemplar_id != exemplar_id]

    def add_User(self, user):
        user.id = len(self.users)
        self.users.append(user)

    def search_books(self, name: str = None, author: str = None, isbn: str = None,
                     genre: str = None, borrowed: bool = None):
        result = self.books

        if name:
            result = [b for b in result if name.lower() in b.name.lower()]
        if author:
            result = [b for b in result if author.lower() in b.author.lower()]
        if isbn:
            result = [b for b in result if isbn in b.isbn]
        if genre:
            result = [b for b in result if genre.lower() in b.genre.lower()]
        if borrowed is not None:
            result = [b for b in result if b.borrowed == borrowed]

        return result


def main():
    library = Library()
    user = User(0, "Jannek", "JB@email", "123")

    library.add_User(user)
    library.add_book("123", "Buch", "Author")
    library.add_book("456", "Buch2", "Author")

    print(library.books)


if __name__=="__main__":
   main()