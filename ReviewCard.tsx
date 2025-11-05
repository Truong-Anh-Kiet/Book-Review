import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, Pencil, Trash2 } from "lucide-react";

interface ReviewCardProps {
  id: string;
  username: string;
  rating: number;
  comment: string;
  date: string;
  isOwnReview?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ReviewCard({
  username,
  rating,
  comment,
  date,
  isOwnReview = false,
  onEdit,
  onDelete,
}: ReviewCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="p-4" data-testid="card-review">
      <div className="flex gap-4">
        <Avatar data-testid="avatar-user">
          <AvatarFallback>{getInitials(username)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-medium" data-testid="text-username">
                {username}
              </p>
              <p className="text-sm text-muted-foreground" data-testid="text-review-date">
                {date}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              {isOwnReview && (
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={onEdit}
                    data-testid="button-edit-review"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={onDelete}
                    data-testid="button-delete-review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <p className="text-sm" data-testid="text-review-comment">
            {comment}
          </p>
        </div>
      </div>
    </Card>
  );
}
