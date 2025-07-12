
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Edit2, Trash2, Send } from "lucide-react";
import { useComments, Comment } from "@/hooks/useComments";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CommentSectionProps {
  episodeId: string;
}

export default function CommentSection({ episodeId }: CommentSectionProps) {
  const { comments, loading, addComment, updateComment, deleteComment } = useComments(episodeId);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState<number>(0);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { toast } = useToast();

  // Get current user ID
  useState(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUserId(user?.id || null);
    });
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      await addComment(newComment, newRating || undefined);
      setNewComment("");
      setNewRating(0);
    } catch (error) {
      // Error handling is done in the hook
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (comment: Comment) => {
    setEditingComment(comment.id);
    setEditContent(comment.content);
    setEditRating(comment.rating || 0);
  };

  const handleSaveEdit = async () => {
    if (!editingComment || !editContent.trim()) return;

    try {
      await updateComment(editingComment, editContent, editRating || undefined);
      setEditingComment(null);
      setEditContent("");
      setEditRating(0);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditContent("");
    setEditRating(0);
  };

  const handleDelete = async (commentId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) {
      await deleteComment(commentId);
    }
  };

  const StarRating = ({ rating, onRatingChange, readonly = false }: {
    rating: number;
    onRatingChange?: (rating: number) => void;
    readonly?: boolean;
  }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          } ${readonly ? "" : "cursor-pointer hover:text-yellow-400"}`}
          onClick={() => !readonly && onRatingChange?.(star)}
        />
      ))}
    </div>
  );

  if (loading) {
    return <div className="p-4 text-center">Chargement des commentaires...</div>;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Commentaires ({comments.length})</h3>
      
      {/* Add Comment Form */}
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Votre évaluation (optionnel)
              </label>
              <StarRating rating={newRating} onRatingChange={setNewRating} />
            </div>
            
            <Textarea
              placeholder="Partagez votre avis sur cet épisode..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-20"
            />
            
            <Button type="submit" disabled={submitting || !newComment.trim()}>
              <Send className="h-4 w-4 mr-2" />
              {submitting ? "Publication..." : "Publier"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.profiles?.avatar_url} />
                    <AvatarFallback>
                      {comment.profiles?.name?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">
                      {comment.profiles?.name || "Utilisateur"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.created_at), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {comment.rating && (
                    <div className="flex items-center gap-1">
                      <StarRating rating={comment.rating} readonly />
                      <Badge variant="secondary" className="text-xs">
                        {comment.rating}/5
                      </Badge>
                    </div>
                  )}
                  
                  {currentUserId === comment.user_id && (
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(comment)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(comment.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              {editingComment === comment.id ? (
                <div className="space-y-3">
                  <StarRating rating={editRating} onRatingChange={setEditRating} />
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="min-h-16"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveEdit}>
                      Sauvegarder
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                      Annuler
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-relaxed">{comment.content}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
