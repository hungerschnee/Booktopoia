<template>
  <div class="book-list-container">
    <h2>Available Books</h2>
    <ul class="book-list">
      <li v-for="item in uniqueBooksWithCount" :key="item.book.isbn" class="book-card">
        <img :src="item.book.coverImage" :alt="`Cover of ${item.book.title}`" class="book-cover" />
        <div class="book-details">
          <h3>{{ item.book.title }}</h3>
          <p class="book-author">by {{ item.book.author }}</p>
          <p class="book-info">
            Format: {{ item.book.format }} | Language: {{ item.book.language }} | Price: ${{ item.book.price.toFixed(2) }}
          </p>
          <p class="book-description">{{ item.book.description }}</p>
          <p class="book-isbn">ISBN: {{ item.book.isbn }}</p>
          <span v-if="item.count > 1" class="book-count-indicator">
            ({{ item.count }} available)
          </span>
          <p class="book-rating">Rating: {{ item.book.rating }}/5</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// --- Interfaces (copy these here or import from a types file) ---
interface BookReview {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  releaseDate: string;
  genre: string[];
  coverImage: string;
  description: string;
  pages: number;
  isbn: string;
  publisher?: string;
  language: string;
  format: 'hardcover' | 'paperback' | 'ebook' | 'audiobook';
  price: number;
  rating: number;
  reviews?: BookReview[];
}

// --- Your Mock Data (or fetch this data) ---
// In a real app, you'd likely pass this as a prop or fetch it
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
    isbn: '978-0345391803', // Unique ISBN
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
    coverImage: 'https://m.media-amazon.com/images/I/712P0p5cXIL._AC_UF894,1000_QL80_.jpg',
    description: 'A novel of manners.',
    pages: 432,
    isbn: '978-0141439518', // Unique ISBN
    publisher: 'Penguin Classics',
    language: 'English',
    format: 'paperback',
    price: 7.99,
    rating: 4.2,
  },
  {
    id: '3', // Original Dune
    title: 'Dune',
    author: 'Frank Herbert',
    releaseDate: '1965-08-01',
    genre: ['Science Fiction', 'Fantasy'],
    coverImage: 'https://m.media-amazon.com/images/I/81TmnPZWb0L._AC_UF894,1000_QL80_.jpg',
    description: 'A science fiction epic.',
    pages: 688,
    isbn: '978-0441013593', // <<< Same ISBN
    publisher: 'Ace Books',
    language: 'English',
    format: 'hardcover',
    price: 14.99,
    rating: 4.7,
  },
  {
    id: '4',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    releaseDate: '2019-02-05',
    genre: ['Thriller', 'Mystery'],
    coverImage: 'https://m.media-amazon.com/images/I/91lslnZ-btL._AC_UF1000,1000_QL80_.jpg',
    description: 'A psychological thriller.',
    pages: 336,
    isbn: '978-1250300596', // Unique ISBN
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
    isbn: '978-0062464701', // Unique ISBN
    publisher: 'Harper',
    language: 'English',
    format: 'paperback',
    price: 11.99,
    rating: 4.6,
  },
  {
    id: '6', // Duplicate Dune (different ID, same ISBN)
    title: 'Dune',
    author: 'Frank Herbert',
    releaseDate: '1965-08-01',
    genre: ['Science Fiction', 'Fantasy'],
    coverImage: 'https://m.media-amazon.com/images/I/81TmnPZWb0L._AC_UF894,1000_QL80_.jpg',
    description: 'A science fiction epic.',
    pages: 688,
    isbn: '978-0441013593', // <<< Same ISBN
    publisher: 'Ace Books',
    language: 'English',
    format: 'hardcover',
    price: 14.99, // Assuming same details for same ISBN
    rating: 4.7,
  },
];

// --- Computed property to process the books ---
interface AggregatedBook {
  book: Book; // Use the details of the first book found with this ISBN
  count: number; // How many books share this ISBN
}

const uniqueBooksWithCount = computed(() => {
  const booksByIsbn: Record<string, AggregatedBook> = {};

  for (const book of mockBooks) {
    if (!book.isbn) {
      console.warn(`Book with id ${book.id} ('${book.title}') is missing an ISBN and will be skipped.`);
      continue; // Skip books without an ISBN if necessary
    }

    if (booksByIsbn[book.isbn]) {
      // If ISBN already exists, just increment the count
      booksByIsbn[book.isbn].count++;
    } else {
      // If ISBN is new, add the book and set count to 1
      booksByIsbn[book.isbn] = {
        book: book, // Store the first encountered book object
        count: 1,
      };
    }
  }

  // Return an array of the aggregated book objects
  return Object.values(booksByIsbn);
});

</script>

<style scoped>
.book-list-container {
  font-family: sans-serif;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
}

.book-list {
  list-style: none;
  padding: 0;
  display: grid;
  /* Adjust grid columns for responsiveness */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.book-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column; /* Stack image and details */
  transition: transform 0.2s ease-in-out;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

.book-cover {
  width: 100%;
  height: 250px; /* Adjust height as needed */
  object-fit: cover; /* Crop image nicely */
  /* For better aspect ratio control, you might contain it */
  /* aspect-ratio: 2 / 3; */
  display: block;
}

.book-details {
  padding: 1rem;
  flex-grow: 1; /* Allow details to take remaining space */
  display: flex;
  flex-direction: column;
}

.book-details h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  line-height: 1.3;
}

.book-author {
  font-style: italic;
  color: #555;
  margin-bottom: 0.75rem;
}

.book-info {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.75rem;
}

.book-description {
  font-size: 0.9rem;
  color: #333;
  line-height: 1.5;
  margin-bottom: 0.75rem;
  /* Limit description length if needed */
  /* display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden; */
  flex-grow: 1; /* Push ISBN/Count/Rating to bottom */
}

.book-isbn {
  font-size: 0.8rem;
  color: #888;
  margin-top: auto; /* Pushes to the bottom */
  margin-bottom: 0.25rem;
}

.book-count-indicator {
  font-weight: bold;
  color: #28a745; /* Green color for availability */
  font-size: 0.9rem;
  margin-left: 0.5rem; /* Space it from rating/isbn */
  display: inline-block; /* Keep it on the same line if possible */
  margin-bottom: 0.25rem;
}

.book-rating {
  font-size: 0.9rem;
  font-weight: bold;
  color: #ffc107; /* Gold for rating */
  margin-bottom: 0;
}


</style>