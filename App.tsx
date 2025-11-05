import { Switch, Route, useLocation } from "wouter";
import { useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

import Header from "@/components/Header";
import BookCard from "@/components/BookCard";
import SearchBar from "@/components/SearchBar";
import BookDetailView from "@/components/BookDetailView";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import AddReviewDialog from "@/components/AddReviewDialog";

import mysteryImage from '@assets/generated_images/Mystery_thriller_book_cover_aff4f9fe.png';
import scifiImage from '@assets/generated_images/Science_fiction_book_cover_e108a1df.png';
import classicImage from '@assets/generated_images/Classic_literature_book_cover_371ff4e6.png';
import romanceImage from '@assets/generated_images/Romance_novel_book_cover_feb13bf8.png';
import businessImage from '@assets/generated_images/Business_book_cover_design_5af4ce7e.png';
import fantasyImage from '@assets/generated_images/Fantasy_adventure_book_cover_b831324f.png';

type Book = {
  id: string;
  title: string;
  author: string;
  isbn: string;
  description: string;
  coverImage: string;
  genre: string;
  publishedYear: number;
};

type Review = {
  id: string;
  bookId: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
};

const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Shadow Detective',
    author: 'Sarah Mitchell',
    isbn: '978-0-123456-78-9',
    description: 'In the fog-laden streets of Victorian London, Detective James Blackwood faces his most challenging case yet. When a series of mysterious disappearances leads him into the city\'s darkest corners, he must confront not only a cunning adversary but also the shadows of his own past.',
    coverImage: mysteryImage,
    genre: 'Mystery',
    publishedYear: 2023,
  },
  {
    id: '2',
    title: 'Stellar Horizons',
    author: 'Marcus Chen',
    isbn: '978-0-234567-89-0',
    description: 'In the year 2547, humanity has spread across the stars, but peace remains elusive. Commander Elena Rodriguez must navigate political intrigue and ancient alien mysteries to prevent an interstellar war that could destroy everything.',
    coverImage: scifiImage,
    genre: 'Science Fiction',
    publishedYear: 2024,
  },
  {
    id: '3',
    title: 'Pride and Perseverance',
    author: 'Elizabeth Thornton',
    isbn: '978-0-345678-90-1',
    description: 'A timeless tale of love, society, and personal growth in 19th century England. Follow the journey of Catherine Bennet as she navigates the complexities of class, family expectations, and matters of the heart.',
    coverImage: classicImage,
    genre: 'Classic Literature',
    publishedYear: 2022,
  },
  {
    id: '4',
    title: 'Summer in Provence',
    author: 'Sophie Laurent',
    isbn: '978-0-456789-01-2',
    description: 'When food blogger Emma travels to a charming village in Provence, she expects to discover new recipes. What she finds instead is a second chance at love with a brooding local chef who guards his heart as carefully as his secret recipes.',
    coverImage: romanceImage,
    genre: 'Romance',
    publishedYear: 2023,
  },
  {
    id: '5',
    title: 'The Lean Startup Method',
    author: 'David Harrison',
    isbn: '978-0-567890-12-3',
    description: 'A revolutionary approach to building successful companies in the modern age. Learn how to validate ideas, iterate quickly, and create sustainable growth through proven methodologies and real-world case studies.',
    coverImage: businessImage,
    genre: 'Business',
    publishedYear: 2024,
  },
  {
    id: '6',
    title: 'Realm of Dragons',
    author: 'Aria Moonstone',
    isbn: '978-0-678901-23-4',
    description: 'When young mage Lyra discovers she can speak to dragons, she becomes the key to an ancient prophecy. Join her on an epic quest across magical kingdoms, facing dark sorcerers and uncovering secrets that will change the realm forever.',
    coverImage: fantasyImage,
    genre: 'Fantasy',
    publishedYear: 2023,
  },
];

const mockReviews: Review[] = [
  {
    id: 'r1',
    bookId: '1',
    username: 'BookLover42',
    rating: 5,
    comment: 'Absolutely captivating! This book kept me on the edge of my seat from start to finish. The plot twists were unexpected and the character development was superb.',
    date: '2 days ago',
  },
  {
    id: 'r2',
    bookId: '1',
    username: 'MysteryFan',
    rating: 4,
    comment: 'Great atmosphere and compelling mystery. Some pacing issues in the middle, but the ending was worth it!',
    date: '1 week ago',
  },
  {
    id: 'r3',
    bookId: '2',
    username: 'SciFiEnthusiast',
    rating: 5,
    comment: 'Brilliant world-building and thought-provoking themes. One of the best sci-fi novels I\'ve read this year.',
    date: '3 days ago',
  },
];

