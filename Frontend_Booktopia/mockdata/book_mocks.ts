interface Book {
    id: string; // Unique identifier for the book
    title: string;
    author: string;
    releaseDate: string; // ISO 8601 format (YYYY-MM-DD) for consistency
    genre: string[]; // Array of genres for flexibility
    coverImage: string; // URL to the book cover image
    description: string; // Short description or blurb
    pages: number;
    isbn: string; // International Standard Book Number
    publisher?: string; // Optional publisher
    language: string;
    format: 'hardcover' | 'paperback' | 'ebook' | 'audiobook';
    price: number; // Price in your preferred currency
    rating: number; // Average rating (e.g., out of 5)
    reviews?: BookReview[]; // Optional array of reviews
    // Add any other properties you need
}

interface BookReview {
    user: string; // Username or ID of the reviewer
    rating: number; // Rating given by the reviewer
    comment: string; // Review text
    date: string; // Date of the review (ISO 8601)
}

const mockBooks: Book[] = [
    {
        id: '1',
        title: 'The Hitchhiker\'s Guide to the Galaxy',
        author: 'Douglas Adams',
        releaseDate: '1979-10-12',
        genre: ['Science Fiction', 'Comedy'],
        coverImage: 'https://m.media-amazon.com/images/I/71Mt00Ge1XL._AC_UF894,1000_QL80_.jpg', // Replace with actual URL
        description: 'A comedic science fiction series.',
        pages: 224,
        isbn: '978-0345391803',
        publisher: 'Del Rey',
        language: 'English',
        format: 'paperback',
        price: 9.99,
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
        coverImage: 'https://m.media-amazon.com/images/I/712P0p5cXIL._AC_UF894,1000_QL80_.jpg', // Replace with actual URL
        description: 'A novel of manners.',
        pages: 432,
        isbn: '978-0141439518',
        publisher: 'Penguin Classics',
        language: 'English',
        format: 'paperback',
        price: 7.99,
        rating: 4.2,
    },
    {
        id: '3',
        title: 'Dune',
        author: 'Frank Herbert',
        releaseDate: '1965-08-01',
        genre: ['Science Fiction', 'Fantasy'],
        coverImage: 'https://m.media-amazon.com/images/I/81TmnPZWb0L._AC_UF894,1000_QL80_.jpg', // Replace with actual URL
        description: 'A science fiction epic.',
        pages: 688,
        isbn: '978-0441013593',
        publisher: 'Ace Books',
        language: 'English',
        format: 'hardcover',
        price: 14.99,
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
        price: 12.99,
        rating: 4.0,
    },
    {
        id: '5',
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        releaseDate: '2014-02-04',
        genre: ['History', 'Non-Fiction'],
        coverImage: 'https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UF894,1000_QL80_.jpg',
        description: 'A thought-provoking exploration of human history.',
        pages: 416,
        isbn: '978-0062464701',
        publisher: 'Harper',
        language: 'English',
        format: 'paperback',
        price: 11.99,
        rating: 4.6,
    },
];

export default mockBooks; // Export for use in your Nuxt components