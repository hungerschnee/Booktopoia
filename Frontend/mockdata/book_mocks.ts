import type { Book } from '~/types/book'

const mockBooks: Book[] = [
    {
        id: '1',
        title: 'The Hitchhiker\'s Guide to the Galaxy',
        author: 'Douglas Adams',
        releaseDate: '1979-10-12',
        genre: ['Science Fiction', 'Comedy'],
        coverImage: 'https://m.media-amazon.com/images/I/71Mt00Ge1XL._AC_UF894,1000_QL80_.jpg',
        description: 'A comedic science fiction series.',
        pages: 224,
        isbn: '978-0345391803',
        publisher: 'Del Rey',
        language: 'English',
        format: 'paperback',
        rating: 4.5,
        reviews: [
            { user: 'user1', rating: 5, comment: 'A classic!', date: '2023-10-26' },
            { user: 'user2', rating: 4, comment: 'Hilarious and thought-provoking.', date: '2023-10-25' },
        ],
    },
    {
        id: '2',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        releaseDate: '1813-01-28',
        genre: ['Romance', 'Classic'],
        coverImage: 'https://m.media-amazon.com/images/I/712P0p5cXIL._AC_UF894,1000_QL80_.jpg',
        description: 'A novel of manners.',
        pages: 432,
        isbn: '978-0141439518',
        publisher: 'Penguin Classics',
        language: 'English',
        format: 'paperback',
        rating: 4.2,
    },
    {
        id: '3',
        title: 'Dune',
        author: 'Frank Herbert',
        releaseDate: '1965-08-01',
        genre: ['Science Fiction', 'Fantasy'],
        coverImage: 'https://m.media-amazon.com/images/I/81TmnPZWb0L._AC_UF894,1000_QL80_.jpg',
        description: 'A science fiction epic.',
        pages: 688,
        isbn: '978-0441013593',
        publisher: 'Ace Books',
        language: 'English',
        format: 'hardcover',
        rating: 4.7,
    },
    // Add more mock book data as needed...
    {
        id: '4',
        title: 'The Silent Patient',
        author: 'Alex Michaelides',
        releaseDate: '2019-02-05',
        genre: ['Thriller', 'Mystery'],
        coverImage: 'https://m.media-amazon.com/images/I/91lslnZ-btL._AC_UF1000,1000_QL80_.jpg',
        description: 'A psychological thriller.',
        pages: 336,
        isbn: '978-1250300596',
        publisher: 'Celadon Books',
        language: 'English',
        format: 'hardcover',
        rating: 4.0,
    },
    {
        id: '5',
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        releaseDate: '2014-02-04',
        genre: ['History', 'Non-Fiction'],
        coverImage: 'https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UF894,1000_QL80_.jpg',
        description: 'One hundred thousand years ago, at least six different species of humans inhabited Earth. Yet today there is only one—homo sapiens. What happened to the others? And what may happen to us? Most books about the history of humanity pursue either a historical or a biological approach, but Dr. Yuval Noah Harari breaks the mold with this highly original book that begins about 70,000 years ago with the appearance of modern cognition. From examining the role evolving humans have played in the global ecosystem to charting the rise of empires, Sapiens integrates history and science to reconsider accepted narratives, connect past developments with contemporary concerns, and examine specific events within the context of larger ideas.Dr. Harari also compels us to look ahead, because over the last few decades humans have begun to bend laws of natural selection that have governed life for the past four billion years. We are acquiring the ability to design not only the world around us, but also ourselves. Where is this leading us, and what do we want to become? Featuring 27 photographs, 6 maps, and 25 illustrations/diagrams, this provocative and insightful work is sure to spark debate and is essential reading for aficionados of Jared Diamond, James Gleick, Matt Ridley, Robert Wright, and Sharon Moalem.',
        pages: 416,
        isbn: '978-0062464701',
        publisher: 'Harper',
        language: 'English',
        format: 'paperback',
        rating: 4.6,
    },
    {
        id: '6',
        title: 'Dune',
        author: 'Frank Herbert',
        releaseDate: '1965-08-01',
        genre: ['Science Fiction', 'Fantasy'],
        coverImage: 'https://m.media-amazon.com/images/I/81TmnPZWb0L._AC_UF894,1000_QL80_.jpg',
        description: 'A science fiction epic.',
        pages: 688,
        isbn: '978-0441013593',
        publisher: 'Ace Books',
        language: 'English',
        format: 'hardcover',
        rating: 4.7,
    },
];

export default mockBooks;
