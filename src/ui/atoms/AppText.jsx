//MUI
import { Typography } from '@mui/material';

const AppText = ({
  children,
  variant = 'body1',
  component,
  color = 'text.primary',
  align = 'inherit',
  fontWeight = 'normal',
  gutterBottom = false,
  noWrap = false,
  sx = {},
  ...props
}) => {
  return (
    <Typography
      variant={variant}
      component={component}
      color={color}
      align={align}
      fontWeight={fontWeight}
      gutterBottom={gutterBottom}
      noWrap={noWrap}
      sx={sx}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default AppText;