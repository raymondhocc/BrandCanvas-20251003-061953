import React, { useState, useEffect } from 'react';
import { GeneratedVisual } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Save, X } from 'lucide-react';
interface VisualEditorProps {
  visual: GeneratedVisual | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedVisual: GeneratedVisual) => void;
}
const themeColorOptions = [
  { value: '#4338ca', label: 'Indigo' },
  { value: '#db2777', label: 'Pink' },
  { value: '#16a34a', label: 'Green' },
  { value: '#f97316', label: 'Orange' },
  { value: '#0ea5e9', label: 'Sky Blue' },
];
export function VisualEditor({ visual, isOpen, onClose, onSave }: VisualEditorProps) {
  const [editedVisual, setEditedVisual] = useState<GeneratedVisual | null>(visual);
  useEffect(() => {
    setEditedVisual(visual);
  }, [visual]);
  if (!isOpen || !editedVisual) {
    return null;
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedVisual(prev => prev ? { ...prev, [name]: value } : null);
  };
  const handleColorChange = (color: string) => {
    setEditedVisual(prev => prev ? { ...prev, primaryColor: color } : null);
  };
  const handleSave = () => {
    if (editedVisual) {
      onSave(editedVisual);
      onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] grid-cols-2 gap-8 p-0">
        <div className="p-6 flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-brand-primary dark:text-brand-bg">Edit Visual</DialogTitle>
            <DialogDescription>
              Refine the AI-generated visual. Your changes will be saved for this project.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 space-y-6 flex-1">
            <div className="space-y-2">
              <Label htmlFor="headline" className="text-base">Headline</Label>
              <Input
                id="headline"
                name="headline"
                value={editedVisual.headline}
                onChange={handleInputChange}
                className="text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ctaText" className="text-base">Call to Action</Label>
              <Input
                id="ctaText"
                name="ctaText"
                value={editedVisual.ctaText}
                onChange={handleInputChange}
                className="text-base"
              />
            </div>
            <Separator />
            <div className="space-y-3">
              <Label className="text-base">Theme Color</Label>
              <div className="flex items-center gap-3">
                {themeColorOptions.map(color => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => handleColorChange(color.value)}
                    className={`h-10 w-10 rounded-full border-2 transition-all duration-200 ${editedVisual.primaryColor === color.value ? 'ring-2 ring-offset-2 ring-brand-primary dark:ring-brand-bg' : 'border-transparent'}`}
                    style={{ backgroundColor: color.value }}
                    aria-label={color.label}
                  />
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose} className="flex items-center gap-2">
              <X className="h-4 w-4" /> Cancel
            </Button>
            <Button onClick={handleSave} className="bg-brand-primary text-white hover:bg-brand-primary/90 flex items-center gap-2">
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </DialogFooter>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-8 rounded-r-lg">
          <div className="w-full aspect-[16/9] bg-white rounded-lg shadow-lg overflow-hidden relative">
            <img src={editedVisual.imageUrl} alt={editedVisual.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center p-4">
              <h2 className="text-4xl font-bold text-white drop-shadow-lg mb-4">{editedVisual.headline}</h2>
              <button
                className="text-white font-semibold py-2 px-6 rounded-full transition-colors duration-300"
                style={{ backgroundColor: editedVisual.primaryColor }}
              >
                {editedVisual.ctaText}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}