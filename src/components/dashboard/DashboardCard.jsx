import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DashboardCard = ({ 
  title, 
  value, 
  unit, 
  icon, 
  color, 
  subtitle, 
  status,
  link 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) navigate(link);
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        cursor: link ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': link ? {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        } : {},
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="div" color="text.secondary">
            {title}
          </Typography>
          {icon && (
            <Box sx={{ fontSize: '2rem' }}>
              {icon}
            </Box>
          )}
        </Box>

        <Typography 
          variant="h3" 
          component="div" 
          sx={{ 
            fontWeight: 700,
            color: color || 'primary.main',
            mb: 1 
          }}
        >
          {value}
          {unit && (
            <Typography component="span" variant="h5" color="text.secondary" sx={{ ml: 1 }}>
              {unit}
            </Typography>
          )}
        </Typography>

        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}

        {status && (
          <Chip 
            label={status}
            size="small"
            sx={{ 
              mt: 1,
              backgroundColor: color,
              color: 'white',
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
