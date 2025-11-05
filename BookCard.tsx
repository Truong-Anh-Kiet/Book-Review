import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  isbn: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  genre?: string;
  onClick?: () => void;
}

export default function BookCard({
  title,
  author,
  coverImage,
  rating,
  reviewCount,
  genre,
  onClick,
}: BookCardProps) {
  return (
    <Card
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all"
      onClick={onClick}
      data-testid="card-book"
    >
      <div className="aspect-[2/3] relative overflow-hidden bg-muted">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
          data-testid="img-book-cover"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg line-clamp-2" data-testid="text-book-title">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1" data-testid="text-book-author">
            {author}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm font-medium" data-testid="text-book-rating">
              {rating.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground" data-testid="text-review-count">
              ({reviewCount})
            </span>
          </div>
          {genre && (
            <Badge variant="secondary" className="text-xs" data-testid="badge-genre">
              {genre}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
