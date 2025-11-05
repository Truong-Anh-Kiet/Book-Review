import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowLeft, Pencil } from "lucide-react";
import ReviewCard from "./ReviewCard";

interface Review {
  id: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

interface BookDetailViewProps {
  book: {
    id: string;
    title: string;
    author: string;
    isbn: string;
    description: string;
    coverImage: string;
    genre: string;
    publishedYear: number;
    rating: number;
    reviewCount: number;
  };
  reviews: Review[];
  currentUsername?: string;
  isLoggedIn: boolean;
  onBack: () => void;
  onAddReview: () => void;
  onEditReview: (reviewId: string) => void;
  onDeleteReview: (reviewId: string) => void;
}

export default function BookDetailView({
  book,
  reviews,
  currentUsername,
  isLoggedIn,
  onBack,
  onAddReview,
  onEditReview,
  onDeleteReview,
}: BookDetailViewProps) {
  const hasUserReviewed = reviews.some((r) => r.username === currentUsername);

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} data-testid="button-back">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Books
      </Button>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <div className="aspect-[2/3] relative overflow-hidden rounded-md bg-muted">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover"
              data-testid="img-book-cover-detail"
            />
          </div>
          <Card className="p-4 space-y-2">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">ISBN</p>
              <p className="font-mono text-sm" data-testid="text-isbn">
                {book.isbn}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Published</p>
              <p className="text-sm" data-testid="text-published-year">
                {book.publishedYear}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Genre</p>
              <Badge variant="secondary" data-testid="badge-genre-detail">
                {book.genre}
              </Badge>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold mb-2" data-testid="text-book-title-detail">
                {book.title}
              </h1>
              <p className="text-xl text-muted-foreground" data-testid="text-author-detail">
                by {book.author}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-primary text-primary" />
                <span className="text-lg font-semibold" data-testid="text-average-rating">
                  {book.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-muted-foreground" data-testid="text-total-reviews">
                {book.reviewCount} reviews
              </span>
            </div>

            <div>
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-description">
                {book.description}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-2xl font-bold">Reviews</h2>
              {isLoggedIn && !hasUserReviewed && (
                <Button onClick={onAddReview} data-testid="button-write-review">
                  <Pencil className="w-4 h-4 mr-2" />
                  Write a Review
                </Button>
              )}
            </div>

            {!isLoggedIn && (
              <Card className="p-4 bg-muted/50">
                <p className="text-sm text-muted-foreground text-center">
                  Please log in to write a review
                </p>
              </Card>
            )}

            <div className="space-y-4">
              {reviews.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">
                    No reviews yet. Be the first to review this book!
                  </p>
                </Card>
              ) : (
                reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    id={review.id}
                    username={review.username}
                    rating={review.rating}
                    comment={review.comment}
                    date={review.date}
                    isOwnReview={review.username === currentUsername}
                    onEdit={() => onEditReview(review.id)}
                    onDelete={() => onDeleteReview(review.id)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
