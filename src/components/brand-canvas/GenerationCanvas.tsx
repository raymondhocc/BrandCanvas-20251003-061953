import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { GeneratedVisual } from '@/lib/types';
import { Image, Sparkles } from 'lucide-react';
interface GenerationCanvasProps {
  visuals: GeneratedVisual[];
  isLoading: boolean;
  hasGenerated: boolean;
  onVisualSelect: (visual: GeneratedVisual) => void;
}
const WelcomeMessage = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    className="text-center flex flex-col items-center justify-center h-full p-8"
  >
    <div className="p-6 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full mb-6">
      <Sparkles className="h-16 w-16 text-brand-primary dark:text-brand-bg" />
    </div>
    <h2 className="text-3xl md:text-5xl font-illustrative text-brand-primary dark:text-brand-bg mb-4">
      Let's Create Magic
    </h2>
    <p className="max-w-md text-base text-gray-600 dark:text-gray-400">
      Fill in your product details and brand guidelines in the sidebar to generate stunning visuals with a single click.
    </p>
  </motion.div>
);
const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center flex flex-col items-center justify-center h-full p-8"
    >
      <div className="p-6 bg-red-100 dark:bg-red-900/30 rounded-full mb-6">
        <Image className="h-16 w-16 text-red-500 dark:text-red-400" />
      </div>
      <h2 className="text-3xl md:text-5xl font-illustrative text-brand-primary dark:text-brand-bg mb-4">
        No Visuals Found
      </h2>
      <p className="max-w-md text-base text-gray-600 dark:text-gray-400">
        The AI couldn't generate any visuals. Try adjusting your inputs or generating again.
      </p>
    </motion.div>
  );
const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {Array.from({ length: 8 }).map((_, index) => (
      <Card key={index} className="overflow-hidden">
        <CardContent className="p-0">
          <Skeleton className="w-full h-64 bg-gray-200 dark:bg-gray-700 shimmer-bg" />
        </CardContent>
      </Card>
    ))}
  </div>
);
export function GenerationCanvas({ visuals, isLoading, hasGenerated, onVisualSelect }: GenerationCanvasProps) {
  return (
    <main className="flex-1 p-8 md:p-12 overflow-y-auto bg-brand-bg dark:bg-gray-900">
      {isLoading ? (
        <LoadingSkeleton />
      ) : !hasGenerated ? (
        <WelcomeMessage />
      ) : visuals.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {visuals.map((visual) => (
            <motion.div
              key={visual.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              onClick={() => onVisualSelect(visual)}
            >
              <Card className="overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer group">
                <CardContent className="p-0 relative">
                  <img
                    src={visual.imageUrl}
                    alt={visual.alt}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4">
                    <h3 className="text-white font-bold text-lg drop-shadow-md truncate">{visual.headline}</h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyState />
      )}
    </main>
  );
}