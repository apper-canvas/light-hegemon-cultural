import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const MainMenu = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'newGame',
      label: 'New Game',
      description: 'Begin a new cultural conquest',
      icon: 'PlayCircle',
      action: () => navigate('/game')
    },
    {
      id: 'loadGame',
      label: 'Load Game',
      description: 'Continue your empire',
      icon: 'FolderOpen',
      action: () => {
        // In a real implementation, this would load a saved game
        navigate('/game');
      }
    },
    {
      id: 'tutorial',
      label: 'How to Play',
      description: 'Learn the art of cultural dominance',
      icon: 'BookOpen',
      action: () => {
        // Tutorial would be implemented here
        console.log('Tutorial clicked');
      }
    },
    {
      id: 'settings',
      label: 'Settings',
      description: 'Configure your experience',
      icon: 'Settings',
      action: () => {
        console.log('Settings clicked');
      }
    }
  ];

  return (
    <div className="min-h-screen bg-surface-100 bg-parchment flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center shadow-brass"
            >
              <ApperIcon name="Crown" size={32} className="text-white" />
            </motion.div>
            <h1 className="font-display text-6xl font-bold text-primary text-shadow">
              Hegemon
            </h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-primary/70 font-body leading-relaxed max-w-lg mx-auto"
          >
            Build and maintain a cultural empire through influence, assimilation, and diplomatic finesse
          </motion.p>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="space-y-4"
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + (index * 0.1) }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={item.action}
                className="w-full parchment-bg p-6 rounded-lg border-2 border-accent/30 hover:border-accent transition-all duration-200 shadow-parchment hover:shadow-brass text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-surface-200 rounded-lg flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                    <ApperIcon name={item.icon} size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold text-primary mb-1">
                      {item.label}
                    </h3>
                    <p className="text-primary/60 font-body">
                      {item.description}
                    </p>
                  </div>
                  <ApperIcon 
                    name="ChevronRight" 
                    size={24} 
                    className="text-primary/40 group-hover:text-accent transition-colors" 
                  />
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-12"
        >
          <p className="text-primary/50 text-sm font-body">
            Master the art of soft power and cultural influence
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MainMenu;