import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { GenerationFormState, generationFormSchema, locales } from '@/lib/types';
import { Wand2, Upload } from 'lucide-react';
interface ControlSidebarProps {
  onSubmit: (data: GenerationFormState) => void;
  isLoading: boolean;
  formData: GenerationFormState | null;
}
const brandColorOptions = [
  { value: '#4338ca', label: 'Indigo' },
  { value: '#db2777', label: 'Pink' },
  { value: '#16a34a', label: 'Green' },
  { value: '#f97316', label: 'Orange' },
  { value: '#0ea5e9', label: 'Sky Blue' },
];
export function ControlSidebar({ onSubmit, isLoading, formData }: ControlSidebarProps) {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<GenerationFormState>({
    resolver: zodResolver(generationFormSchema),
    defaultValues: {
      productName: '',
      description: '',
      targetLocale: 'en-US',
      logoUrl: '',
      brandColors: [],
    },
  });
  useEffect(() => {
    if (formData) {
      reset(formData);
    }
  }, [formData, reset]);
  return (
    <aside className="w-[280px] bg-white dark:bg-gray-900/80 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <ScrollArea className="flex-1">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Product Details</h2>
            <div className="space-y-3">
              <Label htmlFor="productName">Product Name</Label>
              <Controller
                name="productName"
                control={control}
                render={({ field }) => <Input id="productName" placeholder="e.g., Cloudflare Workers" {...field} />}
              />
              {errors.productName && <p className="text-sm text-red-500">{errors.productName.message}</p>}
            </div>
            <div className="space-y-3">
              <Label htmlFor="description">Description</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => <Textarea id="description" placeholder="Describe your product..." {...field} rows={4} />}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
            </div>
            <div className="space-y-3">
              <Label htmlFor="targetLocale">Target Locale</Label>
              <Controller
                name="targetLocale"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger id="targetLocale">
                      <SelectValue placeholder="Select a locale" />
                    </SelectTrigger>
                    <SelectContent>
                      {locales.map(locale => (
                        <SelectItem key={locale.value} value={locale.value}>{locale.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.targetLocale && <p className="text-sm text-red-500">{errors.targetLocale.message}</p>}
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Brand Guidelines</h2>
            <div className="space-y-3">
              <Label>Logo (mock)</Label>
              <Button variant="outline" className="w-full flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Upload className="h-4 w-4" />
                Upload Logo
              </Button>
            </div>
            <div className="space-y-3">
              <Label>Brand Colors</Label>
              <Controller
                name="brandColors"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-5 gap-2">
                    {brandColorOptions.map(color => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => {
                          const currentColors = field.value || [];
                          const newColors = currentColors.includes(color.value)
                            ? currentColors.filter(c => c !== color.value)
                            : [...currentColors, color.value];
                          field.onChange(newColors);
                        }}
                        className={`h-10 w-10 rounded-full border-2 transition-all ${field.value?.includes(color.value) ? 'border-brand-primary ring-2 ring-brand-accent' : 'border-transparent'}`}
                        style={{ backgroundColor: color.value }}
                        aria-label={color.label}
                      />
                    ))}
                  </div>
                )}
              />
              {errors.brandColors && <p className="text-sm text-red-500">{errors.brandColors.message}</p>}
            </div>
          </div>
        </form>
      </ScrollArea>
      <div className="p-6 border-t border-gray-200 dark:border-gray-800">
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
          className="w-full bg-brand-primary text-white hover:bg-brand-primary/90 active:scale-95 hover:scale-105 transition-transform duration-200 focus:ring-2 focus:ring-pink-400 flex items-center gap-2 text-lg py-6"
        >
          <Wand2 className="h-5 w-5" />
          {isLoading ? 'Generating...' : 'Generate'}
        </Button>
      </div>
    </aside>
  );
}