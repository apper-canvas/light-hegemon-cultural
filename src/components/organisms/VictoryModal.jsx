import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const VictoryModal = ({ isOpen, victoryData, onClose, onContinue, onNewGame }) => {
  const getVictoryTitle = (condition) => {
    switch (condition) {
      case 'cultural-dominance':
        return 'Cultural Dominance Victory!';
      case 'great-works':
        return 'Great Works Victory!';
      case 'diplomatic':
        return 'Diplomatic Victory!';
      default:
        return 'Victory Achieved!';
    }
  };

  const getVictoryDescription = (condition) => {
    switch (condition) {
      case 'cultural-dominance':
        return 'Your cultural influence has spread across the known world, establishing your empire as the dominant civilization.';
      case 'great-works':
        return 'Your great cultural achievements have inspired the world and secured your place in history.';
      case 'diplomatic':
        return 'Through skilled diplomacy and cultural exchange, you have united the world under your soft power.';
      default:
        return 'Your strategic mastery has led your empire to unprecedented heights.';
    }
  };

  const getVictoryIcon = (condition) => {
    switch (condition) {
      case 'cultural-dominance':
        return 'Crown';
      case 'great-works':
        return 'Trophy';
      case 'diplomatic':
        return 'Handshake';
      default:
        return 'Star';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="parchment-bg rounded-lg shadow-xl max-w-md w-full p-8 border-2 border-accent"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Victory Icon */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-semantic-success rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <ApperIcon 
                    name={getVictoryIcon(victoryData?.condition)} 
                    size={40} 
                    className="text-white" 
                  />
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-display text-2xl font-bold text-primary mb-2"
                >
                  {getVictoryTitle(victoryData?.condition)}
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-primary/70 leading-relaxed"
                >
                  {getVictoryDescription(victoryData?.condition)}
                </motion.p>
              </div>

              {/* Victory Stats */}
              {victoryData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-surface-200 rounded-lg p-4 mb-6"
                >
                  <h3 className="font-medium text-primary mb-3">Final Statistics</h3>
                  <div className="space-y-2">
                    {victoryData.condition === 'cultural-dominance' && (
                      <div className="flex justify-between">
                        <span className="text-primary/70">Cultural Dominance:</span>
                        <span className="font-semibold text-primary">
                          {Math.round(victoryData.score)}%
                        </span>
                      </div>
                    )}
                    {victoryData.condition === 'great-works' && (
                      <div className="flex justify-between">
                        <span className="text-primary/70">Great Works Completed:</span>
                        <span className="font-semibold text-primary">
                          {victoryData.score}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-primary/70">Turns Played:</span>
                      <span className="font-semibold text-primary">
                        {victoryData.turns || 'N/A'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex gap-3"
              >
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={onContinue}
                >
                  Continue Playing
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={onNewGame}
                >
                  New Game
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VictoryModal;