function CatalogPage({
  books,
  onBookClick,
}: {
  books: Book[];
  onBookClick: (bookId: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState<"all" | "isbn" | "author" | "title">("all");

  const filteredBooks = books.filter((book) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();

    switch (searchType) {
      case "isbn":
        return book.isbn.toLowerCase().includes(query);
      case "author":
        return book.author.toLowerCase().includes(query);
      case "title":
        return book.title.toLowerCase().includes(query);
      default:
        return (
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.isbn.toLowerCase().includes(query) ||
          book.genre.toLowerCase().includes(query)
        );
    }
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="max-w-3xl mx-auto">
        <SearchBar
          onSearch={(query, type) => {
            setSearchQuery(query);
            setSearchType(type);
          }}
        />
      </div>

      {searchQuery && (
        <p className="text-muted-foreground">
          Found {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''}
          {searchType !== "all" && ` matching ${searchType}`}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => {
          const bookReviews = mockReviews.filter((r) => r.bookId === book.id);
          const avgRating =
            bookReviews.length > 0
              ? bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length
              : 0;

          return (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              isbn={book.isbn}
              coverImage={book.coverImage}
              rating={avgRating}
              reviewCount={bookReviews.length}
              genre={book.genre}
              onClick={() => onBookClick(book.id)}
            />
          );
        })}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No books found matching your search.</p>
        </div>
      )}
    </div>
  );
}

function Router() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  const handleLogin = (username: string) => {
    setCurrentUser(username);
    setLocation("/");
    toast({
      title: "Welcome back!",
      description: `Logged in as ${username}`,
    });
  };

  const handleRegister = (username: string) => {
    setCurrentUser(username);
    setLocation("/");
    toast({
      title: "Account created!",
      description: `Welcome to BookReview, ${username}`,
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLocation("/");
    toast({
      title: "Logged out",
      description: "See you next time!",
    });
  };

  const handleAddReview = (rating: number, comment: string) => {
    if (!currentUser || !selectedBookId) return;

    if (editingReviewId) {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === editingReviewId
            ? { ...r, rating, comment, date: "Just now" }
            : r
        )
      );
      toast({
        title: "Review updated",
        description: "Your review has been successfully updated.",
      });
    } else {
      const newReview: Review = {
        id: `r${Date.now()}`,
        bookId: selectedBookId,
        username: currentUser,
        rating,
        comment,
        date: "Just now",
      };
      setReviews((prev) => [newReview, ...prev]);
      toast({
        title: "Review posted",
        description: "Thank you for sharing your thoughts!",
      });
    }

    setReviewDialogOpen(false);
    setEditingReviewId(null);
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    toast({
      title: "Review deleted",
      description: "Your review has been removed.",
    });
  };

  const handleEditReview = (reviewId: string) => {
    setEditingReviewId(reviewId);
    setReviewDialogOpen(true);
  };

  const selectedBook = selectedBookId
    ? mockBooks.find((b) => b.id === selectedBookId)
    : null;
  const bookReviews = selectedBookId
    ? reviews.filter((r) => r.bookId === selectedBookId)
    : [];
  const editingReview = editingReviewId
    ? reviews.find((r) => r.id === editingReviewId)
    : null;

  return (
    <Switch>
      <Route path="/">
        <div className="min-h-screen flex flex-col">
          <Header
            isLoggedIn={!!currentUser}
            username={currentUser || undefined}
            onLoginClick={() => setLocation("/login")}
            onRegisterClick={() => setLocation("/register")}
            onLogoutClick={handleLogout}
          />
          {selectedBook ? (
            <main className="flex-1 container mx-auto px-4 py-8">
              <BookDetailView
                book={{
                  ...selectedBook,
                  rating:
                    bookReviews.length > 0
                      ? bookReviews.reduce((sum, r) => sum + r.rating, 0) /
                        bookReviews.length
                      : 0,
                  reviewCount: bookReviews.length,
                }}
                reviews={bookReviews}
                currentUsername={currentUser || undefined}
                isLoggedIn={!!currentUser}
                onBack={() => setSelectedBookId(null)}
                onAddReview={() => {
                  setEditingReviewId(null);
                  setReviewDialogOpen(true);
                }}
                onEditReview={handleEditReview}
                onDeleteReview={handleDeleteReview}
              />
              <AddReviewDialog
                open={reviewDialogOpen}
                onOpenChange={setReviewDialogOpen}
                bookTitle={selectedBook.title}
                existingReview={
                  editingReview
                    ? {
                        rating: editingReview.rating,
                        comment: editingReview.comment,
                      }
                    : undefined
                }
                onSubmit={handleAddReview}
              />
            </main>
          ) : (
            <main className="flex-1">
              <CatalogPage
                books={mockBooks}
                onBookClick={setSelectedBookId}
              />
            </main>
          )}
        </div>
      </Route>
      <Route path="/login">
        <div className="min-h-screen flex flex-col">
          <Header
            isLoggedIn={false}
            onLoginClick={() => {}}
            onRegisterClick={() => setLocation("/register")}
            onLogoutClick={() => {}}
          />
          <main className="flex-1 flex items-center justify-center bg-muted/30 px-4">
            <LoginForm
              onLogin={(username) => handleLogin(username)}
              onSwitchToRegister={() => setLocation("/register")}
            />
          </main>
        </div>
      </Route>
      <Route path="/register">
        <div className="min-h-screen flex flex-col">
          <Header
            isLoggedIn={false}
            onLoginClick={() => setLocation("/login")}
            onRegisterClick={() => {}}
            onLogoutClick={() => {}}
          />
          <main className="flex-1 flex items-center justify-center bg-muted/30 px-4">
            <RegisterForm
              onRegister={(username) => handleRegister(username)}
              onSwitchToLogin={() => setLocation("/login")}
            />
          </main>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
