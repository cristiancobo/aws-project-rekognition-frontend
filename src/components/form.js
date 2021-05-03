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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
const {BASE_URL_AWS_SERVICE_REKOGNITION_CAPTCHA, BASE_URL_AWS_SERVICE_RANDOM_CAPTCHA }  = require ('../const/const')






function Form(){

    const[imageSelected, setImageSelected] = useState([]);
    const[imageSelectedName, setImageSelectedName] = useState("");
    const[textPrediction, setTextPrediction] = useState("");


    
    const onClicReload = () =>{
      axios.get(BASE_URL_AWS_SERVICE_RANDOM_CAPTCHA).then(response =>{
        console.log(response.data.Name)
        setImageSelected(response.data.Image)
        setImageSelectedName(response.data.Name)
      });
    }
    // https://w6re20r8ih.execute-api.us-east-1.amazonaws.com/dev/rekognition
    const onClickPrediction = () =>{
      axios.get(BASE_URL_AWS_SERVICE_REKOGNITION_CAPTCHA+imageSelectedName).then(response =>{
        console.log(response.data.text_predict_word)
        setTextPrediction(response.data.text_predict_word);
      });
    }
    let response ;
    useEffect(() => {
      axios.get(BASE_URL_AWS_SERVICE_RANDOM_CAPTCHA).then(response =>{
        console.log(response.data.Name)
        setImageSelected(response.data.Image)
        setImageSelectedName(response.data.Name)
    
      });
   
    },[]);


  

    

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
          <Grid item xs ={6}>
              <img src= {`data:image/png;base64,${imageSelected}`} width="320" height="100"/>
          </Grid>
          <Grid  item xs ={6}>
          <Tooltip title="Reload captcha">
              <IconButton aria-label="delete" className={classes.margin} size="small" onClick={onClicReload} >
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
            value= {textPrediction}
            fullWidth
            name="password"
           
           
            id="password"
            autoComplete="current-password"
          />
        
          <Button

            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClickPrediction}

          >
            Rekognition
          </Button>
          <Grid container>
      
            <Grid >
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file"/>
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