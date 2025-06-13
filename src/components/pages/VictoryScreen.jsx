import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import StatisticCard from '@/components/atoms/StatisticCard';
import ApperIcon from '@/components/ApperIcon';

const VictoryScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const victoryData = location.state?.victoryData;

  const getVictoryDetails = (condition) => {
    switch (condition) {
      case 'cultural-dominance':
        return {
          title: 'Cultural Dominance Victory',
          description: 'Your cultural influence has spread across the known world, establishing your empire as the dominant civilization.',
          icon: 'Crown',
          color: 'semantic-success',
          achievements: [
            'Achieved 60%+ territorial cultural dominance',
            'Successfully integrated multiple cultures',
            'Maintained high cultural happiness levels'
          ]
        };
      case 'great-works':
        return {
          title: 'Great Works Victory',
          description: 'Your great cultural achievements have inspired the world and secured your place in history.',
          icon: 'Trophy',
          color: 'semantic-warning',
          achievements: [
            'Completed 3+ magnificent Great Works',
            'Advanced cultural innovation significantly',
            'Created lasting cultural monuments'
          ]
        };
      case 'diplomatic':
        return {
          title: 'Diplomatic Victory',
          description: 'Through skilled diplomacy and cultural exchange, you have united the world under your soft power.',
          icon: 'Handshake',
          color: 'semantic-info',
          achievements: [
            'Formed alliances with all major empires',
            'Achieved peaceful cultural integration',
            'Mastered the art of soft power diplomacy'
          ]
        };
      default:
        return {
          title: 'Victory Achieved',
          description: 'Your strategic mastery has led your empire to unprecedented heights.',
          icon: 'Star',
          color: 'primary',
          achievements: ['Strategic mastery demonstrated']
        };
    }
  };

  const details = getVictoryDetails(victoryData?.condition);

  const stats = [
    {
      title: 'Final Score',
      value: Math.round(victoryData?.score || 0),
      icon: 'Target',
      color: 'accent'
    },
    {
      title: 'Turns Played',
      value: victoryData?.turns || 0,
      icon: 'Clock',
      color: 'primary'
    },
    {
      title: 'Territories',
      value: victoryData?.territories || 0,
      icon: 'Map',
      color: 'success'
    },
    {
      title: 'Great Works',
      value: victoryData?.greatWorks || 0,
      icon: 'Trophy',
      color: 'warning'
    }
  ];

  return (
    <div className="min-h-screen bg-surface-100 bg-parchment p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className={`w-24 h-24 bg-${details.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-brass`}
          >
            <ApperIcon name={details.icon} size={48} className="text-white" />
          </motion.div>
          
          <h1 className="font-display text-4xl font-bold text-primary mb-4 text-shadow">
            {details.title}
          </h1>
          
          <p className="text-lg text-primary/70 font-body leading-relaxed max-w-2xl mx-auto">
            {details.description}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (index * 0.1) }}
            >
              <StatisticCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
                size="large"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="parchment-bg rounded-lg p-8 border-2 border-accent/30 shadow-parchment mb-12"
        >
          <h2 className="font-display text-2xl font-semibold text-primary mb-6 flex items-center gap-3">
            <ApperIcon name="Award" size={28} />
            Achievements Unlocked
          </h2>
          
          <div className="space-y-4">
            {details.achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + (index * 0.1) }}
                className="flex items-center gap-4 p-4 bg-surface-200 rounded-lg"
              >
                <div className="w-8 h-8 bg-semantic-success rounded-full flex items-center justify-center flex-shrink-0">
                  <ApperIcon name="Check" size={16} className="text-white" />
                </div>
                <span className="font-medium text-primary">{achievement}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center gap-6"
        >
          <Button
            variant="secondary"
            size="large"
            icon="RotateCcw"
            onClick={() => navigate('/game')}
          >
            Play Again
          </Button>
          
          <Button
            variant="primary"
            size="large"
            icon="Home"
            onClick={() => navigate('/menu')}
          >
            Main Menu
          </Button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-center mt-12"
        >
          <p className="text-primary/50 text-sm font-body">
            "The greatest victory is that which requires no battle." - Sun Tzu
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default VictoryScreen;