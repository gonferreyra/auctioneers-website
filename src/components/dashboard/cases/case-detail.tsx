'use client';

import { useState } from 'react';
import CaseHeader from './case-header';
import CaseInfo from './case-info';
import CaseMovements from './case-movements';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import type { Case } from '@/types/case';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface CaseDetailProps {
  caseData: Case;
}

export default function CaseDetail({ caseData }: CaseDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCase, setEditedCase] = useState<Case>(caseData);
  const [originalCase] = useState<Case>(caseData);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleUpdate = (updates: Partial<Case>) => {
    setEditedCase((prev) => {
      const updated = { ...prev, ...updates };
      setHasUnsavedChanges(
        JSON.stringify(updated) !== JSON.stringify(originalCase),
      );
      return updated;
    });
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (
        !editedCase.title.trim() ||
        !editedCase.recordNumber.trim() ||
        !editedCase.court.trim()
      ) {
        toast.error('Please fill in all required fields');
        return;
      }

      // In a real app, this would be an API call
      console.log('Saving case:', editedCase);

      toast.success('Case updated successfully');
      setIsEditing(false);
      setHasUnsavedChanges(false);
    } catch (error) {
      toast.error('Failed to update case');
      console.error(error);
    }
  };

  const handleUndo = () => {
    setEditedCase(originalCase);
    setHasUnsavedChanges(false);
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      // Show confirmation dialog
      return;
    }
    handleUndo();
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <CaseHeader
          caseData={editedCase}
          isEditing={isEditing}
          onUpdate={handleUpdate}
        />
        <div className="ml-4 space-x-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>Edit Case</Button>
          ) : (
            <>
              {hasUnsavedChanges && (
                <Button
                  variant="outline"
                  onClick={handleUndo}
                  className="border-yellow-600 text-yellow-600 hover:bg-yellow-50"
                >
                  Undo Changes
                </Button>
              )}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Discard Changes?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You have unsaved changes. Are you sure you want to discard
                      them?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Continue Editing</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancel}>
                      Discard Changes
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button onClick={handleSave}>Save Changes</Button>
            </>
          )}
        </div>
      </div>

      <CaseInfo
        caseData={editedCase}
        isEditing={isEditing}
        onUpdate={handleUpdate}
      />

      <CaseMovements
        caseData={editedCase}
        isEditing={isEditing}
        onUpdate={(movement) => {
          handleUpdate({
            movements: [...editedCase.movements, movement],
          });
        }}
      />
    </div>
  );
}
