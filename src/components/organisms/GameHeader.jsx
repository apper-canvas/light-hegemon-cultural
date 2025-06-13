import { motion } from 'framer-motion';
import StatisticCard from '@/components/atoms/StatisticCard';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const GameHeader = ({ 
  gameState, 
  playerEmpire, 
  onMenuAction,
  loading = false 
}) => {
  const stats = [
    {
      title: 'Culture Points',
      value: playerEmpire?.culturePoints || 0,
      icon: 'Coins',
      color: 'accent'
    },
    {
      title: 'Territories',
      value: playerEmpire?.territories?.length || 0,
      icon: 'Map',
      color: 'primary'
    },
    {
      title: 'Turn',
      value: gameState?.currentTurn || 1,
      icon: 'Clock',
      color: 'success'
    },
    {
      title: 'Great Works',
      value: playerEmpire?.completedGreatWorks || 0,
      icon: 'Trophy',
      color: 'warning'
    }
  ];

  return (
    <header className="flex-shrink-0 parchment-bg border-b-2 border-accent/30 shadow-parchment z-40">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <ApperIcon name="Crown" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-primary">
                Hegemon
              </h1>
              <p className="text-sm text-primary/60">
                {playerEmpire?.name || 'Cultural Empire'}
              </p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="flex gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StatisticCard
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  color={stat.color}
                  size="small"
                />
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Button
              variant="outline"
              icon="Save"
              onClick={() => onMenuAction?.('save')}
              disabled={loading}
            >
              Save
            </Button>
            <Button
              variant="outline"
              icon="Settings"
              onClick={() => onMenuAction?.('settings')}
              disabled={loading}
            >
              Settings
            </Button>
            <Button
              variant="secondary"
              icon="Home"
              onClick={() => onMenuAction?.('menu')}
              disabled={loading}
            >
              Main Menu
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;