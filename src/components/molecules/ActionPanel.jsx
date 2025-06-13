import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const ActionPanel = ({ 
  selectedTerritory, 
  playerEmpire, 
  onAction,
  cultures = [],
  disabled = false 
}) => {
  const culturePointCosts = {
    influence: 30,
    develop: 50,
    assimilate: 80,
    innovate: 40
  };

  const canAfford = (cost) => playerEmpire?.culturePoints >= cost;

  const actions = [
    {
      id: 'influence',
      label: 'Spread Influence',
      icon: 'Zap',
      cost: culturePointCosts.influence,
      description: 'Increase your cultural influence in this territory'
    },
    {
      id: 'develop',
      label: 'Develop Territory',
      icon: 'Building',
      cost: culturePointCosts.develop,
      description: 'Improve infrastructure and development'
    },
    {
      id: 'assimilate',
      label: 'Cultural Assimilation',
      icon: 'Users',
      cost: culturePointCosts.assimilate,
      description: 'Attempt to assimilate minority cultures'
    },
    {
      id: 'innovate',
      label: 'Foster Innovation',
      icon: 'Lightbulb',
      cost: culturePointCosts.innovate,
      description: 'Boost cultural innovation and traditions'
    }
  ];

  if (!selectedTerritory) {
    return (
      <div className="parchment-bg rounded-lg p-6 border-2 border-accent/30">
        <div className="text-center py-8">
          <ApperIcon name="MousePointer" className="w-12 h-12 text-primary/30 mx-auto mb-3" />
          <h3 className="font-display text-lg font-semibold text-primary mb-2">
            Select a Territory
          </h3>
          <p className="text-primary/60">
            Choose a territory from the map to view available actions
          </p>
        </div>
      </div>
    );
  }

const isPlayerTerritory = selectedTerritory.controlling_empire === 'player';

  return (
    <div className="parchment-bg rounded-lg p-6 border-2 border-accent/30 shadow-parchment">
      <div className="flex items-center justify-between mb-4">
<h3 className="font-display text-lg font-semibold text-primary">
          {selectedTerritory.Name}
        </h3>
        <div className="flex items-center gap-2">
          <ApperIcon name="Coins" size={16} className="text-accent" />
<span className="font-semibold text-primary">
            {playerEmpire?.culture_points || 0}
          </span>
        </div>
      </div>

      {!isPlayerTerritory && (
        <div className="mb-4 p-3 bg-semantic-warning/10 border border-semantic-warning/30 rounded-lg">
          <div className="flex items-center gap-2">
            <ApperIcon name="AlertTriangle" size={16} className="text-semantic-warning" />
            <span className="text-sm text-semantic-warning font-medium">
              Territory controlled by another empire
            </span>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant={canAfford(action.cost) && !disabled ? 'primary' : 'outline'}
              className="w-full justify-start text-left"
              icon={action.icon}
              disabled={!canAfford(action.cost) || disabled || !isPlayerTerritory}
              onClick={() => onAction?.(action.id, selectedTerritory)}
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{action.label}</span>
                  <span className="text-sm opacity-75">
                    {action.cost} CP
                  </span>
                </div>
                <div className="text-xs opacity-75 mt-1">
                  {action.description}
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>

      {isPlayerTerritory && (
        <div className="mt-6 pt-4 border-t border-surface-300">
          <Button
            variant="secondary"
            className="w-full"
            icon="RotateCcw"
            onClick={() => onAction?.('endTurn')}
            disabled={disabled}
          >
            End Turn
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActionPanel;