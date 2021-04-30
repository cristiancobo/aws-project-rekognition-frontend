import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Visita '}
        <Link color="inherit" >
          Github 
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  export default Copyright;