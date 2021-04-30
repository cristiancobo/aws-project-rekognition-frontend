import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Copyright from '../components/copyright'
import useStyles from '../styles/use-styles'
import IconButton from '@material-ui/core/IconButton';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Tooltip from '@material-ui/core/Tooltip';

import PhotoCamera from '@material-ui/icons/PhotoCamera';
function Form(){

    const classes = useStyles();
    return(
        <Grid container component="main" className={classes.root}>
    <CssBaseline />
    <Grid item xs={false} sm={4} md={7} className={classes.image} />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Typography  variant="h5">
       
        Captcha rekognition
        
        </Typography>
        <Grid className={classes.avatar} >
          <Grid xs ={6}>
              <img src="https://captcha.com/images/captcha/botdetect3-captcha-spiderweb.jpg"/>
          </Grid>
          <Grid  xs ={6}>
          <Tooltip title="Reload captcha">
              <IconButton aria-label="delete" className={classes.margin} size="small">
                 <AutorenewIcon fontSize="inherit" />
            </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
       
        <form className={classes.form} noValidate>
       
          <TextField
            variant="outlined"
            margin="normal"
            disabled
           
            fullWidth
            name="password"
            label="Prediction"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          
          >
            Rekognition
          </Button>
          <Grid container>
      
            <Grid >
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                <Tooltip title="Upload captcha ">
                  <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera/>
              </IconButton>
             </Tooltip>
      </label>
             
            </Grid>
          </Grid>
          <Grid className={classes.copyright}>
          <Box mt={5}>
            <Copyright  />
          </Box>
          </Grid >
        </form>
      </div>
    </Grid>
  </Grid>
    );
}

export default Form;