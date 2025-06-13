import { motion } from 'framer-motion';
import CultureBadge from '@/components/atoms/CultureBadge';
import ProgressBar from '@/components/atoms/ProgressBar';
import ApperIcon from '@/components/ApperIcon';

const TerritoryCard = ({ 
  territory, 
  cultures = [], 
  onClick, 
  isSelected = false,
  empire
}) => {
  const getDominantCulture = () => {
    if (!territory.cultures?.length) return null;
const dominant = territory.cultures.reduce((prev, current) => 
      (prev.influence > current.influence) ? prev : current
    );
    return cultures.find(c => c.Id === dominant.cultureId);
  };

  const dominantCulture = getDominantCulture();
  const empireColor = empire?.color || '#696969';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        parchment-bg rounded-lg p-4 border-2 cursor-pointer transition-all duration-200 shadow-parchment
        ${isSelected 
          ? 'border-accent bg-accent/10 shadow-brass' 
          : 'border-surface-300 hover:border-accent/50'
        }
      `}
      onClick={() => onClick?.(territory)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
            style={{ backgroundColor: empireColor }}
            title={`Controlled by ${empire?.name || 'Unknown'}`}
          />
<h4 className="font-display font-semibold text-primary">{territory.Name}</h4>
        </div>
        <ApperIcon 
          name={isSelected ? "MapPin" : "Map"} 
          size={16} 
          className="text-accent" 
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <ProgressBar 
            value={territory.happiness || 0} 
            color="success"
            size="small"
            showLabel
            label="Happiness"
          />
        </div>
        <div>
          <ProgressBar 
            value={territory.development || 0} 
            color="accent"
            size="small"
            showLabel
            label="Development"
          />
        </div>
      </div>

      {/* Cultural Composition */}
      <div className="space-y-2">
        <h5 className="text-sm font-medium text-primary/70">Cultural Influence</h5>
        {territory.cultures?.length > 0 ? (
          <div className="space-y-1">
            {territory.cultures
              .sort((a, b) => b.influence - a.influence)
              .slice(0, 3)
.slice(0, 3)
              .map((cultureInfluence, index) => {
                const culture = cultures.find(c => c.Id === cultureInfluence.cultureId);
                
return (
                  <div key={culture.Id} className="flex items-center justify-between">
                    <CultureBadge culture={culture} size="small" showName={false} />
                    <div className="flex-1 mx-2">
                      <ProgressBar 
                        value={cultureInfluence.influence} 
                        color="primary"
                        size="small"
                      />
                    </div>
                    <span className="text-xs text-primary/60 w-8 text-right">
                      {cultureInfluence.influence}%
                    </span>
                  </div>
                );
              })}
          </div>
        ) : (
          <p className="text-sm text-primary/50 italic">No cultural data</p>
        )}
      </div>

      {/* Dominant Culture */}
      {dominantCulture && (
        <div className="mt-3 pt-3 border-t border-surface-300">
          <div className="flex items-center gap-2">
            <span className="text-xs text-primary/60">Dominant:</span>
            <CultureBadge culture={dominantCulture} size="small" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TerritoryCard;