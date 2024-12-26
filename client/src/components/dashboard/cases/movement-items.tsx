'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Pencil, Check, X } from 'lucide-react';
import type { CaseMovement } from '@/types/case';

interface MovementItemProps {
  movement: CaseMovement;
  onUpdateDescription: (description: string) => void;
}

export default function MovementItem({
  movement,
  onUpdateDescription,
}: MovementItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(
    movement.description,
  );

  const handleSave = () => {
    onUpdateDescription(editedDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedDescription(movement.description);
    setIsEditing(false);
  };

  return (
    <div className="flex items-start gap-4 rounded-lg border p-4">
      <div className="flex-1">
        <div className="mb-2 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {new Date(movement.date).toLocaleDateString()}
          </span>
        </div>
        {isEditing ? (
          <div className="space-y-2">
            <Textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows={2}
              className="resize-none"
            />
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="ghost" onClick={handleCancel}>
                <X className="mr-1 h-4 w-4" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Check className="mr-1 h-4 w-4" />
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-between gap-4">
            <p className="flex-1 text-sm">{movement.description}</p>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="mt-[-4px]"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
