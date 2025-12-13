import { motion as Motion } from 'framer-motion';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Clock, Lock } from 'lucide-react';

export default function ServiceCard({
  category,
  name,
  description,
  duration,
  price,
  deposit,
  image,
  onClick,
  onDeposit,
}) {
  const isPestanas = category === 'Pestañas';

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
    >
      <Card className="group overflow-hidden border-0 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.18)] transition-all duration-500 bg-card rounded-3xl">
        {/* Image */}
        <div className="relative h-64 w-full overflow-hidden bg-slate-100">
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent z-10" />

          <Motion.img
            src={image}
            alt={name}
            className="object-cover w-full h-full relative z-0"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />

          <Badge
            className={`absolute top-5 left-5 z-20 font-bold text-sm px-4 py-2 shadow-lg border-0 backdrop-blur-md rounded-full ${
              isPestanas
                ? 'bg-white/95 text-pink-600'
                : 'bg-white/95 text-orange-600'
            }`}
          >
            {category}
          </Badge>
        </div>

        <CardContent className="p-7 space-y-6">
          {/* Title + description */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-foreground leading-tight tracking-tight">
              {name}
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          {/* Duration + price */}
          <div className="flex items-end justify-between pt-4 pb-3 border-t border-border/40">
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <div className="bg-muted/60 p-2 rounded-full">
                <Clock className="h-4 w-4" />
              </div>
              <span className="text-base font-semibold">{duration}</span>
            </div>

            <p
              className={`text-4xl font-extrabold tracking-tight ${
                isPestanas ? 'text-pink-600' : 'text-orange-600'
              }`}
            >
              ${price}
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-3.5 pt-3">
            <Button
              onClick={onClick}
              className={`w-full h-14 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
                isPestanas
                  ? 'bg-linear-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white'
                  : 'bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
              }`}
            >
              Reservar ahora
            </Button>

            <Button
              onClick={onDeposit}
              variant="outline"
              className={`w-full h-12 text-base font-semibold rounded-full border-2 transition-all duration-300 ${
                isPestanas
                  ? 'border-pink-200 text-pink-700 hover:bg-pink-50 hover:border-pink-300 dark:border-pink-900/40 dark:text-pink-400 dark:hover:bg-pink-950/20'
                  : 'border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 dark:border-orange-900/40 dark:text-orange-400 dark:hover:bg-orange-950/20'
              }`}
            >
              <Lock className="h-4 w-4 mr-2" />
              Apartar con ${deposit}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Motion.div>
  );
}
