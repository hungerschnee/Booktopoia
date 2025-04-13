export interface Book {
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
    rating?: number; // Average rating (e.g., out of 5)
    reviews?: BookReview[]; // Optional array of reviews
}

export interface BookReview {
    user: string; // Username or ID of the reviewer
    rating: number; // Rating given by the reviewer
    comment: string; // Review text
    date: string; // Date of the review
}

export interface AggregatedBook {
    book: Book; // Use the details of the first book found with this ISBN
    count: number; // How many books share this ISBN
}