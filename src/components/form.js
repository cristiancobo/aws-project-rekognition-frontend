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
import { render } from '@testing-library/react';
const {BASE_URL_AWS_SERVICE_REKOGNITION_CAPTCHA, BASE_URL_AWS_SERVICE_RANDOM_CAPTCHA }  = require ('../const/const')


function Form(){

    const[imageSelected, setImageSelected] = useState([]);
    const[imageSelectedName, setImageSelectedName] = useState("");
    const[textPrediction, setTextPrediction] = useState("");
    const [selectedFile, setSelectedFile] = useState([]);
    const [fileBase64String, setFileBase64String] = useState("");
    const [nameFile, setNameFile] = useState("");
    const[img, setImg] = useState("");
    const [tamanio, setTamanio] = useState(0);
    const [textPredict, setTexPredict] = useState("");
    //const[data, setData] = useState({body:''})


    
    const onClicReload = () =>{
      axios.get(BASE_URL_AWS_SERVICE_RANDOM_CAPTCHA).then(response =>{
        console.log(response.data.Name)
        setTamanio(0)
        setImageSelected(response.data.Image)
        setImageSelectedName(response.data.Name)

      });
    }

    const onFileChange =(e)=>{
      setSelectedFile(e.target.files);
      
      setNameFile(e.target.files[0].name)
      setTamanio(1)
    
     

    }

    const encodeFileBase64 = (file) => {
      var reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          var Base64 = reader.result;
          var convert = Base64.slice(23);
          setImg(convert)
          
          setFileBase64String(Base64);
         
        };
        reader.onerror = (error) => {
          console.log("error: ", error);
        };
      }
    };

    encodeFileBase64(selectedFile[0])
    
    //https://w6re20r8ih.execute-api.us-east-1.amazonaws.com/dev/rekognition
    const onClickPrediction = () =>{

      if(tamanio == 0){
        axios.get(BASE_URL_AWS_SERVICE_REKOGNITION_CAPTCHA+imageSelectedName).then(response =>{
          console.log(response.data.text_predict_word)
          setTextPrediction(response.data.text_predict_word);
        });
      }else{

            
        const params = new URLSearchParams()
        params.append('name', nameFile)
        params.append('image',img)
      
        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
        
        axios.post('https://w6re20r8ih.execute-api.us-east-1.amazonaws.com/dev/rekognition', params, config)
          .then((result1) => {
     
            console.log(result1)
            axios.get('https://w6re20r8ih.execute-api.us-east-1.amazonaws.com/dev/rekognition?name='+result1.data.Path)
            .then((result2) => {
       
              console.log(result2)
              setTexPredict(result2.data.text_predict_word);
            })
            .catch((err) => {
              // Do somthing
            })
          })
          .catch((err) => {
            // Do somthing
          })

      }
    
    }
    let response ;
    useEffect(() => {
      axios.get(BASE_URL_AWS_SERVICE_RANDOM_CAPTCHA).then(response =>{
        //console.log(response.data.Name)
        

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
             
              <img src= {tamanio == 0 ? `data:image/png;base64,${imageSelected}`: fileBase64String }  width="320" height="100"/>
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
            value= {tamanio == 0 ? textPrediction : textPredict}
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
            <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={ onFileChange}/>
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